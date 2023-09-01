import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  ModalBg,
  ProfileWrap,
  CloseSection,
  CloseBtn,
  ProfileSection,
  PicSection,
  PicBox,
  EditBtn,
  PicInfoSection,
  Info,
  InfoSection,
  InfoInput,
  PasswordSection,
  PasswordWrap,
  WithdrawalBtn,
  SendBtn,
  TestBox,
  TestInput,
  TestBtn,
  Verify,
  SaveBtn,
} from "./profileEditStyle";
import * as a from "../frameCustomPage/style";
import cancel from "../assets/icons/cancelx2.png";
import user from "../assets/icons/userName.svg";
import lock from "../assets/icons/lock.svg";
import imgEdit from "../assets/icons/imgEdit.png";
import nullImg from "../assets/images/nullProfile.svg";

import useInputValidation from "../../hooks/useInputValidation";
import useToken from "../../hooks/useToken";
import useUserAPI from "../../api/withToken/user";
import Modals from "../common/component/Modals";
import byebye from "../assets/images/byebye.png";

function EditModal({ onClose, profileImg }) {
  const { sendEmail, putEditInfo, getPrivateInfo, replacePassword } =
    useUserAPI();

  const { getAccess, getRefresh } = useToken();

  // 프로필 수정 state
  // 개인정보 수정 모달창 open => 모든 input box 입력 가능한 상태(활성화)
  // 프로필 변경 api 요청 시 비밀번호를 변경하는 경우에만 조건(인증코드가 일치해야함) || 일치하지 않은 경우에는 저장완료를 눌렀을 때 error alert
  
  // 현재 프로필 변경 API 요청 시 모든 데이터를 서버로 전달해주어야 하는데 비밀번호 변경을 희망하지 않는 경우 비밀번호 값을 제외하고 서버로 요청을 보낼 수 있는지?
  // 또는 비밀번호 변경을 희망하지 않을 경우 기존 비밀번호를 그대로 불러와서 서버에 보내줄 수 있는지?
  const [isEdit, setIsEdit] = useState(false);
  const [curruntImage, setCurruntImage] = useState();
  const [UploadImage, setUploadImage] = useState(null);
  const [editProfile, setEditProfile] = useState({
    username: "",
    phone: "",
  });
  const [showModal, setShowModal] = useState(false);

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

  const { data, isSuccess } = useQuery(`Private${userInfo.sub}`, () =>
    getPrivateInfo({ accessToken, refreshToken })
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
    const profileData = new FormData();

    const editName = editProfile.username;
    const editPhone = editProfile.phone;

    const editProfileData = { username: editName, phone: editPhone };

    if (UploadImage !== null) {
      profileData.append("imageFile", UploadImage);
    }
    profileData.append(
      "data",
      new Blob([JSON.stringify(editProfileData)], { type: "application/json" })
    );

    putEditInfo({ accessToken, refreshToken, profileData });
    setIsEdit(false);
    editInfoMutation.mutate({ accessToken, refreshToken, profileData });

    replacePasswordMutation.mutate();
    setNewPassword("");
  };

  const handleSendEmail = () => {
    sendEmailMutation.mutate();
    setIsClicked(true);
  };

  // const handlePasswordReset = () => {
  //   replacePasswordMutation.mutate();
  //   setNewPassword("");
  // };

  const newPasswordChangeHandler = (e) => {
    setNewPassword(e.target.value);
    handlePasswordChange(e);
  };

  const handleVerifyCode = () => {
    if (isClicked) {
      if (code === serverCode) {
        setIsVerified(true);
        alert("인증이 완료되었습니다.");
      } else {
        setIsVerified(false);
        alert("인증 코드가 올바르지 않습니다.");
      }
    }
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalBg onClick={onClose}>
      {showModal && (
        <Modals
          imgSrc={byebye}
          type="bye"
          text="진짜... 탈퇴하시나요?"
          onClose={closeModalHandler}
        />
      )}
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
              <img
                src={
                  curruntImage
                    ? curruntImage
                    : profileImg
                    ? profileImg
                    : nullImg
                }
                alt="프로필 이미지"
              />
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
              <span className="username">{userInfo.username}</span>
              <div className="email">{userInfo.email}</div>
              <WithdrawalBtn onClick={() => setShowModal(true)}>
                회원탈퇴
              </WithdrawalBtn>
              <WithdrawalBtn />
            </PicInfoSection>
          </PicSection>

          <Info>
            <InfoSection>
              <div style={{display:"flex", alignItems:"center", }}>
                <img src={user} alt="" />
                <span>유저이름</span>
                <InfoInput>
                  <input
                    placeholder={data?.data.data.username}
                    value={editProfile.username || ""}
                    onChange={(e) =>
                      editInputHandler("username", e.target.value)
                    }
                  />
                </InfoInput>
              </div>
              <div style={{display:"flex", alignItems:"center", }}>
                <img src={lock} alt="" />
                <span>전화번호</span>
                <InfoInput>
                  <input
                    placeholder={data?.data.data.phone}
                    value={editProfile.phone || ""}
                    onChange={(e) => editInputHandler("phone", e.target.value)}
                  />
                </InfoInput>
              </div>
              <hr />
            </InfoSection>
            <PasswordSection>
              <div className="change">비밀번호 변경</div>
              <PasswordWrap>
                <section>
                  <span>인증코드</span>
                  <TestBox>
                    <TestInput
                      placeholder="인증코드를 입력해 주세요"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    {
                      <TestBtn onClick={handleVerifyCode}>확인</TestBtn>}
                  </TestBox>
                </section>
                <div>
                  <SendBtn onClick={handleSendEmail}>
                    {isClicked ? "인증코드 재전송" : "인증코드 전송"}
                  </SendBtn>
                </div>
                <div style={{ height: "35px" }}>
                  {!isVerified ? (
                    <Verify isVerified={false}>인증코드 불일치</Verify>
                  ) : (
                    <Verify isVerified={true}>인증 확인되었습니다.</Verify>
                  )}
                </div>
                <section>
                  <span>새비밀번호</span>
                  <TestBox>
                    <TestInput
                      placeholder="새 비밀번호를 입력해 주세요"
                      value={newPassword}
                      type="password"
                      onChange={newPasswordChangeHandler}
                    />
                    {/* <TestBtn onClick={handlePasswordReset}>변경</TestBtn> */}
                  </TestBox>
                </section>
                <div>
                  {!isVerified ? (
                    <Verify isVerified={false}>
                      공백 없이 문자, 숫자 조합 필수 6 ~ 10자
                    </Verify>
                  ) : (
                    <Verify isVerified={true}>
                      비밀번호가 변경되었습니다.
                    </Verify>
                  )}
                </div>
                <SaveBtn>
                  <div onClick={submitEdit}>저장완료</div>
                </SaveBtn>
              </PasswordWrap>
            </PasswordSection>
          </Info>
        </ProfileSection>
      </ProfileWrap>
    </ModalBg>
  );
}

export default EditModal;
