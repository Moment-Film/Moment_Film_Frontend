import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const Homepage = () => {

  const navigate = useNavigate();

  const camBtnClickHandler = () => {
    navigate('/camera');
  }
  return (
    <>
      <ContentWrap>
        <LeftContent>
          <div>
            dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1dummy text 1
          </div>
          <div>
            dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2dummy text 2
          </div>
          <CamBtn onClick={camBtnClickHandler}>
            촬영하러 가기
          </CamBtn>
        </LeftContent>
        <RightImg src='' />
      </ContentWrap>
    </>
  )
}

export default Homepage

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 100px 0 100px 0;
  gap: 50px;
`

const LeftContent = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  margin-bottom: 50px;
  padding: 50px;
  gap: 50px;
`

const RightImg = styled.div`
  width: 25%;
  border: 1px solid lightgray;
  margin-bottom: 50px;
`

const CamBtn = styled.div`
  width: 130px;
  height: 40px;
  border: 1px solid grey;
  background-color: yellowgreen;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`