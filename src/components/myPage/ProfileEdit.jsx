import React, { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { ProfileSection, ProfilePic, Infos } from "./profileEditStyle";
import {
  getPrivateInfo,
  putEditInfo,
  replacePassword,
  sendEmail,
} from "../../api/user";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import WithdrawalBtn from "../common/component/WithdrawalBtn";

// "code = ${}"
function ProfileEdit() {
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

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const profilePicRef = useRef();

  const userInfo = useSelector((state) => state.UserInfo);

  const access = useSelector((state) => state.AccessToken.accessToken);
  const [cookie] = useCookies(["refresh"]);
  const refresh = cookie.refresh;

  const { data, isLoading, isError, isSuccess } = useQuery(
    `Private${userInfo.sub}`,
    () => getPrivateInfo({ access, refresh })
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

  const sendEmailMutation = useMutation(() => sendEmail({ access, refresh }), {
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
        access,
        refresh,
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
    editInfoMutation.mutate({ access, refresh, editName, editPhone });
  };

  const handleSendEmail = () => {
    sendEmailMutation.mutate();
    setIsClicked(true);
  };

  const handlePasswordReset = () => {
    replacePasswordMutation.mutate();
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

  return (
    <ProfileWrap>
      <ProfileSection>
        <ProfilePic>
          <img src={curruntImage} alt="프로필 이미지" />
          <input
            type="file"
            accept="image/*"
            ref={profilePicRef}
            onChange={UploadPic}
          />
        </ProfilePic>
        <Infos>
          <section>
            <div>
              <span>사용자번호</span>
              <span>:</span>
            </div>
            <span>{userInfo.sub}</span>
          </section>
          <section>
            <div>
              <span>유저이름</span> <span>:</span>
            </div>
            {!isEdit ? (
              <span>{data?.data.data.username}</span>
            ) : (
              <input
                value={editProfile.username || ""}
                onChange={(e) => editInputHandler("username", e.target.value)}
              />
            )}
          </section>
          <section>
            <div>
              <span>이메일</span> <span>:</span>
            </div>
            <span>{userInfo.email}</span>
          </section>
          <section>
            <div>
              <span>전화번호</span> <span>:</span>
            </div>
            {!isEdit ? (
              <span>{data?.data.data.phone}</span>
            ) : (
              <input
                value={editProfile.phone || ""}
                onChange={(e) => editInputHandler("phone", e.target.value)}
              />
            )}
          </section>
        </Infos>
        {!isEdit && <button onClick={() => setIsEdit(true)}>정보 수정</button>}
        {isEdit && <button onClick={submitEdit}>정보 완료</button>}
      </ProfileSection>
      <PasswordEditSection>
        <div>이메일 인증하기</div>

        {!isVerified && (
          <>
            <button onClick={handleSendEmail}>
              {isClicked ? "인증코드 재전송" : "인증코드 전송"}
            </button>
            <input
              placeholder="인증코드를 입력해 주세요"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </>
        )}
        {!isVerified ? (
          isClicked && <button onClick={handleVerifyCode}>입력</button>
        ) : (
          <p>인증코드가 일치합니다.</p>
        )}
        {isVerified && (
          <>
            <div>새 비밀번호 설정하기</div>
            <input
              placeholder="새 비밀번호를 입력해 주세요"
              value={newPassword}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordReset}>비밀번호 변경</button>
          </>
        )}
      </PasswordEditSection>
      <WithdrawalBtn />
    </ProfileWrap>
  );
}

export default ProfileEdit;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PasswordEditSection = styled.div`
  border: 1px solid var(--black);
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
`;

const CodeBtnWrap = styled.div`
  display: flex;
`;
