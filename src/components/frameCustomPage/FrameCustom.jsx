import React from "react";
import styled from "styled-components";
import * as a from "./style";
import GridNav from "../frameSelectPage/GridNav";
import StyledButton from "../common/component/StyledButton";
import { SetFrame } from "../../redux/modules/FrameInfo";
import upload from "../assets/icons/upload.svg";
import clear from "../assets/images/clear.png";
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

import {
  StyledSpan14,
  StyledSpan12,
  StyledSpan16,
} from "../common/styles/StyledSpan";

import MyFrameModal from "./MyFrameModal";
import { useQuery } from "react-query";
import { SetImgFile } from "../../redux/modules/FrameInfo";
import useToken from "../../hooks/useToken";
import usePostAPI from "../../api/withToken/post";
import { useEffect } from "react";
import useCustomAPI from "../../api/withToken/useCustom";
import hueImg from "../assets/icons/hue.png";
import saturationImg from "../assets/icons/saturation.png";
import lightnessImg from "../assets/icons/lightness.png";
import LOGO from "../assets/images/LOGO.svg";
import * as Img from "../assets/frame/Image";

const FrameCustomMake = () => {
  const { applyFrame, applyFilter } = useCustomAPI();

  const { getMyFrame } = usePostAPI();

  const { getAccess, getRefresh } = useToken();

  const userInfo = useSelector((state) => state.UserInfo);
  const accessToken = getAccess();
  const refreshToken = getRefresh();

  const { data } = useQuery(`myFrame${userInfo.sub}`, () => getMyFrame());

  const thisGrid = useSelector((state) => state.image.images);
  const frame = useSelector((state) => state.FrameInfo);

  const [color, setColor] = useState({
    h: frame.hue,
    s: frame.saturation,
    l: frame.lightness,
  });
  console.log(color.h, color.s, color.l);

  const [frameImg, setFrameImg] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(null);
  const frameImgRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  const moveBtnHandler = async () => {
    const colorData = { hue: color.h, saturation: color.s, lightness: color.l };
    await dispatch(SetFrame(colorData));
    (await frameImg) && dispatch(SetBackgroundImg(frameImg));
    navigate("/camera/capture/filter");
  };

  const openModalHandler = () => {
    if (accessToken) setOpenModal(true);
    else {
      window.confirm("로그인이 필요합니다.") && navigate(`../login`);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const applyFrameBackground = async (h, s, l, img) => {
    h && s && l && setColor({ h, s, l });
    img ? setFrameImg(img) : setFrameImg(null);
  };

  useEffect(() => {
    if (frame) {
      fetch(frame.image)
        .then((response) => response.blob())
        .then((blob) => {
          dispatch(SetImgFile(blob));
          applyFrameBackground(
            frame.hue,
            frame.saturation,
            frame.lightness,
            frame.image
          );
        })
        .catch((error) => {
          console.error("Error fetching or processing image:", error);
        });
    }
  }, []);

  return (
    <BackgroundGray>
      <WhiteContainer>
        <GridNav data="frameSetting" />
        <DrawSection>
          <LeftBox>
            <a.FrameImg
              width={thisGrid.width}
              $bottomText={thisGrid.id === "narrow" || thisGrid.id === "wide"}
              color={color}
              $frameImg={frameImg}
              gap={thisGrid.gap}
            >
              <img
                src={LOGO}
                alt=""
                style={{ filter: color.l < 50 && "invert(100%)" }}
              />
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
                      {img === "null" ? (
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          src={clear}
                          alt=""
                        />
                      ) : (
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          src={img}
                          alt=""
                        />
                      )}
                    </div>
                  );
                })}
              </a.InnerImgWrap>
            </a.FrameImg>
          </LeftBox>

          <RightBox>
            <OptionSection>
              {openModal && (
                <MyFrameModal
                  onClose={closeModal}
                  data={data.data.data}
                  title="프레임"
                  accessToken={accessToken}
                  refreshToken={refreshToken}
                  onApply={applyFrameBackground}
                />
              )}

              <div className="useMy">
                <img
                  className="myfile"
                  src={Img.mycustom}
                  onClick={openModalHandler}
                />
                <span>내 커스텀</span>
              </div>

              <section className="rangeSlider">
                <div className="optionHeader">
                  <span>프레임 커스텀</span>
                </div>
                <p className="optionName">색조</p>
                <div className="progess">
                  <img src={Img.hue} />
                  <HueSlider
                    handleChangeColor={changeColorHandler}
                    color={color}
                  />
                </div>
                <p className="optionName">채도</p>
                <div className="progess">
                  <img src={Img.saturate} />
                  <SaturationSlider
                    handleChangeColor={changeColorHandler}
                    color={color}
                  />
                </div>
                <p className="optionName">밝기</p>
                <div className="progess">
                  <img src={Img.brightness} />
                  <LightnessSlider
                    handleChangeColor={changeColorHandler}
                    color={color}
                  />
                </div>
              </section>

              <div className="inputFile">
                <a.UploadContainer>
                  <a.UploadInput
                    id="fileInput"
                    accept="image/*"
                    type="file"
                    onChange={imageChangeHandler}
                    ref={frameImgRef}
                  />
                  <a.UploadLabel>
                    {uploadedImg ? (
                      <>
                        <a.UploadedImg color="var(--green5)">
                          {uploadedImg}
                        </a.UploadedImg>
                        <a.ImgDeleteBtn onClick={imageDeleteHandler}>
                          x
                        </a.ImgDeleteBtn>
                      </>
                    ) : (

                      <label htmlFor="fileInput">
                        <a.UploadedImg color="var(--gray)">
                          이미지 불러오기
                        </a.UploadedImg>
                        <div>
                          <img
                            src={upload}
                            alt=""
                            style={{
                              width: "16px",
                              opacity: "0.5",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </label>
                    )}
                  </a.UploadLabel>
                </a.UploadContainer>
                <StyledSpan14 className="fileInfo">
                  300px * 447px를 권장합니다.
                </StyledSpan14>
              </div>

              <div className="doneBtn">
                <StyledButton
                  func={moveBtnHandler}
                  title={"완료하기!"}
                  width={"130px"}
                  height={"40px"}
                  fontSize={"18px"}
                />
              </div>
            </OptionSection>
          </RightBox>
        </DrawSection>
      </WhiteContainer>
    </BackgroundGray>
  );
};

export default FrameCustomMake;

const OptionSection = styled.section`
  display: flex;
  width: 70%;
  flex-direction: column;

  padding-top: 30px;

  .doneBtn {
    margin-top: 87px;
    display: flex;
    justify-content: center;
  }
  .optionName {
    text-align: right;
    color: rgb(80, 80, 80);
    font-size: 14px;

    img {
      width: 38px;
    }
  }
  .progess {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .inputFile {
    margin-top: 31px;
  }

  .useMy {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .myfile {
      width: 36px;
      height: 36px;
      object-fit: cover;
    }

    span {
      font-size: 12px;
      color: var(--green5);
      font-weight: 600;
    }
  }

  .rangeSlider {
    width: 100%;
    padding: 41px 0 41px 0;
    border-bottom: 1px solid rgb(217, 217, 217);
  }

  .fileInfo {
    margin: 12px 0 35px 0;
    color: var(--gray3);
  }
`;
const BackgroundGray = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--gray2);
`;
const WhiteContainer = styled.div`
  width: 1170px;

  background-color: white;
  overflow: hidden;
`;
const DrawSection = styled.div`
  display: flex;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;
const LeftBox = styled.div`
  height: 863px;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray3);
`;
const RightBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 40%;

  background-color: white;

  .optionHeader {
    display: flex;
    width: 290px;
    justify-content: space-between;
    border-bottom: 1px solid rgb(217, 217, 217);
    padding-bottom: 9px;
    font-size: 16px;
    font-weight: 500;

    img {
      width: 21px;
    }
  }
`;
