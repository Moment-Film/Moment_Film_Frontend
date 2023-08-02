import React from 'react'
import { styled } from 'styled-components';

const Mypage = () => {

  return (
    <>
      <div>
        <div>
          MY PAGE
        </div>
        {<div>{`김헛둘님, 반갑습니다!`}</div>}
      </div>
      <ContentWrap>
        <EditableWrap>
          <ProfileImg>
          <img src='' alt=''></img>
          </ProfileImg>
          {<div>{`김헛둘님`}</div>}          
          <EditBtn>
            프로필 수정
          </EditBtn>
        </EditableWrap>
        <ProfileWrap>
          <div>

          </div>
        </ProfileWrap>
      </ContentWrap>
    </>
  )
}

export default Mypage;

const ContentWrap = styled.div`
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 30px 100px 30px;
  padding: 30px 0 30px 0;
  background-color: #f0f0f0;
  border-radius: 20px;
`

const EditableWrap = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-right: 100px; */
`

const ProfileImg = styled.div`
  width: 150px;
  height: 150px;
  background-color: #bdbdbd;
  border: 2px solid black;
  border-radius: 50%;
`

const EditBtn = styled.div`
  width: 150px;
  margin-top: 30px;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  text-align: center;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: grey;
  }
`

const ProfileWrap = styled.div`
  width: 50%;
  height: 200px;
  border: 1px solid lightgray;
`