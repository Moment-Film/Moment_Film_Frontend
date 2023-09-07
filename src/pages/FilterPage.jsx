import React from 'react';
import DeskFilterPage from '../components/filterCustom/Desktop/filterCustom'
import MobileFilterPage from '../components/filterCustom/Mobile/filterCustom'

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

const FilterPage = () => {
  return (
    <div>
      <Desktop>
        <DeskFilterPage />
      </Desktop>

      <Tablet>
        <DeskFilterPage />
      </Tablet>

      <Mobile>
        <MobileFilterPage />
      </Mobile>

      {/*  <Default>Not mobile (desktop or laptop or tablet)</Default>  */}
    </div>
  );
};

export default FilterPage;

