import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MyPageNav = () => {
  return (
    <NavSection>
      <NavWrap>
        <hr />
        <StyledLink>등록한 디자인</StyledLink>
        <hr />
        <StyledLink>관심있는 디자인</StyledLink>
        <hr />
      </NavWrap>
    </NavSection>
  );
};

export default MyPageNav;

const NavSection = styled.section`
  display: flex;
  width: 60%;
  justify-content: center;
  gap: 20px;
  border-bottom: 1px solid var(--black);
`;

const NavWrap = styled.section`
  display: flex;
  width: 40%;
  align-items: center;
  hr {
    height: 10px;
    border: 1px solid var(--lightGray);
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  height: 15px;
  border-bottom: 2px solid var(--green5);
  padding: 17px;
`;
