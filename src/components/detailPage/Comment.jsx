import React, { useState, useEffect } from "react";
import styled from "styled-components";
import commentEnter from "../../components/assets/icons/commentEnter.png";
import Replay_comment from "../../components/assets/icons/replay_comment.png";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { addComment } from "../../api/addComment";
import { useParams } from "react-router-dom";
import { addReply } from "../../api/addComment";
import { delComment } from "../../api/addComment";
import { delReply } from "../../api/addComment";

//input 태그를 따로 빼면 컴포넌트의 필요없는 랜더링을 줄일 수 있다
const Comment = ({ data, isSuccess }) => {
  console.log(data);

  //변수 선언부
  const param = useParams();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState(null);
  const [recomment, setRecomment] = useState({});
  const [commentList, setCommentList] = useState(data);
  const [isReplyShow, setIsReplyShow] = useState([null]);

  const accessToken = useSelector((state) => state.AccessToken.accessToken);
  const [cookie] = useCookies(["refresh"]);
  const refreshToken = cookie.refresh;

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
    const postId = param.id;
    CommentMutation.mutate({ postId, accessToken, refreshToken, comment });
    setComment("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      const postId = param.id;
      CommentMutation.mutate({ postId, accessToken, refreshToken, comment });
      setComment("");
    }
  };

  const AddReply = (commentId) => {
    const replay = recomment[commentId];
    ReplyMutation.mutate({ commentId, accessToken, refreshToken, replay });
    setRecomment({ ...recomment, [commentId]: "" });
  };

  const DeleteComment = (commentId) => {
    const postId = param.id;
    DelCommentMutation.mutate({ commentId, accessToken, refreshToken, postId });
  };

  const DeleteReply = (commentId, replyId) => {
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
        <CommentInputDiv>
          <input
            placeholder="댓글을 입력해 주세요"
            value={comment}
            onChange={CommentInput}
          />
          <img
            src={commentEnter}
            alt="commentEnter"
            onClick={AddComment}
            onKeyPress={handleKeyPress}
          ></img>
        </CommentInputDiv>
      </CommentInputArea>
      {commentList &&
        commentList.map((comment) => (
          <CommentContainer key={comment.id}>
            <CommentsDetail>
              <CommentCard>
                <ProfilePic>
                  <img
                    src="https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg"
                    alt=""
                  />
                </ProfilePic>
                <CommentMain>
                  <div>{comment.username}</div>
                  <div>{comment.content}</div>

                  <input
                    placeholder="대댓글 작성"
                    value={recomment[comment.id]}
                    onChange={(e) => InputReply(e, comment.id)}
                  />
                  <button onClick={() => AddReply(comment.id)}>입력</button>

                  {comment.subComments.length > 0 && (
                    <button onClick={() => showReplyHandler(comment.id)}>
                      {isReplyShow.includes(comment.id)
                        ? `대댓글 닫기`
                        : `대댓글 보기 ( ${comment.subComments.length} )`}
                    </button>
                  )}

                  {comment.userId === Number(userInfo.sub) && (
                    <button onClick={() => DeleteComment(comment.id)}>
                      댓글삭제
                    </button>
                  )}
                </CommentMain>
              </CommentCard>
            </CommentsDetail>
            {isReplyShow.includes(comment.id) &&
              comment.subComments
                .slice()
                .reverse()
                .map((reply) => (
                  <ReplayComment key={reply.id}>
                    <CommentsDetail>
                      <img src={Replay_comment} alt="" />
                      <CommentCard>
                        <ProfilePic>
                          <img
                            src="https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg"
                            alt=""
                          />
                        </ProfilePic>
                        <CommentMain>
                          <div>{reply.username}</div>
                          <div>{reply.content}</div>
                        </CommentMain>
                        {reply.userId === Number(userInfo.sub) && (
                          <button
                            onClick={() => DeleteReply(comment.id, reply.id)}
                          >
                            대댓글삭제
                          </button>
                        )}
                      </CommentCard>
                    </CommentsDetail>
                  </ReplayComment>
                ))}
          </CommentContainer>
        ))}
    </CommentSection>
  );
};

export default Comment;

const CommentSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
const CommentInputArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 158.5px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--lightGray);
  padding: 0 10%;
  margin-bottom: 20px;
`;
const CommentInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 19px 36px 19px 36px;
  width: 100%;
  height: 55px;
  gap: 5px;
  box-sizing: border-box;
  border-bottom: 2px solid black;
  background-color: var(--whiteGray);
  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    background-color: var(--whiteGray);
  }
  img {
    cursor: pointer;
  }
`;
const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10%;
  gap: 10px;
  border-bottom: 2px solid var(--lightGray);
`;
const CommentsDetail = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
  flex-direction: row;
  gap: 5px;
  padding: 20px 0;
`;
const CommentCard = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 5px;
`;
const ProfilePic = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
const CommentMain = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  flex-direction: column;
  border: 1px solid rgb(96, 161, 14);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding: 15px;
  background-color: rgb(246, 250, 240);
`;
const ReplayComment = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 80%;
`;
