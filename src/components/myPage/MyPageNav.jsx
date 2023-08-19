import React from "react";
import {styled, css} from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const MyPageNav = () => {
  const [isSelected, SetIsSelected] = useState(0);

  const selectHandler = (num) => {
    SetIsSelected(num);
  };

  return (
    <NavSection>
      <NavWrap>
        <hr />
        <StyledLink
          $type={isSelected === 0}
          onClick={() => selectHandler(0)}
        >
          등록한 디자인
        </StyledLink>
        <hr />
        <StyledLink
          $type={isSelected === 1}
          onClick={() => selectHandler(1)}
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
  font-size: 16px;
  line-height: 19px;
  color: var(--lightGray);
  padding: 17px;
  ${({ $type }) =>
    $type && css`
    border-bottom: 2px solid var(--green5);
    color: var(--black);
  `};
`;
