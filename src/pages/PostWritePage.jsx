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
  const writerInfo = useSelector((state)=> state.UserInfo);
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
      <WriteBody>
        <WritePageTitle>
          <span>Write Page</span>
        </WritePageTitle>
        <WriteForm>
          <ImgSection>
            <img src={objectUrl} alt="ResultImage" />
          </ImgSection>
          <InputSection>
            <Writer>
              <img src={null} alt="" />
              <span>
                <strong>{writerInfo.username}</strong> 님
              </span>
            </Writer>
            <section>
              <InputHead>
                <span>제목</span>
                <span
                  style={{
                    color:
                      title.length === 45
                        ? "var(--warningRed)"
                        : "var(--black)",
                  }}
                >
                  {title.length}/45자
                </span>
              </InputHead>
              <TitleInput
                value={title}
                maxLength={44}
                onChange={(e) => setTitle(e.target.value)}
              />
            </section>
            <section>
              <InputHead>
                <span>본문</span>
              </InputHead>
              <ContentInput
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </section>
            <SubmitButton onClick={onSubmitHandler}>저장하기</SubmitButton>
          </InputSection>
        </WriteForm>
      </WriteBody>
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
const WriteBody = styled.div`
  width: 1170px;
  background-color: white;
`;
const WritePageTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 166px;
  box-sizing: border-box;
  span {
    font-size: 28px;
    line-height: 38px;
    font-family: "Abril Fatface", cursive;
    padding: 83px 0 45px 0;
  }
`;
const WriteForm = styled.div`
  display: flex;
  width: 100%;
  height: 626px;
  border-top: 1px solid var(--gray1);
  border-bottom: 1px solid var(--gray1);
  margin-bottom: 70px;
`;
const ImgSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 57%;
  height: 100%;
  background-color: #e9e9e9;
  img {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.05);
  }
`;
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
      font-family: "Pretendard-Regular";
    }
  }
`;
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
  span {
    font-size: 14px;
    strong {
      font-size: 18px;
    }
  }
`;
const InputHead = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  justify-content: space-between;
  span {
    font-size: 14px;
    line-height: 32px;
    color: var(--gray4);
  }
`;
const TitleInput = styled.textarea`
  height: 63px;
  font-size: 20px;
  font-weight: 900;
`;
const ContentInput = styled.textarea`
  height: 200px;
  font-size: 16px;
  color: var(--gray4);
`;
const SubmitButton = styled.button`
  margin-top: 33px;
  box-sizing: border-box;
  width: 145px;
  height: 40px;
  border: 2px solid var(--green5);
  background-color: var(--green1);
  color: green6;
  font-family: "Pretendard-Regular";
  font-weight: 900;
  cursor: pointer;
`;
