import { React, useState } from "react"
import styled from "styled-components"
import * as S from "../components/common/styles/StyledSpan"
import commentEnter from '../components/assets/icons/commentEnter.png'
import Replay_comment from '../components/assets/icons/replay_comment.png'

function CustomDetail() {
  const[selectFrame,setSelectFrame]=useState(false);
  const[selectFilter,setSelectFilter]=useState(false);
  console.log(selectFrame)
  console.log(selectFilter)

  return (
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
            <S.StyledSpan16> 멸치나 새우, 디포리 등을 넣고 끓이면 그야말로 어디에나 사용 가능한 만능 육수가 완성되지요. 그러나 준비할 것도 치울 것도 많아 망설여졌        리를 한 팩에 담은 다시팩 3종을 준비했답니다. 별도로 재료를 준비할 필요 없이 잠시 끓여주기만 하세요. 깊고 시원한 감칠맛의 육수가 간편하게 완성될 거예요.
            </S.StyledSpan16>
          </Detail>

          <OptionSection>
            <CheckBox bg={selectFrame} onMouseDown={()=>setSelectFrame(!selectFrame)}>
              <span >프레임 사용하기</span>
              <input type="checkbox" value={selectFrame} checked={selectFrame} />
            </CheckBox>
            <CheckBox bg={selectFilter} onMouseDown={()=>setSelectFilter(!selectFilter)}>
              <span >필터 사용하기</span>
              <input type="checkbox" value={selectFilter} checked={selectFilter}  />
            </CheckBox>
            <button>저장하기</button>
          </OptionSection>

          <PostAction>
            <Action>
              <S.StyledSpan14>좋아요 수</S.StyledSpan14>
              <S.StyledSpan14>{100}개</S.StyledSpan14>
              <S.StyledSpan14>하트</S.StyledSpan14>
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
        <CommentInputDiv>
          <input placeholder="댓글을 입력해 주세요" />
          <img src={commentEnter}></img>
        </CommentInputDiv>

        <CommentsDetail>
          <CommentCard>
            <ProfilePic><img src="https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg" alt="" /></ProfilePic>
            <CommentMain>
              <div>아이디</div>
              <div>
                멸치나 새우, 디포리 등을 넣고 끓이면 그야말로 어디에나 사용 가능한 만능 육수가 완성되지요. 그러나 준비할 것도 치울 것도 많아 망설여졌리를 어쩌고팩에 담은 다시팩 3종을 준비했답니다. 별도로 재료를 준비할 필요 없이 잠시 끓여주기만 하세요. 깊고 시원한 감칠맛의 육수가 간편하게 완성될 거예요.
              </div>
              <button>대댓글 보기</button>
            </CommentMain>
          </CommentCard>
        </CommentsDetail>

        {
          <ReplayComment>
            <CommentsDetail>
            <ProfilePic><img src={Replay_comment} alt="" /></ProfilePic>
              <CommentCard>
                <ProfilePic><img src="https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg" alt="" /></ProfilePic>
                <CommentMain>
                  <div>아이디</div>
                  <div>
                    멸치나 새우, 디포리 등을 넣고 끓이면 그야말로 어디에나 사용 가능한 만능 육수가 완성되지요. 그러나 준비할 것도 치울 것도 많아 망설여졌리를 어쩌고팩에 담은 다시팩 3종을 준비했답니다. 별도로 재료를 준비할 필요 없이 잠시 끓여주기만 하세요. 깊고 시원한 감칠맛의 육수가 간편하게 완성될 거예요.
                  </div>
                </CommentMain>
              </CommentCard>
            </CommentsDetail>
          </ReplayComment>
        }

      </CommentSection>
    </DetailSection>
  )
}

export default CustomDetail

const DetailSection = styled.section`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-top:83px;
  gap:44.5px;
`

const DetailHeader = styled.div`
  display:flex;
  flex-direction:column;
`

const DetailContents = styled.div`
  display:flex;
  max-height:680px;
`

const FrameSection = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:55%;
 
  background-color:var(--lightGray);
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

  background-color: ${(props) => props.bg ? 'var(--lightGreen)' : 'var(--lightGray)'};
  color:${(props) => props.bg ? 'var(--black)' : 'var(--whiteGray);'}; 
  label {
    width: 100%;
  }
`;

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
  flex-direction:column;
  align-items:center;
  gap:5px;



`

const CommentInputDiv = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  padding: 19px 36px 19px 36px;
  width:60vw;
  gap:5px;
  border-bottom:2px solid black;

  background-color:var(--whiteGray);
  input{
    width:100%;
    border:none;
    outline:none;
    font-size:14px;
    background-color:var(--whiteGray);
  }
  img{
    cursor: pointer;
  }

`

const CommentsDetail = styled.div`
  display:flex;
  flex-direction:row;
  gap:5px;
  padding:0 17% 0 10%;

`
const CommentCard = styled.div`
  display:flex;
  flex-direction:row;
  gap:5px;
  padding:74px 0 74px 0;
  

`

const ProfilePic = styled.div`
  display:flex;
  justify-content:center;
  width:20%;

  img{
    width:50px;
    height:50px;
    border-radius: 50%;
  }
`
const CommentMain = styled.div`
  display:flex;
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
  flex-direction:column;
  align-items:center;
  gap:5px;

  width:80%;
`