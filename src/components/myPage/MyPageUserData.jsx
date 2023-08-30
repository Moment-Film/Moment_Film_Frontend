import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal } from "../common/component/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import Edit from "../assets/icons/Edit.png";
import out from "../assets/icons/goOut.svg"
import useUserAPI from "../../api/withToken/user";
import { Span28, StyledSpan24 } from "../common/styles/StyledSpan";
// import ProfileEdit from "./ProfileEdit";
import EditModal from "./EditModal";
import LogoutBtn from "../common/component/LogoutBtn";
import nullImg from "../assets/images/nullProfile.svg";
import { useQuery } from "react-query";
import { getProfile } from "../../api/nonToken/user";

const MyPageUserData = ({ lang, data, }) => {
  const { FollowAPI } = useUserAPI();

  // const { data:profileData, error, isLoading } = useQuery(['profile', userId], () => getProfile(userId));


  const userInfo = useSelector((state) => state.UserInfo);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [fof, setFof] = useState("followerList");

  const editModalHandler = () => {
    setOnModal(!onModal);
  };

  const clickHandler = (modalData) => {
    setShowModal(true);
    setFof(modalData);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const fofToggle = () => {
    fof === "followerList" ? setFof("followingList") : setFof("followerList");
  };

  const FollowHandler = () => {
    if (userInfo.sub) {
      FollowAPI(data.id);
    } else {
      alert("로그인이 필요합니다.");
      navigate(`/login`);
    }
  };

  return (
    <div>
      {onModal && <EditModal onClose={editModalHandler} profileImg={data.image} />}
      {showModal && (
        <Modal
          onClose={hideModalHandler}
          onToggle={fofToggle}
          data={data[fof]}
          title={fof}
          id={data.id}
          me={Number(userInfo.sub)}
        />
      )}

      <UserInfoSection>
        <UserProfileSection>
        <Img src={data.image ? data.image : nullImg} />
        </UserProfileSection>

        <UserDataSection>
          <NameSection>
            {Number(userInfo.sub) === data.id ? (
              <>
                <div className="item-1">
                  <StyledSpan24>{data.username}</StyledSpan24>
                  <span className="point">+600P</span>
                </div>

                <div className="item-2">
                  <div className="option" onClick={editModalHandler}>
                    <span>개인정보 수정</span>
                    <img src={Edit} alt="" />
                  </div>
                  <div className="option">
                    <LogoutBtn />
                    <img src={out} alt="" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="item-1">
                  <StyledSpan24>{data.username}</StyledSpan24>
                  <span className="subSpan">{" 님의 프로필"}</span>

                  {data.followerList.some(
                    (follower) => follower.id === Number(userInfo.sub)
                  ) ? (
                    <FollowBtn state={true} onClick={FollowHandler}>
                      ㆍ언팔로우{" "}
                    </FollowBtn>
                  ) : (
                    <FollowBtn state={false} onClick={FollowHandler}>
                      ㆍ팔로우
                    </FollowBtn>
                  )}
                </div>

                <div className="item-2">
                  <div className="option">
                    <LogoutBtn />
                    <img src={Edit} alt="" />
                  </div>
                </div>
              </>
            )}
          </NameSection>
          <div className="box-2">
            <div onClick={() => clickHandler("followerList")}>
              <UserItem>{"팔로우"}</UserItem>
              <UserItemResult>{data.followerList.length}</UserItemResult>
            </div>
            <hr />
            <div onClick={() => clickHandler("followingList")}>
              <UserItem>{"팔로잉"}</UserItem>
              <UserItemResult>{data.followingList.length}</UserItemResult>
            </div>
            <hr />
            <div>
              <UserItem>{"게시글 수"}</UserItem>
              <UserItemResult>{data.postList.length}</UserItemResult>
            </div>
          </div>
        </UserDataSection>
      </UserInfoSection>
    </div>
  );
};

export default MyPageUserData;

const UserInfoSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 74px 0 74px 0;
  background-color: var(--whiteGray);

  @media (max-width: 700px) {
    align-items: center;
    flex-direction: column;
    padding: 0;
  }
`;

const UserProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 198px;
  height: 250px;
  border: 2px solid var(--black);
`;

const FollowBtn = styled.button`
  background-color: rgb(96, 161, 14);
  color: ${(props) => (props.state ? "var(--green5)" : "white")};
  background-color: ${(props) =>
    props.state ? "rgb(246, 250, 240)" : "green"};
  border-radius: 5px;
  border: 1px solid rgb(96, 161, 14);
  padding: 0 10px 0 10px;
`;

const NameSection = styled.div`
  display: flex;
  justify-content: space-between;
  .item-1 {
    display: flex;
    gap: 10px;
    padding-top: 30px;

    .point {
      padding-top: 10px;
      font-size: 16px;
      font-weight: bold;
      color: var(--green5);
    }

    .subSpan {
      padding-top: 10px;
    }
  }
  .item-2 {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 22px;
    }

    .option {
      display: flex;
      align-items: center;
      padding-bottom: 30px;
      gap: 5px;
    }
  }


  @media (max-width: 700px) {
        align-items:center;
        flex-direction:column;

}

/*   justify-content: space-between;

  image{
    width:20px;
  }
  .leftOptions{
    display:flex;
    gap:20px;
  }
  .box-1{
    display:flex;
    width:126px;
    height:37px;
  } */
`;

const UserDataSection = styled.section`
  display: flex;
  width: 60%;
  max-width: 550px;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  .box-2 {
    padding: 0 20% 0 20%;
    display: flex;
    height: 178px;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid green;
    border-radius: 5px;
    hr {
      height: 19.2px;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
  }
`;

const UserItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  color: var(--gray5);
`;
const UserItemResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  font-weight: bold;
  color: var(--green5);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
