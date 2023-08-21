import React from 'react'
import styled from 'styled-components';
import MyPageNav from '../components/myPage/MyPageNav';
import MyPageUserData from '../components/myPage/MyPageUserData';
import { useSelector, useDispatch } from 'react-redux';
import koData from '../languageData/ko_MyPage.json';
import enData from '../languageData/en_MyPage.json';
import PaginationComponent from '../components/common/component/PageNation'
import { useQuery } from 'react-query';
import { getProfile } from '../api/nonToken/user';
import { useParams } from 'react-router-dom';

function MyPage() {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 123, 123, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 123, 123, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 123, 123];

  const userId = useParams().id;

  // 유저 정보 불러오는 쿼리
  const { data, isLoading, isError } = useQuery(`User${userId}`, () => getProfile(userId))
  //언어 변경 
  const language = useSelector((state) => state.Language.language)

  //쿼리 상태 처리 
  if (isLoading) {
    return <div>Loading...</div>; // 또는 로딩 컴포넌트를 사용
  }

  if (isError) {
    return <div>Error loading data</div>; // 에러 처리
  }

  return (
    <MyPageSection>
      <MyPageUserData lang={language === 'ko' ? koData : enData} data={data}></MyPageUserData>
      <Contents>
        <MyPageNav />
        <PaginationComponent data={data.postList} ItemNums={15} />
      </Contents>
    </MyPageSection>
  );
}

export default MyPage

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