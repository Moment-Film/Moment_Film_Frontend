import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  ProfileSection,
  ProfilePic,
  Infos,
  InfoSection,
  StyleInput,
  ModalBg,
  ProfileWrap,
  PasswordEditSection,
  PwEditContainor,
  EditBtn,
  PwEditWrap,
  CloseBtn,
  SendBtn,
  Verify,
  TestBox,
  TestInput,
  TestBtn,
} from "./profileEditStyle";
import * as a from "../frameCustomPage/style";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import WithdrawalBtn from "../common/component/WithdrawalBtn";
import cancel from "../assets/icons/cancelx2.png";
import lock from "../assets/icons/lock.png";
import imgEdit from "../assets/icons/imgEdit.png";
import { AddressInput } from "../loginPage/EmailLogin";
import useInputValidation from "../../hooks/useInputValidation";
import useToken from "../../hooks/useToken";
import useUserAPI from "../../api/withToken/user";

function ProfileEdit({ onClose }) {
  const{
    sendEmail,
    putEditInfo,
    getPrivateInfo,
    replacePassword
}=useUserAPI();


  const {
    getAccess,
    getRefresh,
  }=useToken();
  
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
  const accessToken = getAccess()
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

  const sendEmailMutation = useMutation(() => sendEmail({ accessToken, refreshToken }), {
    onSuccess: (data) => {
      setServerCode(data.split(" ")[2]);
      alert("인증 코드가 이메일로 전송되었습니다.");
    },
    onError: (error) => {
      alert("이메일 전송에 실패했습니다.");
      console.log(error);
    },
  });

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
        <CloseBtn>
          <img
            src={cancel}
            alt=""
            onClick={onClose}
            style={{ width: "20px" }}
          />
        </CloseBtn>
        <ProfileSection>
          <ProfilePic>
            <img src={curruntImage} alt="프로필 이미지" />
            <a.UploadInput
              id="fileInput"
              type="file"
              accept="image/*"
              ref={profilePicRef}
              onChange={UploadPic}
            />
            <label htmlFor="fileInput">
              <img
                src={imgEdit}
                alt=""
                style={{
                  width: "36px",
                  cursor: "pointer",
                }}
              />
            </label>
            <section>
              <span>{userInfo.email}</span>
            </section>
            <WithdrawalBtn />
          </ProfilePic>
          <Infos>
            <InfoSection>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={lock} alt="" style={{ width: "24px" }} />
                <span>유저이름</span>
                {!isEdit ? (
                  <StyleInput>
                    <span>{data?.data.data.username}</span>
                  </StyleInput>
                ) : (
                  <StyleInput>
                    <AddressInput
                      placeholder={data?.data.data.username}
                      value={editProfile.username || ""}
                      onChange={(e) =>
                        editInputHandler("username", e.target.value)
                      }
                    />
                  </StyleInput>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={lock} alt="" style={{ width: "24px" }} />
                <span>전화번호</span>
                {!isEdit ? (
                  <StyleInput>{data?.data.data.phone}</StyleInput>
                ) : (
                  <StyleInput>
                    <AddressInput
                      placeholder={data?.data.data.phone}
                      value={editProfile.phone || ""}
                      onChange={(e) =>
                        editInputHandler("phone", e.target.value)
                      }
                    />
                  </StyleInput>
                )}
              </div>
            </InfoSection>
            <hr
              style={{
                width: "450px",
                border: "1px solid var(--lightGray)",
                margin: "19.5px 0 9.5px 0",
              }}
            />
            <PasswordEditSection>
              <PwEditWrap>
                <div>비밀번호 변경</div>
                <div>
                  <SendBtn onClick={handleSendEmail}>
                    {isClicked ? "인증코드 재전송" : "인증코드 전송"}
                  </SendBtn>
                </div>
              </PwEditWrap>
              <PwEditContainor>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        width:"376px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ marginLeft: "34px" }}>인증코드 입력</div>

                      <TestBox>
                        <TestInput
                          placeholder="인증코드를 입력해 주세요"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                        <TestBtn onClick={handleVerifyCode}>확인</TestBtn>
                      </TestBox>
                    </div>
                    <div>
                      {!isVerified ? (
                        <Verify>인증코드 불일치</Verify>
                      ) : (
                        <Verify>인증 확인되었습니다.</Verify>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "80px", marginLeft: "26px" }}>
                    새 비밀번호
                  </div>
                  <TestBox style={{ marginLeft: "34px" }}>
                    <TestInput
                      placeholder="새 비밀번호를 입력해 주세요"
                      value={newPassword}
                      type="password"
                      onChange={newPasswordChangeHandler}
                      infoText="· 공백 없이 문자, 숫자 조합 필수 6 ~ 10자"
                    />
                    <TestBtn onClick={handlePasswordReset}>변경</TestBtn>
                  </TestBox>
                  <p></p>
                </div>
              </PwEditContainor>
            </PasswordEditSection>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <EditBtn>
                {!isEdit && (
                  <div
                    onClick={() => setIsEdit(true)}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    수정하기
                  </div>
                )}
                {isEdit && (
                  <div
                    onClick={submitEdit}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    저장완료
                  </div>
                )}
              </EditBtn>
            </div>
          </Infos>
        </ProfileSection>
      </ProfileWrap>
    </ModalBg>
  );
}

export default ProfileEdit;
