import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ContentBox from './ContentBox';

const PaginationComponent = ({ data ,ItemNums }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // 현재 페이지에 보여줄 데이터 계산
    const LastIndex = currentPage * ItemNums;
    const FirstIndex = LastIndex - ItemNums;
    const currentItems = data.slice(FirstIndex, LastIndex);

    // 페이지 변경 이벤트 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <PageNationSection>
            <ContentsSection>
                <ContentBox data={currentItems}></ContentBox>
            </ContentsSection>


            {/* 페이지네이션 버튼 */}
            {/*  Array.from({length: 페이지 수}, (value(안씀), index) => {});  */}
            <PageBtnSection> 
                {Array.from({ length: Math.ceil(data.length / ItemNums) }, (_, index) => {
                    return (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                    );
                })}
            </PageBtnSection>
        </PageNationSection>
    );
};

export default PaginationComponent;


const PageNationSection = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:90%;
    max-width:1170px;
    flex-direction:column;

`

const ContentsSection = styled.section`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-wrap:wrap;
    gap:2%;
`



const PageBtnSection = styled.div`
    padding:10px;

    button{
        width:50px;
        height:50px;
    }
`


