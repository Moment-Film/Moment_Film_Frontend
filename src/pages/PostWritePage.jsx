import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { addPost } from '../api/post';
import { useCookies } from 'react-cookie';
import PointModal from './../components/CustomFinishPage/PointModal';

function PostWritePage() {
  const [cookie,setCookie] = useCookies(['refresh']);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const resultImg = useSelector((state) => state.ResultImage);
  const objectUrl = URL.createObjectURL(resultImg);
  const accessToken = useSelector((state)=>state.AccessToken.accessToken);
  const writerInfo = useSelector((state)=> state.UserInfo);

  const onSubmitHandler = () => {
    const newPost = new FormData();
    const datas = {
      title,
      contents : content
    }


    newPost.append('imageFile', resultImg);
    newPost.append('data', datas);

    addPost(accessToken, cookie.refresh, newPost);
    setShowModal(true);
  }

  return (
    <ViewBody>
      <WriteBody>
        <WritePageTitle>
          <span>Write Page</span>
        </WritePageTitle>
        <WriteForm>
          <ImgSection>
          <img src={objectUrl} alt='ResultImage' />
          </ImgSection>
          <InputSection>
            <Writer>
              <img src={null} alt='' />
              <span><strong>{writerInfo.username}</strong> 님</span>
            </Writer>
            <section>
              <InputHead>
                <span>제목</span>
                <span style={{color: title.length === 45 ? "var(--warningRed)" : "var(--black)"}}>
                  {title.length}/45자</span>
              </InputHead>
                <TitleInput
                  value={title}
                  maxLength={44}
                  onChange={(e)=>setTitle(e.target.value)}
                />
            </section>
            <section>
              <InputHead>
                <span>본문</span>
              </InputHead>
                <ContentInput
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}
                />
            </section>
            <SubmitButton onClick={onSubmitHandler}>저장하기</SubmitButton>
          </InputSection>
        </WriteForm>
      </WriteBody>
      { showModal && <PointModal />}
    </ViewBody>
  )
}

export default PostWritePage;

const ViewBody = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: var(--whiteGray);
`
const WriteBody = styled.div`
  width: 1170px;
  background-color: white;
`
const WritePageTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 166px;
  box-sizing: border-box;
  span {
    font-size: 28px;
    line-height: 38px;
    font-family: 'Abril Fatface', cursive;
    padding: 83px 0 45px 0;
  }
`
const WriteForm = styled.div`
  display: flex;
  width: 100%;
  height: 626px;
  border-top: 1px solid var(--gray1);
  border-bottom: 1px solid var(--gray1);
  margin-bottom: 70px;
`
const ImgSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 57%;
  height: 100%;
  background-color: #e9e9e9;
  img{
    box-shadow: 0 0 40px rgba(0,0,0,0.05);
  }
`
const InputSection = styled.div`
  display: flex;
  width: 43%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  margin: 0 48px;
  section {
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    padding: 10px 20px 5px;
    margin-bottom: 20px;
    textarea {
      width: 100%;
      border: none;
      outline: none;
      resize: none;
      text-align: start;
      font-family: 'Pretendard-Regular';
    }
  }
`
const Writer = styled.div`
  margin: 30px 0 22px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  height: 35px;
  img {
    width: 35px;
    height: 35px;
    background-color: var(--lightGray);
    border-radius: 50%;
    margin-right: 10px;
  }
  span{
    font-size: 14px;
    strong{
      font-size: 18px;
    }
  }
`
const InputHead = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  justify-content: space-between;
  span{
    font-size: 14px;
    line-height: 32px;
    color: var(--gray4);
  }
`
const TitleInput = styled.textarea`
  height: 63px;
  font-size: 20px;
  font-weight: 900;
`
const ContentInput = styled.textarea`
  height: 200px;
  font-size: 16px;
  color: var(--gray4);
`
const SubmitButton = styled.button`
  margin-top: 33px;
  box-sizing: border-box;
  width: 145px;
  height: 40px;
  border: 2px solid var(--green5);
  background-color: var(--green1);
  color: green6;
  font-family: 'Pretendard-Regular';
  font-weight: 900;
`