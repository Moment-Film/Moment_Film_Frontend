import React from "react";
import { styled, css } from "styled-components";
import { Link } from "react-router-dom";

const MyPageNav = ({ isSelected, SetIsSelected }) => {

  const selectHandler = (num) => {
    SetIsSelected(num);
  };

  return (
    <NavSection>
      <NavWrap>
        <hr />
        <StyledLink
          $type={isSelected === true}
          onClick={() => selectHandler(true)}
        >
          등록한 디자인
        </StyledLink>
        <hr />
        <StyledLink
          $type={isSelected === false}
          onClick={() => selectHandler(false)}
        >
          관심있는 디자인
        </StyledLink>
        <hr />
      </NavWrap>
    </NavSection>
  );
};

export default MyPageNav;

const NavSection = styled.section`
  display: flex;
  width:90%;
    max-width:1170px;
  justify-content: center;
  gap: 20px;
  border-bottom: 1px solid var(--gray2);
`;

const NavWrap = styled.section`
  display: flex;
  width: 40%;
  align-items: center;
  hr {
    height: 10px;
    border: 1px solid var(--gray2);
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  line-height: 150%;
  color: var(--lightGray);
  padding: 17px;
  ${({ $type }) =>
    $type && css`
    border-bottom: 2px solid var(--green5);
    color: var(--black);
  `};
`;
