import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import useToken from "../../hooks/useToken";
import usePostAPI from "../../api/withToken/post";
import commentImg from '../assets/images/comment.png';
import dots from '../assets/icons/dots.svg'
import downArrow from '../assets/images/downArrow.svg'
import cloud from '../assets/images/cloud.svg'
import replyArrow from '../assets/images/replyArrow.svg'

//input 태그를 따로 빼면 컴포넌트의 필요없는 랜더링을 줄일 수 있다
const Comment = ({ data }) => {

  const{
    addComment,
    addReply,
    delComment,
    delReply
  }=usePostAPI();

  const {
    getAccess,
    getRefresh,
  }=useToken();

  //변수 선언부
  const param = useParams();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState(null);
  const [recomment, setRecomment] = useState({});
  const [commentList, setCommentList] = useState(data);
  const [isReplyShow, setIsReplyShow] = useState([null]);
  const [isReplyWrite, setIsReplyWrite] = useState([null]);


  useEffect(() => {
    setCommentList(data);
  }, [data]);

  //일반 함수 부
  const showReplyHandler = (commentId) => {
    const newList = isReplyShow.includes(commentId) // 받은 댓글ID가 SHOW 배열에 존재하는지
      ? isReplyShow.filter((item) => item !== commentId) // 존재하면 해당 댓글빼고 리턴
      : [...isReplyShow, commentId]; // 존재하지않으면 추가

    setIsReplyShow(newList); // 설정
  };
  const writeReplyHandler = (commentId) => {
    const newList = isReplyWrite.includes(commentId)
      ? isReplyWrite.filter((item) => item !== commentId) // 존재하면 해당 댓글빼고 리턴
      : [...isReplyWrite, commentId]; // 존재하지않으면 추가
    setIsReplyWrite(newList); // 설정
  };

  const CommentInput = (e) => {
    setComment(e.target.value);
  };

  const InputReply = (e, id) => {
    setRecomment({ ...recomment, [id]: e.target.value });
  };

  // mutatin 함수 선언 부
  const CommentMutation = useMutation(addComment, {
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

  const ReplyMutation = useMutation(addReply, {
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

  const DelCommentMutation = useMutation(delComment, {
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

  const DelReplyMutation = useMutation(delReply, {
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
  const AddComment = () => {
    const accessToken = getAccess();
    const refreshToken = getRefresh();

    const postId = param.id;
    CommentMutation.mutate({ postId, comment });
    setComment("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      const postId = param.id;
      CommentMutation.mutate({ postId,comment });
      setComment("");
    }
  };

  const AddReply = (commentId) => {
    const accessToken = getAccess();
    const refreshToken = getRefresh();

    const replay = recomment[commentId];
    ReplyMutation.mutate({ commentId, accessToken, refreshToken, replay });
    setRecomment({ ...recomment, [commentId]: "" });
    setIsReplyWrite([null]);
  };

  const DeleteComment = (commentId) => {
    const accessToken = getAccess();
    const refreshToken = getRefresh();

    const postId = param.id;
    DelCommentMutation.mutate({ commentId, accessToken, refreshToken, postId });
  };

  const DeleteReply = (commentId, replyId) => {
    const accessToken = getAccess();
    const refreshToken = getRefresh();
    
    console.log(replyId);
    const postId = param.id;
    DelReplyMutation.mutate({
      commentId,
      accessToken,
      refreshToken,
      postId,
      replyId,
    });
  };
  const userInfo = useSelector((state) => state.UserInfo);

  return (
    <CommentSection>
      <CommentInputArea>
        <div className="comment-count">
          <span>{commentList?.length}개의 댓글</span>
          <img src={commentImg} alt="" />
        </div>
        <CommentInputDiv>
          <textarea
            placeholder="댓글을 입력해 주세요"
            value={comment}
            rows={1}
            onChange={CommentInput}
          />
          <button onClick={AddComment}>등록</button>
        </CommentInputDiv>
      </CommentInputArea>
      {commentList &&
        commentList.map((comment) => (
          <>
          <CommentContainer key={comment.id}>
            <CommentMain>
              <ProfileSection>
                <img className="profilePic"
                  src="https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg"
                  alt=""
                />
                <span>{comment.username}</span>
                {comment.userId === Number(userInfo.sub) &&
                  <img src={dots} alt="" onClick={() => DeleteComment(comment.id)}/>}
              </ProfileSection>
              <div className="comment">{comment.content}</div>
              <BottomSection>
                <span className="date">{comment.createdAt} 2023/08/24 08:47:47</span>
                {comment.subComments.length>0 &&
                <span onClick={() => showReplyHandler(comment.id)}>{comment.subComments.length}개의 답글
                <img src={downArrow} style={{scale: isReplyShow.includes(comment.id)&&"-1"}} alt=""/>
                </span>}
                <span className="write" onClick={()=>writeReplyHandler(comment.id)}>답글 작성<img src={cloud} alt=""/> </span>
              </BottomSection>
              {isReplyWrite.includes(comment.id) && <CommentInputDiv>
                <textarea
                  placeholder="대댓글 작성"
                  rows={1}
                  value={recomment[comment.id]}
                  onChange={(e) => InputReply(e, comment.id)}
                />
                <button onClick={() => AddReply(comment.id)}>답글 등록</button>
              </CommentInputDiv>}

            </CommentMain>
          </CommentContainer>
            {isReplyShow.includes(comment.id) &&
              comment.subComments
                .slice()
                .reverse()
                .map((reply) => (
                <CommentContainer key={reply.id}>
                  <CommentMain>
                    <ProfileSection>
                      <img className="reply" src={replyArrow} alt="" />
                      <img className="profilePic"
                        src="https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg"
                        alt=""
                      />
                      <span>{reply.username}</span>
                      {reply.userId === Number(userInfo.sub) &&
                        <img src={dots} alt="" onClick={() => DeleteReply(comment.id, reply.id)}/>}
                    </ProfileSection>
                    <CommentMain>
                      <div className="comment">{reply.content}</div>
                    </CommentMain>
                    <BottomSection>
                      <span className="date">{comment.createdAt} 2023/08/24 08:47:47</span>
                    </BottomSection>
                  </CommentMain>
                </CommentContainer>
                ))}
                </>
        ))}
    </CommentSection>
  );
};

export default Comment;

const CommentSection = styled.section`
  display: flex;
  width: 970px;
  flex-direction: column;
  align-items: center;
  font-family: "Pretendard-Regular";
  line-height: 130%;
`;
const CommentInputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 2px solid var(--lightGray);
  .comment-count {
    margin-top: 34px;
    display: flex;
    font-size: 16px;
    color: var(--gray4);
    font-weight: 600;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    img{
      width: 24px;
    }
  }
`;
const CommentInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  max-height: 116px;
  gap: 5px;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid var(--green5);
  margin-top: 13px;
  margin-bottom: 10px;
  textarea {
    font-family: "Pretendard-Regular";
    overflow-y: auto;
    border-radius: 5px;
    padding: 10px 0 10px 10px;
    resize: none;
    line-height: 130%;
    max-height: 76px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    margin-right: 10px;
    &::-webkit-scrollbar{
      width: 10px;
    }
    &::-webkit-scrollbar-thumb{
      box-sizing: border-box;
      background-color: var(--green1);
      border: 2px solid var(--green4);
    }
    &::-webkit-scrollbar-track{
      background-color: var(--whiteGray);
    }
  }
  button {
    display: flex;
    border: none;
    height: 100%;
    align-items: center;
    background: none;
    white-space: nowrap;
    padding: 0 5px;
    margin-right: 10px;
    cursor: pointer;
    color: var(--green5);
    font-size: 16px;
    font-weight: 600;
    &:hover{
      background-color: var(--green2);
      transition: background-color 0.5s ease;
    }
  }
`;
const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  border-bottom: 2px solid var(--lightGray);
`;
const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
  .profilePic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--gray);
    margin-right: 11px;
  }
  .reply {
    margin-right: 17px;
  }
  span {
    margin-right: auto;
    cursor: pointer;
    font-size: 14px;
    color: var(--gray4);
  }
  img {
    cursor: pointer;
  }
`;
const BottomSection = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--gray4);
  span{
    cursor: pointer;
  }
  img {
    width: 16px;
    margin-left: 5px;
  }
  .date {
    margin-right: auto;
    cursor: default;
  }
  .write {
    margin-left: 20px;
    color: var(--green5);
  }
`
const CommentMain = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  .comment {
    width: 100%;
    max-height: 50px;
    font-size: 16px;
    color: var(--gray5);
    margin-bottom: 20px;
  }
`;
