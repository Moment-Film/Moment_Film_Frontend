import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
// import {
//   ProfileSection,
//   ProfilePic,
//   Infos,
//   InfoSection,
//   StyleInput,
//   ModalBg,
//   ProfileWrap,
//   PasswordEditSection,
//   PwEditContainor,
//   EditBtn,
//   PwEditWrap,
//   CloseBtn,
//   SendBtn,
//   Verify,
//   TestBox,
//   TestInput,
//   TestBtn,
// } from "./profileEditStyle";
import * as a from "../frameCustomPage/style";

import WithdrawalBtn from "../common/component/WithdrawalBtn";
import cancel from "../assets/icons/cancelx2.png";
import lock from "../assets/icons/lock.png";
import imgEdit from "../assets/icons/imgEdit.png";
import { AddressInput } from "../loginPage/EmailLogin";
import useInputValidation from "../../hooks/useInputValidation";
import useToken from "../../hooks/useToken";
import useUserAPI from "../../api/withToken/user";
import { styled } from "styled-components";

function EditModal({ onClose }) {
  const { sendEmail, putEditInfo, getPrivateInfo, replacePassword } =
    useUserAPI();

  const { getAccess, getRefresh } = useToken();

  // 프로필 수정 state
  const [isEdit, setIsEdit] = useState(false);
  const [curruntImage, setCurruntImage] = useState();
  const [UploadImage, setUploadImage] = useState();
  const [editProfile, setEditProfile] = useState({
    username: "",
    phone: "",
  });

  // 비밀번호 재설정 state
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [serverCode, setServerCode] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  // 비밀번호 재설정 유효성 검사
  const { handlePasswordChange } = useInputValidation();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const profilePicRef = useRef();

  const userInfo = useSelector((state) => state.UserInfo);
  const accessToken = getAccess();
  const refreshToken = getRefresh();

  const { data, isLoading, isError, isSuccess } = useQuery(
    `Private${userInfo.sub}`,
    () => getPrivateInfo({ accessToken, refreshToken })
  );

  useEffect(() => {
    if (isSuccess) {
      setEditProfile({
        ["phone"]: data.data.data.phone,
        ["username"]: data.data.data.username,
      });
    }
  }, [data]);

  const editInfoMutation = useMutation(putEditInfo, {
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        alert("수정이 완료됐습니다.", data);
        queryClient.invalidateQueries(`Private${userInfo.sub}`);
      }
    },
    onError: (error) => {
      alert("수정이 실패했습니다.", error);
      console.log(error);
    },
  });

  const sendEmailMutation = useMutation(
    () => sendEmail({ accessToken, refreshToken }),
    {
      onSuccess: (data) => {
        setServerCode(data.split(" ")[2]);
        alert("인증 코드가 이메일로 전송되었습니다.");
      },
      onError: (error) => {
        alert("이메일 전송에 실패했습니다.");
        console.log(error);
      },
    }
  );

  const replacePasswordMutation = useMutation(
    () =>
      replacePassword({
        accessToken,
        refreshToken,
        newPassword,
        code,
      }),
    {
      onSuccess: () => {
        setIsVerified(false);
        setIsClicked(false);
        setCode("");
        alert("비밀번호가 변경되었습니다.");
        navigate(`/profile/${userInfo.sub}`);
      },
      onError: (error) => {
        alert("비밀번호 변경에 실패했습니다.");
        console.log(error);
      },
    }
  );

  const UploadPic = (e) => {
    const input = e.target;
    if (input.files && input.files[0]) {
      setCurruntImage(URL.createObjectURL(input.files[0]));
      setUploadImage(input.files[0]);
      // curruntImage - 이미지 src용 url / uploadImage - file객체
    }
  };
  const editInputHandler = (key, value) => {
    const newInfo = { ...editProfile };
    newInfo[key] = value;
    setEditProfile(newInfo);
  };
  const submitEdit = () => {
    const editName = editProfile.username;
    const editPhone = editProfile.phone;
    // putEditInfo({access, refresh, editName, editPhone});
    setIsEdit(false);
    editInfoMutation.mutate({ accessToken, refreshToken, editName, editPhone });
  };

  const handleSendEmail = () => {
    sendEmailMutation.mutate();
    setIsClicked(true);
  };

  const handlePasswordReset = () => {
    replacePasswordMutation.mutate();
    setNewPassword("");
  };

  const newPasswordChangeHandler = (e) => {
    setNewPassword(e.target.value);
    handlePasswordChange(e);
  };

  const handleVerifyCode = () => {
    if (code === serverCode) {
      setIsVerified(true);
      alert("인증이 완료되었습니다.");
    } else {
      setIsVerified(false);
      alert("인증 코드가 올바르지 않습니다.");
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalBg onClick={onClose}>
      <ProfileWrap onClick={stopPropagation}>
        <CloseSection>
          <section></section>
          <CloseBtn>
            <img src={cancel} alt="" onClick={onClose} />
          </CloseBtn>
        </CloseSection>
        <ProfileSection>
          <PicSection>
            <PicBox>
              <img src={curruntImage} alt="프로필 이미지" />
            </PicBox>
            <a.UploadInput
              id="fileInput"
              type="file"
              accept="image/*"
              ref={profilePicRef}
              onChange={UploadPic}
            />
            <EditBtn htmlFor="fileInput">
              <img src={imgEdit} alt="" />
            </EditBtn>

            <PicInfoSection>
              <span>{userInfo.username}</span>
              <div>{userInfo.email}</div>
              <WithdrawalBtn />
            </PicInfoSection>
          </PicSection>
          <InfoSection></InfoSection>
        </ProfileSection>
      </ProfileWrap>
    </ModalBg>
  );
}

export default EditModal;

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 50;
`;

const ProfileWrap = styled.div`
  width: 730px;
  height: 415px;
  background-color: var(--white);
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  z-index: 51;
  padding: 20px;
`;

const CloseSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid;

  section {
    width: 98%;
    height: 20px;
  }
`;

const CloseBtn = styled.div`
  img {
    width: 20px;
    height: 20px;
  }
`;

const ProfileSection = styled.section`
  width: 100%;
  height: 378px;
  display: flex;
  gap: 40px;
border: 1px solid;
  margin-bottom: 20px;
  position: relative;
`;

const PicSection = styled.section`
width: 236px;
height: 357px;
border: 1px solid;
display: flex;
flex-direction: column;
align-items: center;
margin-left: 20px;
padding-bottom: 20px;
`;

const PicBox = styled.div`
  width: 200px;
  height: 252px;
  border: 3px solid;
  margin: 20px 0;
`;

const EditBtn = styled.label`
  img {
    max-width: 36px;
    max-height: 36px;
    cursor: pointer;
    position: absolute;
    bottom: 102px;
    /* top: 70px; */
    left: 221px;
    /* right: 5px; */
  }
`;

const PicInfoSection = styled.section`
width: 236px;
height: 88px;
border: 1px solid;
display: flex;
flex-direction: column;
align-items: center;

span {
  font-size: 24px;
  line-height: 30px;
  color: var(--black);
  font-weight: bold;
}

div {
  font-size: 14px;
  line-height: 17px;
  color: var(--gray4);
  margin-top: 4px;
  margin-bottom: 8px;
}

`;

const InfoSection = styled.section`
width: 410px;
height: 377px;
border: 1px solid;
`;
