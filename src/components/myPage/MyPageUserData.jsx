import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledButton from '../common/StyledButton';

const MyPageUserData = () => {
    return (
        <div>
            <HeaderSection>
                <span>{'Mypage'}</span>
                <span>{'김헛둘님 반갑습니다!'}</span>
            </HeaderSection>
            <UserInfoSection>

                <UserProfileSection>
                    <Circle></Circle>
                    <Span>{'김헛둘님asdsd'}</Span>
                    <StyledButton title={'프로필 수정'} width={'200px'} height={'52px'} />
                </UserProfileSection>

                <UserDataSection>
                    <UserItem>등록한 디자인</UserItem>
                    <UserItemResult></UserItemResult>
                    <UserItem>이름</UserItem>
                    <UserItemResult></UserItemResult>
                    <UserItem>받은 좋아요</UserItem>
                    <UserItemResult></UserItemResult>
                    <UserItem>생년월일</UserItem>
                    <UserItemResult></UserItemResult>
                    <UserItem>소개</UserItem>
                    <UserItemResult></UserItemResult>
                    <UserItem>포인트확인 </UserItem>
                    <UserItemResult></UserItemResult>
                </UserDataSection>
            </UserInfoSection>
            
        </div>
    );
};

export default MyPageUserData;


const HeaderSection = styled.section`
 display:flex;
 flex-direction:column;
 justify-content:center;

 height:80px;
`

const UserInfoSection = styled.section`
 display:flex;
 flex-direction:row;
 gap:20px;

 padding:20px;

 @media only screen and (max-width: 800px) {
    flex-direction:column;
  }


`

const UserProfileSection = styled.section`
 display:flex;
 flex-direction:column;
 gap:10px;
 width:30%;

 @media only screen and (max-width: 800px) {
    width:100%;
    align-items:center;
  }

`


const Circle = styled.div`
  width : 200px;
  height : 200px;
  border-radius: 50%;
  background-color:rgba(231, 231, 231, 1);
`

const Span = styled.span`
display:flex;
width:200px;
justify-content:center;
    
`

const UserDataSection = styled.section`
    display:grid;
    width:100%;
    grid-template-columns: 23% 25% 20% 25%;
    grid-template-rows: 15% 15% 15% 15%;
    grid-row-gap: 40px;

    @media only screen and (max-width: 500px) {
        grid-template-columns: 40% 40%;
        grid-template-rows: 8% 8% 8% 8% 8% 8%;

  }
`

const UserItem =styled.div`
    display:flex;
    max-width: 100%;
    justify-content:center;
    align-items:center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

`
const UserItemResult =styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    border-bottom:1px solid black;

    background-color:var(--whiteGray);
`

const NavSection = styled.section`
    display:flex;
    gap:20px;
    border-bottom: 1px solid black;

`
const StyledLink=styled(Link)`
text-decoration:none;

    
`