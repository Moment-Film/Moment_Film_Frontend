import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import Edit from "../assets/icons/Edit.png";
import useUserAPI from "../../api/withToken/user";
import { StyledBoldSpan24 } from "../common/styles/StyledSpan";
import EditModal from "./EditModal";
import LogoutBtn from "../common/component/LogoutBtn";
import nullImg from "../assets/images/nullProfile.svg";
import logoutIcon from "../assets/icons/LogOut.svg";

const MyPageUserData = ({ lang, data }) => {
  const { FollowAPI } = useUserAPI();
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
      {onModal && (
        <EditModal onClose={editModalHandler} profileImg={data.image} />
      )}
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
                  <StyledBoldSpan24>{data.username}</StyledBoldSpan24>
                  {/* <span className="point">0P</span> */}
                </div>

                <div className="item-2">
                  <div className="option" onClick={editModalHandler}>
                    <button>개인정보 수정</button>
                    <img src={Edit} alt="" />
                  </div>
                  <div className="option">
                    <LogoutBtn />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="item-1">
                  <StyledBoldSpan24>{data.username}</StyledBoldSpan24>
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
                    {/*               <LogoutBtn />
                    <img src={Edit} alt="" /> */}
                  </div>
                </div>
              </>
            )}
          </NameSection>
          <div className="box-2">
            <div onClick={() => clickHandler("followerList")}>
              <UserItem cursor={"pointer"}>팔로워</UserItem>
              <UserItemResult cursor={"pointer"}>
                {data.followerList.length}
              </UserItemResult>
            </div>
            <div>
              <span />
            </div>
            <div onClick={() => clickHandler("followingList")}>
              <UserItem cursor={"pointer"}>팔로잉</UserItem>
              <UserItemResult cursor={"pointer"}>
                {data.followingList.length}
              </UserItemResult>
            </div>
            <div>
              <span />
            </div>
            <div>
              <UserItem cursor={"default"}>게시글 수</UserItem>
              <UserItemResult cursor={"default"}>
                {data.postList.length}
              </UserItemResult>
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
  background-color: ${(props) =>
    props.state ? "var(--green1)" : "var(--green5)"};
  border-radius: 5px;
  border: 1px solid var(--green5);
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  color: ${(props) => (props.state ? "var(--green5)" : "white")};
  cursor: pointer;
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
      font-weight: 700;
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
      margin-left: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding-bottom: 30px;
      gap: 5px;
      button {
        font-size: 14px;
        border: none;
        padding: 0;
        background: none;
        cursor: pointer;
      }
      img {
        width: 24px;
      }
    }
  }
  @media (max-width: 700px) {
    align-items: center;
    flex-direction: column;
  }
`;

const UserDataSection = styled.section`
  display: flex;
  width: 60%;
  max-width: 550px;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  .box-2 {
    padding: 0 20%;
    display: flex;
    height: 178px;
    align-items: center;
    justify-content: center;
    gap: 15%;
    background-color: white;
    border: 1px solid var(--green5);
    border-radius: 5px;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.05);

    span {
      display: block;
      width: 1px;
      height: 15px;
      background-color: var(--gray3);
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 10px;
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
  font-weight: 400;
  line-height: 150%;
  color: var(--gray5);
  cursor: ${(props) => props.cursor};
`;

const UserItemResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  font-weight: 700;
  color: var(--green5);
  cursor: ${(props) => props.cursor};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
