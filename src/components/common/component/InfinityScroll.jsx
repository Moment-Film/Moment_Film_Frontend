import React, { useState, useEffect } from 'react';
import ContentBox from './ContentBox';
import _ from 'lodash'; // lodash 라이브러리 사용
import { getAllPosts } from '../../../api/nonToken/post';
import { useQuery, useQueryClient } from 'react-query';


//통신연결후 스로틀링의 사용 전 후 성능 기록해놓을 것 
const InfiniteScroll = ({ sort }) => {

    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [isLast, setIsLast] = useState(false);

    //검색결과를 가져올 리엑트 쿼리 
    const { isLoading, isError, data, isSuccess } = useQuery(
        [`post${sort}${page}`],
        () => getAllPosts({ sort, page })
    );
    console.log(data);
    console.log(isLast)


    // 무한 스크롤 이벤트 처리 함수를 스로틀링하여 0.5초마다 한 번씩 실행되도록 설정
    const handleScroll = _.throttle(async () => {
        //현재스크롤 높이(스크롤 아래부분높이) : 내 뷰포트 높이(스크롤바 길이) + 스크롤한 높이  
        const scrollPosition = window.innerHeight + window.scrollY;
        //스크롤 전체 높이
        const documentHeight = document.documentElement.scrollHeight;

        // 스크롤이 아래쪽 80% 정도에 도달했을 때 추가 게시글 로드
        if (scrollPosition > documentHeight * 0.8) {
            setTimeout(async () => {
                if (!isLast) await setPage(page + 1);
                await setIsLast(data?.isLastPage);
            }, 500);
        }
    }, 500); // 0.5초마다 한 번씩 이벤트 처리

    useEffect(() => {

        if (!isLast) {
            // 스크롤 이벤트 리스너 등록
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(()=>{
        setIsLast(false)
        setPage(1);
    },[sort])

    const getDataList=async()=>{
        if (page === 1) {
            await setDataList([])
        }

        if (data && data.responses) {
            await setDataList((prevList) => [...prevList, ...data.responses]);
        }
    }

    useEffect(() => {

        queryClient.invalidateQueries([`post${sort}${page}`]);

        if (isSuccess) {
            getDataList()
        }

    }, [sort, page, queryClient, data]);


    return (
        <div>
        {/* {dataList.length} */}
            {dataList?.length > 0 && <ContentBox data={dataList}></ContentBox>}
        </div>
    );
};

export default InfiniteScroll;