import React from 'react';
import styled from 'styled-components';
import ContentBox from '../common/component/ContentBox';
import MyPageNav from './MyPageNav';
import MyPageUserData from './MyPageUserData';
import { useSelector,useDispatch } from 'react-redux';

import koData from '../../languageData/ko_MyPage.json';
import enData from '../../languageData/en_MyPage.json';
import { useState } from 'react';

const MyPageCompo = () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 123, 123];

    const language = useSelector((state)=>state.Language.language)
    const dispatch = useDispatch();
    const [lang , setLang] = useState(language)

    return (
        <MyPageSection>
            <MyPageUserData lang={language==='ko'? koData : enData}></MyPageUserData>
            <MyPageNav></MyPageNav>
            <ContentBox data={a}></ContentBox>
        </MyPageSection>
    );
};

export default MyPageCompo;

const MyPageSection = styled.section`
 display:flex;
 flex-direction:column;   
 gap:50px;
 padding:0 0 0 50px;

`
