import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import usePostAPI from "../api/withToken/post";

function PostWritePage() {

  const {
    addPost,
    addFrame,
    addFilter
  }=usePostAPI();

  const {
    getAccess,
    getRefresh,
  }=useToken();

  const refreshToken = getRefresh()
  const accessToken = getAccess()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const resultImg = useSelector((state) => state.ResultImage);
  const Frame = useSelector((state) => state.FrameInfo);

  const objectUrl = URL.createObjectURL(resultImg);

  console.log(typeof(resultImg));
  console.log((resultImg));
  const filterInfo =useSelector((state)=>state.Filter)  
  console.log(filterInfo)


  const onSubmitHandler = async() => {

    ////////////////////////////////////////////////////
    //프레임 등록을 위한 폼데이터 생성
    const FrameForm = new FormData();
    const FrameData = {
      frameName: "good",
      hue:Frame.hue,
      saturation:Frame.saturation,
      lightness:Frame.lightness
    };
    console.log(Frame.image)

    // 이슈 블롭객체를 전송하려다 에러가 발생 서버에서는 파일객체를 지정했었음 타입을 잘 blob과 파일 객체에 대한 이해 필요
    if(Frame.image!==null){
      const FrameFile = new File([Frame.image], 'test.jpg', { type: 'image/jpeg' });
      FrameForm.append("imageFile", FrameFile);
    }

    FrameForm.append("data", new Blob([JSON.stringify(FrameData)], { type: "application/json" }))

    console.log(FrameForm)
    ////////////////////////////////////////////////////
    
    const filterId = await addFilter(filterInfo);
    const frameId = await addFrame(FrameForm);
    console.log(filterId)
    console.log(frameId)

    ////////////////////////////////////////////////////
    // 게시글등록을 위한 폼데이터 생성
    const PostForm = new FormData();

    const PostData = {
      title : title,
      contents : content,
      filterId,
      frameId
    };

    // 이슈 블롭객체를 전송하려다 에러가 발생 서버에서는 파일객체를 지정했었음 타입을 잘 blob과 파일 객체에 대한 이해 필요
    const PostFile = new File([resultImg], "test.jpg", { type: "image/jpeg" });
    PostForm.append("imageFile", PostFile);
    console.log(PostFile)
    PostForm.append("data", new Blob([JSON.stringify(PostData)], { type: "application/json" }))
 
    ////////////////////////////////////////////////////

    
    //게시글 등록
    await addPost(PostForm);
    
//////////////////////////////////////////////////////////////////////////////////////////////


/*     setShowModal(true); */
  alert("게시글이 등록되었습니다!")
  navigate("/postlist/recent")
}


  return (
    <ViewBody>
        <WriteForm>
          <ImgSection>
            <img src={objectUrl} alt="ResultImage" />
          </ImgSection>
          <InputSection>
            <section>
              <InputHead>
                <span>제목</span>
                <span className="count"
                  style={{
                    color:
                      title.length === 45
                        ? "var(--warningRed)"
                        : "var(--gray)",
                  }}
                >
                  {title.length}/45
                </span>
              </InputHead>
              <TitleInput
                value={title}
                maxLength={44}
                placeholder="제목을 입력하세요."
                onChange={(e) => setTitle(e.target.value)}
              />
            </section>
            <section>
              <InputHead>
                <span>본문</span>
                <span className="count"
                  style={{
                    color:
                    content.length === 500
                        ? "var(--warningRed)"
                        : "var(--gray)",
                  }}
                >
                  {content.length}/500
                </span>
              </InputHead>
              <ContentInput
                value={content}
                maxLength={500}
                placeholder="내용을 입력해보세요."
                onChange={(e) => setContent(e.target.value)}
              />
            </section>
            <SubmitButton onClick={onSubmitHandler}>저장하기</SubmitButton>
          </InputSection>
        </WriteForm>
      {/* { showModal && <PointModal />} */}
    </ViewBody>
  );
}

export default PostWritePage;

const ViewBody = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: var(--whiteGray);
`;
const WriteForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1170px;
  height: 756px;
  box-sizing: border-box;
  padding: 54px 200px;
  margin-bottom: 70px;
`;
const ImgSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 446px;
  img {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }
`;
const InputSection = styled.div`
  display: flex;
  width: 370px;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  padding: 30px;
  border: 1px solid var(--lightGray);
  section {
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    padding: 7px 17px 10px;
    margin-bottom: 20px;
    textarea {
      width: 100%;
      border: none;
      outline: none;
      resize: none;
      text-align: start;
      &::placeholder {
        color: var(--gray4);
      }
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
  }
`;
const InputHead = styled.div`
  display: flex;
  width: 100%;
  height: 18px;
  justify-content: space-between;
  margin-bottom: 7px;
  span {
    font-size: 14px;
    line-height: 18px;
    color: var(--gray4);
  }
  .count {
    color: var(--gray)
  }
`;
const TitleInput = styled.textarea`
  height: 63px;
  font-size: 20px;
  font-weight: 500;
  color: var(--black);
  line-height: 31.2px;
`;
const ContentInput = styled.textarea`
  height: 280px;
  font-size: 16px;
  color: var(--black);
`;
const SubmitButton = styled.button`
  margin-top: 33px;
  box-sizing: border-box;
  width: 145px;
  height: 40px;
  border: 2px solid var(--green5);
  background-color: var(--green1);
  color: green6;
  font-weight: 900;
  cursor: pointer;
`;
