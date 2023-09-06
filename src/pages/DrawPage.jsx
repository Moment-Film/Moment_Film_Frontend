import React from "react";
import { useMediaQuery } from "react-responsive";
import DeskDraw from "../components/drawPage/Desktop/DeskDrawPage";
import MobileDrawPage from "../components/drawPage/Mobile/MobileDrawPage";

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

const DrawPage = () => {
  return (
    <div>
      <Desktop>
        <DeskDraw />
      </Desktop>

      <Tablet>
        <DeskDraw />
      </Tablet>

      <Mobile>
        <MobileDrawPage />
      </Mobile>

      {/*  <Default>Not mobile (desktop or laptop or tablet)</Default>  */}
    </div>
  );
};

export default DrawPage;
