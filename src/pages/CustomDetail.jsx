import { React, useState } from "react"
import styled from "styled-components"
import * as S from "../components/common/styles/StyledSpan"
import commentEnter from '../components/assets/icons/commentEnter.png'
import Replay_comment from '../components/assets/icons/replay_comment.png'
import KakaoShareBtn from "../components/common/component/KakaoShareBtn"
import UrlShare from "../components/common/component/UrlShare"

function CustomDetail() {
  const[selectFrame,setSelectFrame]=useState(false);
  const[selectFilter,setSelectFilter]=useState(false);
  console.log(selectFrame)
  console.log(selectFilter)

  const commentList = [
    {
      commentId: 1, content: "최고예요^^", username: "닉네임", createdAt: "2023-08-10", replyList: [
        {
          replyId: 1, content: "최고예요^^", username: "떡볶이", createdAt: "2023-08-10",
        },
        {
          replyId: 2, content: "너무 예뻐요", username: "깜찍이", createdAt: "2023-08-10",
        },
        {
          replyId: 3, content: "이 필터 최고네요 ^^b", username: "야옹이", createdAt: "2023-08-10",
        },
      ]
    },
    {
      commentId: 2, content: "너무 예뻐요", username: "깜찍이", createdAt: "2023-08-10", replyList: [
        {
          replyId: 4, content: "최고예요^^", username: "불닭볶음면", createdAt: "2023-08-10",
        },
        {
          replyId: 5, content: "너무 예뻐요", username: "카리나", createdAt: "2023-08-10",
        },
      ]
    },
    {
      commentId: 3, content: "이 필터 최고네요 ^^b", username: "야옹이", createdAt: "2023-08-10", replyList: []
    },
  ]
  const [isReplyShow, setIsReplyShow] = useState([null]);

  const showReplyHandler = (commentId) => {
    const newList = isReplyShow.includes(commentId) // 받은 댓글ID가 SHOW 배열에 존재하는지  
    ? isReplyShow.filter((item)=> item !== commentId)  // 존재하면 해당 댓글빼고 리턴 
    : [ ... isReplyShow, commentId ] ; // 존재하지않으면 추가 
    
    setIsReplyShow(newList); // 설정 
  }


  return (
    <div style={{backgroundColor: "var(--whiteGray)"}}>
    <DetailSection>
      <DetailHeader>
        <S.StyledBoldSpan28>Detail Page</S.StyledBoldSpan28>
      </DetailHeader>

      <DetailContents>
        <FrameSection>
          <img src="https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg" alt="" />
        </FrameSection>

        <DetailPost>
          <VeiwCount><S.StyledSpan14>veiw</S.StyledSpan14></VeiwCount>
          <S.StyledSpan14>작성날짜 2023.07.14 / 14:30 </S.StyledSpan14>
          <S.StyledBoldSpan24>오랜지 태양같은 필터쓰니까 친구들과 이쁘게</S.StyledBoldSpan24>
          <S.StyledSpan18>● 닉네임 님</S.StyledSpan18>

          <Detail>
            <S.StyledSpan16> 멸치나 새우, 디포리 등을 넣고 끓이면 그야말로 어디에나 사용 가능한 만능 육수가 완성되지요. 그러나 준비할 것도 치울 것도 많아 망설여졌리를 한 팩에 담은 다시팩 3종을 준비했답니다. 별도로 재료를 준비할 필요 없이 잠시 끓여주기만 하세요. 깊고 시원한 감칠맛의 육수가 간편하게 완성될 거예요.
            </S.StyledSpan16>
          </Detail>

          <OptionSection>
            <CheckBox $bg={selectFrame} onMouseDown={()=>setSelectFrame(!selectFrame)}>
              <span >프레임 사용하기</span>
              <input type="checkbox" value={selectFrame} checked={selectFrame} />
            </CheckBox>
            <CheckBox $bg={selectFilter} onMouseDown={()=>setSelectFilter(!selectFilter)}>
              <span >필터 사용하기</span>
              <input type="checkbox" value={selectFilter} checked={selectFilter}/>
            </CheckBox>
            <button>저장하기</button>
          </OptionSection>

          <PostAction>
  
            <Action>
              <S.StyledSpan14>좋아요 수</S.StyledSpan14>
              <S.StyledSpan14>{100}개</S.StyledSpan14>
              <S.StyledSpan14>하트</S.StyledSpan14>
              <KakaoShareBtn></KakaoShareBtn>
              <UrlShare></UrlShare>
            </Action>

            <Action>
              <S.StyledSpan14>팔로우</S.StyledSpan14>
              <S.StyledSpan14>100명</S.StyledSpan14>
              <S.StyledSpan14>버튼</S.StyledSpan14>
            </Action>
          </PostAction>

        </DetailPost>
      </DetailContents>

      <CommentSection>
        <CommentInputArea>
          <CommentInputDiv>
            <input placeholder="댓글을 입력해 주세요" />
            <img src={commentEnter} alt="commentEnter"></img>
          </CommentInputDiv>
        </CommentInputArea>
          {
            commentList.map((comment)=>(
              <CommentContainer key={comment.commentId}>
                <CommentsDetail>
                  <CommentCard>
                    <ProfilePic><img src="https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg" alt="" /></ProfilePic>
                    <CommentMain>
                      <div>{comment.username}</div>
                      <div>{comment.content}</div>
                      { comment.replyList.length > 0 &&
                        <button onClick={()=>showReplyHandler(comment.commentId)}>
                          { isReplyShow.includes(comment.commentId) ? "대댓글 닫기" : "대댓글 보기" }
                        </button>
                      }
                    </CommentMain>
                  </CommentCard>
                </CommentsDetail>
                { isReplyShow.includes(comment.commentId) && comment.replyList.map((reply)=>(
                  <ReplayComment key={reply.replyId}>
                    <CommentsDetail>
                      <img src={Replay_comment} alt="" />
                      <CommentCard>
                        <ProfilePic><img src="https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg" alt="" /></ProfilePic>
                        <CommentMain>
                          <div>{reply.username}</div>
                          <div>{reply.content}</div>
                        </CommentMain>
                      </CommentCard>
                    </CommentsDetail>
                  </ReplayComment>
                ))}
              </CommentContainer>
            ))
          }
      </CommentSection>
    </DetailSection>
  </div>
  )
}

export default CustomDetail

const DetailSection = styled.section`
  display:flex;
  max-width: 1170px;
  margin: 0 auto;
  flex-direction:column;
  align-items:center;
  background-color: white;
`
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
  min-height:210px;
`
const VeiwCount = styled.div`
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
const CommentSection = styled.section`
  display:flex;
  width: 100%;
  flex-direction:column;
  align-items:center;
`
const CommentInputArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 158.5px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--lightGray);
  padding: 0 10%;
  margin-bottom: 20px;
`
const CommentInputDiv = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  padding: 19px 36px 19px 36px;
  width: 100%;
  height: 55px;
  gap:5px;
  box-sizing: border-box;
  border-bottom:2px solid black;
  background-color:var(--whiteGray);
  input{
    width: 100%;
    border:none;
    outline:none;
    font-size:14px;
    background-color:var(--whiteGray);
  }
  img{
    cursor: pointer;
  }
`
const CommentContainer = styled.div`
  display:flex; 
  width : 100%;
  flex-direction:column;
  align-items:center;
  box-sizing: border-box;
  padding: 0 10%;
  gap: 10px;
  border-bottom: 2px solid var(--lightGray);
`
const CommentsDetail = styled.div`
  display:flex;
  align-items: start;
  width: 100%;
  flex-direction:row;
  gap:5px;
  padding: 20px 0;
`
const CommentCard = styled.div`
  display:flex;
  width: 100%;
  flex-direction:row;
  gap:5px;
`
const ProfilePic = styled.div`
  display:flex;
  justify-content:center;
  img{
    width:50px;
    height:50px;
    border-radius: 50%;
  }
`
const CommentMain = styled.div`
  display:flex;
  width: 100%;
  gap:10px;
  flex-direction:column;
  border:1px solid rgb(96,161,14);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding:15px;
  background-color:rgb(246, 250, 240);
`
const ReplayComment = styled.section`
  display:flex;
  width: 100%;
  flex-direction:column;
  align-items:center;
  gap:5px;
  width:80%;
`