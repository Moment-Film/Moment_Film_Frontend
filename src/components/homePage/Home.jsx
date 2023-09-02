import React from "react";
import { useMediaQuery } from "react-responsive";
import DeskFirstPage from "./Desktop/DeskFirstPage";
import DeskSecondPage from "./Desktop/DeskSecondPage";
import DeskThirdPage from "./Desktop/DeskThirdPage";
import DeskFourthPage from "./Desktop/DeskFourthPage";

import Homepage from "./non/Nonhome";
//태블릿 부터 13인치 노트북까지 동일한 UI
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1366 });
  return isDesktop ? children : null;
};
 const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ /* minWidth: 768, */ maxWidth: 1366 });
  return isTablet ? children : null;
};

/*
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
}; */

const Home = () => {
  return (
    <div>
      <Desktop>
        <DeskFirstPage />
        <DeskSecondPage />
        <DeskThirdPage />
        <DeskFourthPage />
      </Desktop>

       <Tablet><Homepage /></Tablet>

{/*
      <Mobile>Mobile</Mobile>


      <Default>Not mobile (desktop or laptop or tablet)</Default> */}
    </div>
  );
};

export default Home;
