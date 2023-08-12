import { useState } from "react";
import styled from "styled-components";
import searchIcon from '../../assets/icons/searchIcon.svg'
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { FolllowAPI } from "../../../api/snsUser";

export const Modal = ({onClose, onToggle, data, title}) => {
    const access = useSelector((state)=>state.AccessToken.accessToken);
    const [cookie] = useCookies(['refresh']);
    const deleteFollower = (id) => {
        FolllowAPI(id,access,cookie);
    }
    return (
        <div>
            <Modalsection >
                <Contents>
                    <ContentHeader data={title}>
                        <HeaderTitle onClick={onToggle} $type={title==="followerList"}>팔로우</HeaderTitle>
                        <HeaderTitle onClick={onToggle} $type={title==="followingList"}>팔로잉</HeaderTitle>
                    </ContentHeader>
                    <SearchSection>
                        <input type="text" placeholder="검색" />
                        <img src={searchIcon} alt=""/>
                    </SearchSection>
                    <ListHeader>
                        <span>모든 {title==="followerList" ? "팔로우" : "팔로잉" }</span>
                        <span>{data.length} 명</span>

                    </ListHeader>
                    <ListSection>
                        {data.length > 0 && data.map((follow)=>{
                            return (
                            <FollowListItem key={follow.id}>
                                <div>
                                    <img src={null} alt=""/>
                                    <span>{follow.username}</span>
                                </div>
                                <div>
                                    {title==="followingList" &&
                                    <button onClick={()=>deleteFollower(follow.id)}>
                                        언팔로우
                                    </button>
                                    }
                                </div>
                            </FollowListItem>
                        )})}
                        {data.length===0 &&
                        <div>{title==="followerList" ? "팔로워가" : "팔로잉 중인 사람이" } 없습니다.</div>}</ListSection>
                </Contents>
            </Modalsection>
            <OutLayer onClick={onClose}/>
        </div>
    )
}

const Modalsection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position:fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    border-radius: 5px;
    box-sizing: border-box;

    padding: 23px;
    background-color: white;
    z-index: 51;
    width: 400px;
    height: 400px;

   // overflow:scroll;
`
const Contents = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`
const ContentHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 43px;
    margin-bottom: 19px;
`
const HeaderTitle = styled.div`
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    color: var(--green5);
    cursor: pointer;
    width: 50%;
    border-bottom: ${props => props.$type ? '2px solid var(--green5)' : 'none'} ;
`
const SearchSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    background-color: var(--green1);
    border-radius: 5px 5px 0 0;
    border-bottom: 2px solid var(--green4);
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 23px;

    input {
        font-family: 'Pretendard-Regular';
        background: none;
        border: none;
        outline: none;
        width: 80%;
        font-size: 16px;
        color: var(--green5);
        &::placeholder {
            font-family: 'Pretendard-Regular';
            color: var(--green5);
        }
    }
`
const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 18px;
    line-height: 18px;
    font-size: 15px;
    color: var(--green5);
    padding-bottom: 5px;
    border-bottom: 2px solid var(--green4);
`
const ListSection = styled.div`
    width: 100%;
    height: 185px;
    overflow-y: scroll;
    padding-top: 10px;
`
const FollowListItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 61px;
    border-bottom: 1px solid var(--whiteGray);
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
        
        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: var(--lightGray);
            margin-right: 15px;
        }
        button{
            height: 25px;
            border-radius: 5px;
            background-color: var(--green1);
            border: 1px solid var(--green5);
            color: var(--green5);
            margin-right: 20px;
            padding: 0 10px;
        }
    }

    
    
`
const BtnContainer = styled.div`
    display:flex;
    justify-content:right;
`
const OutLayer = styled.div`

    position:fixed;
    /* border: 1px solid red; */
    height: 100vh;
    width: 100vw;
    top:0;
    background-color: rgba(0,0,0,0.05);
    z-index: 50;
`