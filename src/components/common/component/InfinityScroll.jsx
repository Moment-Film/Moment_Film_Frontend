import React, { useState, useEffect } from 'react';
import ContentBox from './ContentBox';
import _ from 'lodash'; // lodash 라이브러리 사용
import { getAllPosts, getPostSort } from '../../../api/post';

//통신연결후 스로틀링의 사용 전 후 성능 기록해놓을 것 
const InfiniteScroll = ({sortType}) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    //이건 추후에 리액트 쿼리를 쓰면 쿼리 값으로 변경해버리자 
    const [isLoading, setIsLoading] = useState(false);

    // 가상의 게시글 데이터
    // const generatePosts = (count,page) => {
    //     const newPosts = [];
    //     for (let i = 0; i < count; i++) {
    //         newPosts.push({ id: i, title: `게시글 ${i + 1}` });
    //     }
    //     return newPosts;
    // };

    useEffect(() => {
        setPosts( sortType? getPostSort(sortType) : getAllPosts() );
        console.log(posts);
        setPage(1);
    }, []);

    // 무한 스크롤 이벤트 처리 함수를 스로틀링하여 1초마다 한 번씩 실행되도록 설정
    const handleScroll = _.throttle(() => {
        console.log(1);
        //현재스크롤 높이(스크롤 아래부분높이) : 내 뷰포트 높이(스크롤바 길이) + 스크롤한 높이  
        const scrollPosition = window.innerHeight + window.scrollY;
        //스크롤 전체 높이
        const documentHeight = document.documentElement.scrollHeight;

        // 스크롤이 아래쪽 80% 정도에 도달했을 때 추가 게시글 로드
        if (scrollPosition > documentHeight * 0.8 && !isLoading) {
            setIsLoading(true);

            // 가상의 비동기 API 요청 대신에 setTimeout을 사용하여 1초 후에 추가 데이터를 로드한다고 가정
            setTimeout(() => {
                // setPosts((prevPosts) => [...prevPosts, ...generatePosts(5, page)]);
                setIsLoading(false);
            }, 1000);
        }
    }, 1000); // 1초마다 한 번씩 이벤트 처리

    useEffect(() => {
        // 스크롤 이벤트 리스너 등록
        window.addEventListener('scroll', handleScroll);

        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div>
            {posts.length>1 && <ContentBox data={posts}></ContentBox>}
            {isLoading && <p>Loading...</p>}
        </div>
    );
};

export default InfiniteScroll;