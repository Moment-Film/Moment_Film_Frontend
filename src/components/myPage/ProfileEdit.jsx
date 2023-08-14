import React from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { ProfileSection, ProfilePic, Infos } from './profileEditStyle'
import { getPrivateInfo } from "../../api/user";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRef } from "react";

function ProfileEdit() {
  const [isEdit, setIsEdit] = useState(false);
  const [curruntImage, setCurruntImage] = useState();
  const [UploadImage, setUploadImage] = useState();
  const profilePicRef = useRef();
	const userInfo = useSelector((state) => state.UserInfo);
  const access = useSelector((state)=>state.AccessToken.accessToken);
  const [cookie] = useCookies(['refresh']);
  const refresh = cookie.refresh;

  const { data, isLoading, isError, isSuccess } = useQuery(`Private${userInfo.username}`, () => getPrivateInfo({access,refresh}));

  const UploadPic = (e) => {
    const input = e.target;
    if(input.files && input.files[0]){
      setCurruntImage(URL.createObjectURL(input.files[0]));
      setUploadImage(input.files[0]);
    }
  }

	return (
		<div>
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
          <section><div><span>사용자번호</span><span>:</span></div><span>{userInfo.sub}</span></section>
          <section><div><span>유저이름</span> <span>:</span></div>{!isEdit ? <span>{userInfo.username}</span> : <input /> }</section>
          <section><div><span>이메일</span> <span>:</span></div><span>{userInfo.email}</span></section>
          <section><div><span>전화번호</span> <span>:</span></div>{!isEdit ? <span>{data?.data.body.phone}</span> : <input /> }</section>
        </Infos>
        {!isEdit && <button onClick={()=>setIsEdit(true)}>정보 수정</button>}
        {isEdit && <button onClick={()=>setIsEdit(false)}>정보 완료</button>}
			</ProfileSection>
		</div>
	);
}

export default ProfileEdit;