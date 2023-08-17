import React, { useEffect, useState } from 'react';
import styled from "styled-components"

import KakaoShareBtn from "../common/component/KakaoShareBtn"
import UrlShare from "../common/component/UrlShare"
import * as S from "../common/styles/StyledSpan"
import { FollowAPI } from "../../api/snsUser"
import { likePost } from "../../api/likePost"
import { getPostDetail, deletePost } from "../../api/post"
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
const DetailContent = ({ data }) => {
  //필요한 변수 선언
  const param = useParams();
  const location = useLocation();
  const path = location.pathname
  const queryClient = useQueryClient();

  console.log(data);

  const navigate = useNavigate();
  const [selectFrame, setSelectFrame] = useState(false);
  const [selectFilter, setSelectFilter] = useState(false);
  const userInfo = useSelector((state)=>state.UserInfo);
  

  //액세스 토큰 리프레시 토큰 가져오는 부분 
  const [cookie, setCookie] = useCookies(['refresh']);
  const accessToken = useSelector((state) => state.AccessToken.accessToken);
  const refreshToken = cookie.refresh

  // 기능 함수들 

  const FollowHandler = () => {
    FollowAPI(data.userId, accessToken, refreshToken);
  }

  const deleteHandler = async () => {
    await deletePost(data.id, accessToken, refreshToken)
    navigate(-1);
  }

  const getDetailMutation = useMutation(likePost, {
    onSuccess: (response) => {
      console.log(response);
      {
        queryClient.invalidateQueries(`Detail${param.id}`);
      }
    },
    onError: (error) => {
      alert("에러");
    },
  });

  // api 동작이 들어있는 함수
  const postLikeHandler = () => {
    const postId = param.id;
    getDetailMutation.mutate({ postId, accessToken, refreshToken });
  };

  return (
    <div>
      <DetailHeader>
        <S.StyledBoldSpan28>Detail Page</S.StyledBoldSpan28>
      </DetailHeader>
      <DetailContents>
        <FrameSection>
          <img src={data.image} alt="" />
        </FrameSection>

        <DetailPost>
          <ViewCount><S.StyledSpan14>view +{data.viewCount}</S.StyledSpan14></ViewCount>
          <S.StyledSpan14>작성날짜 {data.createdAt} </S.StyledSpan14>
          <S.StyledBoldSpan24>{data.title}</S.StyledBoldSpan24>
          <S.StyledSpan18>● {data.username} 님</S.StyledSpan18>

          <Detail>
            <S.StyledSpan16>{data.contents}</S.StyledSpan16>
          </Detail>

          <OptionSection>
            <CheckBox $bg={selectFrame} onMouseDown={() => setSelectFrame(!selectFrame)}>
              <span >프레임 사용하기</span>
              <input type="checkbox" value={selectFrame} checked={selectFrame} />
            </CheckBox>
            <CheckBox $bg={selectFilter} onMouseDown={() => setSelectFilter(!selectFilter)}>
              <span >필터 사용하기</span>
              <input type="checkbox" value={selectFilter} checked={selectFilter} />
            </CheckBox>
            <button>사용해보기</button>
          </OptionSection>

                    <PostAction>
                        <Action>
                            <S.StyledSpan14>좋아요 수</S.StyledSpan14>
                            <S.StyledSpan14>{data.likeCount}개</S.StyledSpan14>
                            <S.StyledSpan14 onClick={postLikeHandler}>하트</S.StyledSpan14>
                            <KakaoShareBtn path={path} data={data} ></KakaoShareBtn>
                            <UrlShare></UrlShare>
                            {
                              Number(userInfo.sub)===data.userId ?
                              <button onClick={deleteHandler}>게시글 삭제</button> :
                              <button onClick={FollowHandler}>팔로우</button>
                            }
                            {/* <button onClick={FollowHandler}>팔로우</button>
                            <button onClick={deleteHandler}>게시글 삭제</button> */}
                        </Action>
                    </PostAction>

        </DetailPost>
      </DetailContents>
    </div>
  );
};

export default DetailContent;

const DetailHeader = styled.div`
  display:flex;
  flex-direction:column;
  padding: 83px 0 44.5px;
`
const DetailContents = styled.div`
  display:flex;
  height:660px;
  border-top: 2px solid var(--lightGray);
`
const FrameSection = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:55%;
 
  background-color: #EBEBEB;
  padding:20% 5% 20% 5%;
  img{
    width:55%;
  }
  
`
const DetailPost = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width:45%;

  gap:30px;
  padding:30px;
`
const Detail = styled.div`
/*   min-height:210px; */
`
const ViewCount = styled.div`
  margin-left:auto;
`
const OptionSection = styled.section`
  display:flex;
  align-items:center;
  flex-direction:column;
  gap:10px;

  button{
    width: 160px;
    height:46px;
    background-color: rgb(246, 250, 240);
    color:rgb(156, 217, 79);
    border:2px solid rgb(156, 217, 79);
    border-radius:5px;

  }

`
const CheckBox = styled.div`
  display: flex;
  justify-content:space-between;
  align-items:center;
  width: 100%;
  height: 38px;

  padding: 0 10px 0 10px;
  box-sizing:border-box;

  background-color: ${(props) => props.$bg ? 'var(--lightGreen)' : 'var(--lightGray)'};
  color:${(props) => props.bg ? 'var(--black)' : 'var(--whiteGray);'}; 
  label {
    width: 100%;
  }
`
const PostAction = styled.div`
  display:flex;
  flex-direction:row;

  justify-content:space-around;

`
const Action = styled.div`
  display:flex;
  flex-direction:row;
  gap:5px;

`