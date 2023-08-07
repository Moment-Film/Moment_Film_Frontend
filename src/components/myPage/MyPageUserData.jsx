import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyPageUserData = ({ lang }) => {
    return (
        <div>
            <HeaderSection>
                <span>{'Mypage'}</span>
                <span>{lang.greeting}</span>
            </HeaderSection>

            <UserInfoSection>

                <UserProfileSection>
                    <Img src={'https://image.imnews.imbc.com/news/2022/enter/article/__icsFiles/afieldfile/2022/03/13/20220313215345_rwTp2delOQ6W637828051274144183.jpg'}></Img>
                </UserProfileSection>

                <UserDataSection>
                    <Span>{'김헛둘'}{' 님'}</Span>

                    {/* 다른이용자면 box-1가리고  */}
                    <div className='box-1'>
                        <UserItem>{'포인트확인'}</UserItem>
                        <hr/>
                        <UserItemResult>1000</UserItemResult>
                    </div>
                    <div className='box-2'>
                        <UserItem>{'팔로우'}</UserItem>
                        <hr />
                        <UserItemResult>200</UserItemResult>
                    </div>
                    <div className='box-3'>
                        <div >
                            <UserItem>{'팔로워'}</UserItem>
                            <UserItemResult>3000000</UserItemResult>
                        </div>
                        <hr/>
                        <div>
                            <UserItem>{'게시물수'}</UserItem>
                            <UserItemResult>4</UserItemResult>
                        </div>
                    </div>



                </UserDataSection>
            </UserInfoSection>



        </div>
    );
};

export default MyPageUserData;


const HeaderSection = styled.section`
 display:flex;
 padding-left:20%;
 flex-direction:column;
 justify-content:center;

 height:80px;
`

const UserInfoSection = styled.section`
 display:flex;
 width:100%;
 flex-direction:row;
 gap:5%;

 padding:74px 0 74px 20%;

 background-color:var(--whiteGray);

 @media only screen and (max-width: 800px) {
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:50px;

    padding:74px 0 74px 0;
  }

`

const UserProfileSection = styled.section`
 display:flex;
 flex-direction:column;
 align-items:center;
 gap:10px;
 width:170px;
 height:140px;

 padding-bottom : 20px;

 background-color:var(--white);

`

const Span = styled.span`
    
`

const UserDataSection = styled.section`
    display:grid;
    width: 40%;
    grid-template-columns: 48% 48%;
    grid-template-rows: 10% 35% 45%;
    grid-row-gap: 5%;
    grid-column-gap:2%;
    .box-1{ 
        grid-column: 1;
        display:flex;
        background-color:var(--white);
        min-width:150px;
        align-items:center;
        hr{
            
            height:30px;
        }
    }
    .box-2{ 
        //다른사용자면 1/3으로
        grid-column: 2;
        display:flex;
        background-color:var(--white);
        min-width:150px;
        align-items:center;
        hr{
            
            height:30px;
        }
    
    }
    .box-3{ 
        grid-column: 1/3;
        display: flex;
        align-items: center;
        background-color:var(--white);
        min-width:150px;
        padding:5px 20% 5px 20%;
        
        div{
            display:flex;
            width:100%;
            flex-direction:column;
            gap:10px;
            background-color:var(--white);
        }
        
        hr{
            height:10px;
        }
    }

/*     @media only screen and (max-width: 500px) {
        grid-template-columns: 40% 40%;
        grid-template-rows: 8% 8% 8% 8% 8% 8%;

  } */
`

const UserItem = styled.div`
    display:flex;
    width:70%;
    max-width: 100%;
    justify-content:center;
    align-items:center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

`
const UserItemResult = styled.div`
    display:flex;
    width:50%;
    justify-content:center;
    align-items:center;

    background-color:var(--white);
`

const NavSection = styled.section`
    display:flex;
    gap:20px;
    border-bottom: 1px solid black;

`
const StyledLink = styled(Link)`
text-decoration:none;

    
`

const Img = styled.img`
    width:100%;

`