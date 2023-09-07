import React from "react";
import { useMediaQuery } from "react-responsive";
import DeskHome from "../components/homePage/Desktop/DeskHome";
import Homepage from "../components/homePage/mobile/Nonhome";
import { useDispatch } from "react-redux";
import { SetBackgroundImg,SetImgFile } from "../redux/modules/FrameInfo";
//태블릿 부터 13인치 노트북까지 동일한 UI
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1366 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1366 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const Home = () => {
  const dispatch=useDispatch();

  dispatch(SetBackgroundImg(null));
  dispatch(SetImgFile(null));

  return (
    <div>
      <Desktop>
        <DeskHome />
      </Desktop>

      <Tablet>
        <Homepage />
      </Tablet>

      <Mobile>
        <Homepage />
      </Mobile>

      {/*
      <Default>Not mobile (desktop or laptop or tablet)</Default> */}
    </div>
  );
};

export default Home;
