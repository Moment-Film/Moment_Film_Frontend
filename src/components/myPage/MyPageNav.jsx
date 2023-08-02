import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyPageNav = () => {
    return (
        <NavSection>
            <StyledLink>등록된 디자인</StyledLink>
            <StyledLink>관심있는 디자인</StyledLink>
            <StyledLink>내 게시글 확인</StyledLink>
        </NavSection>
    );
};

export default MyPageNav;

const NavSection = styled.section`
    display:flex;
    gap:20px;
    border-bottom: 1px solid black;

`
const StyledLink=styled(Link)`
text-decoration:none;

    
`