import React from 'react';
import DeskFrameCustom from '../components/frameCustomPage/Desktop/FrameCustom';
import MobileFrameCustom from '../components/frameCustomPage/mobile/FrameCustom';
import { useMediaQuery } from "react-responsive";

//태블릿 부터 13인치 노트북까지 동일한 UI
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1366 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 500, maxWidth: 1366 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 500 });
  return isMobile ? children : null;
};

const FrameCustomPage = () => {
  return (
    <div>
      <Desktop>
        <DeskFrameCustom />
      </Desktop>

      <Tablet>
        <DeskFrameCustom />
      </Tablet>

      <Mobile>
        <MobileFrameCustom />
      </Mobile>

      {/*  <Default>Not mobile (desktop or laptop or tablet)</Default>  */}
    </div>
  );
};

export default FrameCustomPage;
