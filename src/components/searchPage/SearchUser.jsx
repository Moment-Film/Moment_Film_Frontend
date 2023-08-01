import React from 'react'
import { styled } from 'styled-components'

const SearchUser = () => {


  return (
    <>
      <ContentWrap>
        <Align>
          <What>무엇을 도와드릴까요?</What>
          <Search placeholder='검색어를 입력해 주세요.' />
          <div>추천 검색어</div>
          {}
          <div></div>
          <div>나에게 맞는 크리에이터 보기</div>
          <div></div>
        </Align>
      </ContentWrap>
    </>
  )
}

export default SearchUser;

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 100px 0 100px 0;
`

const Align = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`
const What = styled.div`
  font-size: 30px;
  font-weight: bold;
`

const Search = styled.input`
  width: 700px;
  padding: 10px;
  background-color: #ececec;
  border: none;
  border-bottom: 3px solid grey;
  outline: none;
`