import React from 'react';
import styled from 'styled-components';
import MyPageNav from './MyPageNav';
import MyPageUserData from './MyPageUserData';
import { useSelector,useDispatch } from 'react-redux';

import koData from '../../languageData/ko_MyPage.json';
import enData from '../../languageData/en_MyPage.json';
import { useState } from 'react';

import PaginationComponent from '../common/component/PageNation';

const MyPageCompo = () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 123, 123,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 123, 123,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 123, 123];

    const language = useSelector((state)=>state.Language.language)
   
    const[category,setCategory]=useState('')
    return (
        <MyPageSection>
            <MyPageUserData lang={language==='ko'? koData : enData}></MyPageUserData>
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
