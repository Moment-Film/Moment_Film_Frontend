import React from 'react';
import styled from 'styled-components';
import MyPageNav from './MyPageNav';
import MyPageUserData from './MyPageUserData';
import { useSelector,useDispatch } from 'react-redux';
import koData from '../../languageData/ko_MyPage.json';
import enData from '../../languageData/en_MyPage.json';
import { useState } from 'react';
import PaginationComponent from '../common/component/PageNation';
import { useQuery } from 'react-query';
import { getProfile } from '../../api/myPage';


const MyPageCompo = () => {

    const user = useSelector((state) => state.UserInfo);
    const userId= user.sub;
    console.log(userId);
    const {data,isLoading,isError} = useQuery(`User${userId}`,()=>getProfile(userId))
    console.log(data);
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 123, 123,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 123, 123,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 123, 123];

    const language = useSelector((state)=>state.Language.language)
    const[category,setCategory]=useState('')

    if (isLoading) {
        return <div>Loading...</div>; // 또는 로딩 컴포넌트를 사용
    }

    if (isError) {
        return <div>Error loading data</div>; // 에러 처리
    }

    return (
        <MyPageSection>
            <MyPageUserData lang={language==='ko'? koData : enData} data={data}></MyPageUserData>
            <Contents>
            <MyPageNav></MyPageNav>
            <PaginationComponent data={a} ItemNums={12}/>
            </Contents>
        </MyPageSection>
    );
};

export default MyPageCompo;

const MyPageSection = styled.section`
 display:flex;
 flex-direction:column;
 justify-content:center;
 
 gap:50px;

`
const Contents = styled.section`
 display:flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;   
 gap:50px;

`