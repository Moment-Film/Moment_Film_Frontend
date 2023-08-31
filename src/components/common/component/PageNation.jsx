
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ContentBox from './ContentBox';

const PaginationComponent = ({ data = [] ,ItemNums,category }) => {

    const [currentPage, setCurrentPage] = useState(1);
    
    if (!Array.isArray(data) || data.length === 0) {
        return null;  // 또는 유효하지 않은 데이터에 대한 처리나 기본 메시지를 반환할 수 있습니다.
    }

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 1170px;
  flex-direction: column;
`;

const ContentsSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  //flex-wrap:wrap;
  gap: 2%;
`;

const PageBtnSection = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .leftWrap {
    img {
      cursor: pointer;
    }
  }

  .rightWrap {
    img {
      cursor: pointer;
    }
  }
`;

const PageBtn = styled.div`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: ${(props) => (props.isSelected ? "var(--green5)" : "none")};
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  color: ${(props) => (props.isSelected ? "var(--white)" : "var(--gray3)")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
