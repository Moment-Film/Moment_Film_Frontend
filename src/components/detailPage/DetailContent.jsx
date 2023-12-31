import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import KakaoShareBtn from "../common/component/KakaoShareBtn";
import UrlShare from "../common/component/UrlShare";
import * as S from "../common/styles/StyledSpan";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { SetFrame } from "../../redux/modules/FrameInfo";
import { SetFilter } from "../../redux/modules/Filter";
import useToken from "../../hooks/useToken";
import useUserAPI from "../../api/withToken/user";
import usePostAPI from "../../api/withToken/post";
import useCustomAPI from "../../api/withToken/useCustom";
import useDownLoad from "../../hooks/useDownload";
import view from "../assets/icons/view.svg";
import dots from "../assets/icons/dots.svg";
import selectTrue from "../assets/images/selectTrue.svg";
import selectFalse from "../assets/images/selectFalse.svg";
import resizeNull from "../assets/images/resizeNull.png";
import { ReactComponent as HeartOff } from "../assets/icons/svgHeartOff.svg";
import { ReactComponent as HeartOn } from "../assets/icons/svgHeartOn.svg";
import { SetBackgroundImg } from "../../redux/modules/FrameInfo";
import { SetImgFile } from "../../redux/modules/FrameInfo";

const DetailContent = ({ data }) => {
  const { handleDownload } = useDownLoad();

  const { applyFrame, applyFilter } = useCustomAPI();

  const { FollowAPI, likePost } = useUserAPI();

  const { deletePost } = usePostAPI();

  const { getAccess, getRefresh } = useToken();

  //필요한 변수 선언
  const param = useParams();
  const location = useLocation();
  const path = location.pathname;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  //console.log(data);

  const navigate = useNavigate();
  const [selectFrame, setSelectFrame] = useState(false);
  const [selectFilter, setSelectFilter] = useState(false);

  const userInfo = useSelector((state) => state.UserInfo);

  // 좋아요 토글
  const [isLiked, setIsLiked] = useState(
    data.likeUserId.some((like) => like.id === Number(userInfo.sub))
  );

  //액세스 토큰 리프레시 토큰 가져오는 부분

  // 기능 함수들

  const FollowHandler = () => {
    FollowAPI(data.userId);
  };

  const deleteHandler = async () => {
    const deleteSure = window.confirm("게시글을 삭제하시겠습니까?");
    if (deleteSure) {
      await deletePost(data.id);
      navigate(-1);
    }
  };

  const getDetailMutation = useMutation(likePost, {
    onSuccess: (response) => {
      setIsLiked(!isLiked);
      //console.log(response);
      {
        queryClient.invalidateQueries(`Detail${param.id}`);
      }
    },
    onError: (error) => {
      const errorMsg = error.response?.data;
      alert(errorMsg);
    },
  });

  /*   useEffect(() => {
    if (selectFrame)
      alert(
        "프레임 이미지는 사용하기 시 이미지가 다운로드됩니다.\n프레임을 첨부해서 사용해주세요.\n (자동 사용은 업데이트 예정)"
      );
  }, [selectFrame]); */

  // api 동작이 들어있는 함수
  // const postLikeHandler = () => {
  //   const accessToken = getAccess();
  //   const refreshToken = getRefresh()
  //   const postId = param.id;
  //   getDetailMutation.mutate({ postId, accessToken, refreshToken });
  // };

  // 좋아요 토글 핸들러
  const postLikeHandler = () => {
    const accessToken = getAccess();
    const refreshToken = getRefresh();
    const postId = param.id;

    getDetailMutation.mutate({ postId, accessToken, refreshToken });
  };

  const useItemHandler = () => {
    const accessToken = getAccess();
    const refreshToken = getRefresh();

    if (!(selectFrame || selectFilter)) {
      alert("사용해 볼 커스텀이 선택되지 않았습니다.");
    } else if (accessToken === null) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      if (selectFilter) {
        const filterId = data.filterId;
        applyFilter({ filterId, accessToken, refreshToken }).then((filter) => {
          //console.log(filter);
          const { id, ...other } = filter;
          console.log(other);
          dispatch(SetFilter(other));
        });
      }

      if (selectFrame) {
        const frameId = data.frameId;
        applyFrame({ frameId, accessToken, refreshToken }).then(
          async (frame) => {
            console.log(frame);
            dispatch(SetFrame(frame));

            if (frame.image) {
              fetch(frame.image)
                .then((response) => response.blob())
                .then((blob) => {
                  dispatch(SetBackgroundImg(URL.createObjectURL(blob)));
                  dispatch(SetImgFile(blob));
                })
                .catch((error) => {
                  console.error("Error fetching or processing image:", error);
                });
            }
          }
        );
      }

       navigate("/camera/frameSelect");
    }
  };
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <DetailContents onClick={() => setModalOpen(false)}>
      <DetailBody>
        <ImageSection>
          <div>
            <img src={data.image} alt="" />
          </div>
        </ImageSection>
        <DetailSection>
          {modalOpen && (
            <OptionModal>
              {Number(userInfo.sub) === data.userId && (
                <span onClick={deleteHandler} className="delete">
                  게시글 삭제
                </span>
              )}
              <div></div>
              <span>공유하기</span>
              <div>
                <KakaoShareBtn path={path} data={data}></KakaoShareBtn>
                <UrlShare data={data.id}></UrlShare>
              </div>
            </OptionModal>
          )}
          <TextDiv>
            <div className="views">
              <div>
                <span>VIEW</span>
                <img src={view} alt="" />
                <span>{data.viewCount}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(!modalOpen);
                }}
              >
                <img src={dots} alt="" />
              </button>
            </div>
            <div
              className="writer"
              onClick={() => navigate(`/profile/${data.userId}`)}
            >
              <img src={data.userImage ? data.userImage : resizeNull} alt="" />
              <span>{data.username}</span>
            </div>
            <div className="title">
              <span>{data.title}</span>
            </div>
            <div className="contents">
              <span>{data.contents}</span>
            </div>
          </TextDiv>
          <UseActionsDiv>
            <Action
              $bg={selectFrame}
              onClick={() => setSelectFrame(!selectFrame)}
            >
              <span>프레임 사용하기</span>
              <img
                src={selectFrame ? selectTrue : selectFalse}
                alt=""
                onClick={() => setSelectFrame(!selectFrame)}
              />
            </Action>
            <Action
              $bg={selectFilter}
              onClick={() => setSelectFilter(!selectFilter)}
            >
              <span>필터 사용하기</span>
              <img
                src={selectFilter ? selectTrue : selectFalse}
                alt=""
                onClick={() => setSelectFilter(!selectFilter)}
              />
            </Action>
            <button onClick={useItemHandler}>사용해보기</button>
          </UseActionsDiv>
          <LikeDiv>
            <span>좋아요 {data.likeCount}</span>
            {/* <img src={data.likeUserId.some(like => like.id === Number(userInfo.sub)) ? heartOn : heartOff}onClick={postLikeHandler} /> */}
            {isLiked ? (
              <StyledHeartOn onClick={postLikeHandler} />
            ) : (
              <StyledHeartOff onClick={postLikeHandler} />
            )}
          </LikeDiv>
          <CreateAt>{data.createdAt}</CreateAt>
        </DetailSection>
      </DetailBody>
    </DetailContents>
  );
};

export default DetailContent;

const DetailContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 756px;
  width: 100%;
  background-color: var(--whiteGray);
  border-top: 2px solid var(--lightGray);
  border-bottom: 2px solid var(--lightGray);

  @media (max-width: 770px) {
    height: 1400px;
  }
`;
const DetailBody = styled.div`
  display: flex;
  width: 770px;
  align-items: center;
  justify-content: space-between;
  section {
    display: flex;
    width: 370px;
    height: 648px;
  }
  span {
    line-height: 150%;
  }
  @media (max-width: 770px) {
    flex-direction: column;
    justify-content: center;
  }
`;
const ImageSection = styled.section`
  align-items: center;
  justify-content: left;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 552px;
    img {
      height: 100%;
      border-radius: 7px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    }
  }
`;
const DetailSection = styled.section`
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--lightGray);
  border-radius: 5px;
  padding: 20px 24px;
  flex-direction: column;
`;
const TextDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  .views {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    span {
      font-size: 14px;
      color: var(--gray3);
    }
    div {
      height: 23px;
      display: flex;
      align-items: center;
      color: var(--lightGray);
      img {
        height: 21px;
        margin-right: 5px;
      }
    }
    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  }
  .writer {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
    span {
      color: var(--unnamed, #333);
      font-size: 14px;
      font-weight: 500;
    }
    img {
      width: 30px;
      height: 30px;
      background-color: var(--gray);
      border-radius: 15px;
    }
  }
  .title {
    span {
      width: 100%;
      color: var(--black);
      line-height: 31.2px;
      font-size: 24px;
      font-weight: 500;
      white-space: pre-wrap;
    }
    margin-bottom: 40px;
  }
  .contents {
    width: 100%;
    height: 126px;
    margin-bottom: 24px;
    span {
      font-size: 15px;
      color: var(--gray5);
      white-space: pre-wrap;
    }
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      box-sizing: border-box;
      background-color: var(--green1);
      border: 2px solid var(--green4);
    }
    &::-webkit-scrollbar-track {
      background-color: var(--whiteGray);
    }
  }
`;
const UseActionsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  button {
    margin-top: 12px;
    box-sizing: border-box;
    background-color: #cbe7a1;
    border: 2px solid var(--green5);
    width: 97px;
    height: 37px;
    border-radius: 5px;
    color: var(--green6);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
`;
const Action = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px 0 20px;
  height: 38px;
  border: ${({ $bg }) => ($bg ? "2px solid" : "1px solid")};
  border-radius: 5px;
  font-size: 14px;
  span {
    color: ${({ $bg }) => ($bg ? "var(--green4)" : "var(--gray3)")};
    font-weight: ${({ $bg }) => $bg && "500"};
  }
  color: ${({ $bg }) => ($bg ? "var(--green4)" : "var(--gray3)")};
  cursor: pointer;
`;
const LikeDiv = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 26px;
  gap: 7px;
  span {
    font-size: 14px;
    color: var(--gray5_a);
    font-weight: 500;
  }
`;
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const StyledHeartOn = styled(HeartOn)`
  fill: #fe626287;
  transition: fill 0.3s ease;
  cursor: pointer;

  &:hover {
    fill: var(--warningRed);
    animation: ${bounce} 0.6s;
  }
`;

const StyledHeartOff = styled(HeartOff)`
  fill: #939292;
  transition: fill 0.3s ease;
  cursor: pointer;

  &:hover {
    fill: var(--black);
  }
`;

const CreateAt = styled.span`
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: var(--gray4);
  line-height: 150%;
  margin-top: 40px;
  font-weight: 400;
`;
const OptionModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  padding: 10px 29px 15px;
  gap: 7px;
  border: 1px solid var(--green4);
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 6px 10px rgba(53, 60, 44, 0.05);
  color: var(--green5);
  font-size: 14px;
  left: 50%;
  top: 190px;
  margin-left: 220px;
  .delete {
    margin-bottom: 10px;
    cursor: pointer;
  }
  div {
    display: flex;
    gap: 5px;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
  }
`;
