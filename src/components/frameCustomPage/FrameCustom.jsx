import React from "react";
import * as a from "./style";
import * as s from "../frameSelectPage/style";
import GridNav from "../frameSelectPage/GridNav";
import StyledButton from "../common/component/StyledButton";
import { SetFrame } from "../../redux/modules/FrameInfo";
import upload from "../assets/icons/upload.svg";
import clear from '../assets/images/clear.png';
import {
  HueSlider,
  SaturationSlider,
  LightnessSlider,
} from "react-slider-color-picker";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetBackgroundImg } from "../../redux/modules/FrameInfo";
import { StyledSpan14 } from "../common/styles/StyledSpan";
import { useEffect } from "react";
import MyFrameModal from './MyFrameModal'
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { getMyFrame } from "../../api/myFrameFilter";
import { SetImgFile } from "../../redux/modules/FrameInfo";
const FrameCustomMake = () => {
  const thisGrid = useSelector((state) => state.image.images);
  const frame = useSelector((state) => state.FrameInfo);
  console.log("As",frame.image)
  
  const [color, setColor] = useState({
     h: frame.hue, 
     s: frame.saturation, 
     l: frame.lightness 
  });

  const [frameImg, setFrameImg] = useState(frame.image);
  const [openModal, setOpenModal] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(null);
  const frameImgRef = useRef();

  const navigate = useNavigate();


  const dispatch=useDispatch();

  const [innerImg] = useState([
    localStorage.getItem(`image0`),
    localStorage.getItem(`image1`),
    localStorage.getItem(`image2`),
    localStorage.getItem(`image3`),
  ]);

  const changeColorHandler = (newColor) => {
    setColor(newColor);
  };

  const imageChangeHandler = async (e) => {
    const input = e.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const blob = new Blob([file], { type: file.type });
  
      setFrameImg(URL.createObjectURL(blob));
      setUploadedImg(file.name);
      await dispatch(SetImgFile(blob));
    }
  };
  
  

  const imageDeleteHandler = () => {
    setFrameImg(null);
    setUploadedImg(null);
  };

  useEffect(()=>{
/*     dispatch(SetBackgroundImg(null));
    dispatch(SetFrame(null)); */
  },[])


  const moveBtnHandler = async() => {
    const colorData={ hue: color.h, saturation: color.s, lightness: color.l }
    await dispatch(SetFrame(colorData));
    await frameImg && dispatch(SetBackgroundImg(frameImg))
    navigate("/camera/capture/filter");
  };

  const userInfo = useSelector((state)=>state.UserInfo);
  const accessToken = useSelector((state)=>state.AccessToken.accessToken);
  const [cookie] = useCookies(['refresh']);
  const refreshToken = cookie.refresh;
  const {data} = useQuery(`myFrame${userInfo.sub}`, () => getMyFrame({accessToken, refreshToken}));
  const openModalHandler = () => {
    if (accessToken) setOpenModal(true)
    else {
      window.confirm('로그인이 필요합니다.') &&  navigate(`../login`);
    }
  } 
  const closeModal = () => {
    setOpenModal(false);
  }
  const applyFrameBackground = (h, s, l, img) => {
    h && s && l && setColor({h,s,l});
    img ? setFrameImg(img) : setFrameImg(null);
  }

  return (
    <>
      <s.Wrap>
        <s.Slider>
          <s.OptionWrap>
            <GridNav data={"frameSetting"} />
            <a.BoxWrap>
              <a.LeftBox>
                <a.FrameImg
                  width={thisGrid.width}
                  $bottomText={
                    thisGrid.id === "narrow" || thisGrid.id === "wide"
                  }
                  color={color}
                  $frameImg={frameImg}
                  gap={thisGrid.gap}
                >
                  <p
                    style={{
                      color: color.l > 50 ? "var(--black)" : "var(--whiteGray)",
                      fontFamily: "'Abril Fatface', cursive",
                    }}
                  >
                    moment film
                  </p>
                  <a.InnerImgWrap>
                    {innerImg.map((img, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            width: `${thisGrid.innerWidth}`,
                            height: `${thisGrid.innerHeight}`,
                          }}
                        >
                          {
                            img==='null'
                            ?
                            <img
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            src={clear}
                            alt=""
                          />
                          :
                          <img
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          src={img}
                          alt=""
                        />
                          }
                        </div>
                      );
                    })}
                  </a.InnerImgWrap>
                </a.FrameImg>
              </a.LeftBox>
              <a.RightBox>
                {openModal &&
                  <MyFrameModal 
                    onClose={closeModal} 
                    data={data.data.data} 
                    title="프레임" 
                    accessToken={accessToken} 
                    refreshToken={refreshToken}
                    onApply={applyFrameBackground}
                    />}
                <div style={{display :'flex', alignItems: "center"}}>
                  <a.Title>Frame</a.Title>
                  <button onClick={openModalHandler}>MY</button>
                </div>
                <a.Section>
                  <a.SliderBox>
                    <div>색조</div>
                    <HueSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                    />
                    <div>채도</div>
                    <SaturationSlider
                      handleChangeColor={changeColorHandler}
                      color={color}
                      
                    />

                    <div>밝기</div>
                    <LightnessSlider
                      handleChangeColor={changeColorHandler}
                      color={color}

                    />
                  </a.SliderBox>
                </a.Section>
                <div style={{ width:'70%', display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                  <a.UploadContainer>
                  <a.UploadInput
                    id="fileInput"
                    accept="image/*"
                    type="file"
                    onChange={imageChangeHandler}
                    ref={frameImgRef}
                  />
                  <a.UploadLabel>
                    {uploadedImg 
                    ? (
                      <>
                        <a.UploadedImg color="var(--green5)">
                          {uploadedImg}
                        </a.UploadedImg>
                        <a.ImgDeleteBtn onClick={imageDeleteHandler}>
                          x
                        </a.ImgDeleteBtn>
                      </>
                    ) 
                    : (
                      <>
                        <a.UploadedImg color="var(--gray)">
                          이미지 불러오기
                        </a.UploadedImg>
                        <label htmlFor="fileInput">
                          <img
                            src={upload}
                            alt=""
                            style={{
                              width: "16px",
                              opacity: "0.5",
                              cursor: "pointer",
                            }}
                          />
                        </label>
                      </>
                    )}
                  </a.UploadLabel>
                </a.UploadContainer>
                <StyledSpan14 style={{ margin: '12px 0 35px 0', color: 'var(--lightGray)'}}>300px * 447px를 권장합니다.</StyledSpan14>
                </div>
                <StyledButton
                  func={moveBtnHandler}
                  title={"완료하기!"}
                  width={"130px"}
                  height={"40px"}
                  fontSize={"18px"}
                />
              </a.RightBox>
            </a.BoxWrap>
          </s.OptionWrap>
        </s.Slider>
      </s.Wrap>
    </>
  );
};

export default FrameCustomMake;
