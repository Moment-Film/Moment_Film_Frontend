import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '../common/component/Modal';
import { useState } from 'react';

const MyPageUserData = ({ lang,data }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [fof, setFof] = useState("followerList");

    const clickHandler = (modalData) => {
        setShowModal(true);
        setFof(modalData);
    }
    const hideModalHandler = () => {
        setShowModal(false);
    }
    const fofToggle = () => {
        fof==="followerList" ? setFof("followingList") : setFof("followerList");
    }
    return (
        <div>
            {showModal && <Modal onClose={hideModalHandler} onToggle={fofToggle} data={data[fof]} title={fof}/> }
            <HeaderSection>
                <span>{'Mypage'}</span>
                <span>{data.username}{lang.greeting}</span>
            </HeaderSection>

            <UserInfoSection>

                <UserProfileSection>
                    <Img src={'https://image.imnews.imbc.com/news/2022/enter/article/__icsFiles/afieldfile/2022/03/13/20220313215345_rwTp2delOQ6W637828051274144183.jpg'}></Img>
                </UserProfileSection>

                <UserDataSection>
                    <Span>{data.username}{' 님'}</Span>
                    <button onClick={()=>navigate(`../profile/edit`)}>프로필 수정</button>

                    {/* 다른이용자면 box-1가리고  */}
                    <div className='box-1'>
                        <UserItem>{'포인트확인'}</UserItem>
                        <hr/>
                        <UserItemResult>1000</UserItemResult>
                    </div>
                    <div className='box-2'>
                        <UserItem>{'게시물 수'}</UserItem>
                        <hr />
                        <UserItemResult>{data.postList.length}</UserItemResult>
                    </div>
                    <div className='box-3'>
                        <div onClick={()=>clickHandler("followerList")}>
                            <UserItem>{'팔로워'}</UserItem>
                            <UserItemResult>{data.followerList.length}</UserItemResult>
                        </div>
                        <hr/>
                        <div onClick={()=>clickHandler("followingList")}>
                            <UserItem>{'팔로우'}</UserItem>
                            <UserItemResult>{data.followingList.length}</UserItemResult>
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
    grid-template-rows: 40% 35% 45%;
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