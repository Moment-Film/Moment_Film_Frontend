import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledButton from '../common/component/StyledButton';


const MyPageUserData = ({lang}) => {
    return (
        <div>
            <HeaderSection>
                <span>{'Mypage'}</span>
                <span>{lang.greeting}</span>
            </HeaderSection>
            <UserInfoSection>

                <UserProfileSection>
                    <Circle></Circle>
                    <Span>{'김헛둘님asdsd'}</Span>
                    <StyledButton title={lang["Modify_Profile"]} width={'200px'} height={'52px'} />
                </UserProfileSection>

                <UserDataSection>
                    <UserItem>{lang.Registered_Designs}</UserItem>
                    <UserItemResult></UserItemResult>
                    <UserItem>{lang.Name}</UserItem>
                    <UserItemResult></UserItemResult>
                    <UserItem>{lang.Received_likes}</UserItem>
                    <UserItemResult></UserItemResult>
                    <UserItem>{lang.Date_of_birth}</UserItem>
                    <UserItemResult></UserItemResult>
                    <UserItem>{lang.introduction}</UserItem>
                    <UserItemResult></UserItemResult>
                    <UserItem>{lang.Points} </UserItem>
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