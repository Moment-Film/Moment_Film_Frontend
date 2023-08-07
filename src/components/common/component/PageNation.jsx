import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

    const Card = ({ item }) => {
        return (
            <ContentsItem>
                <StyledLink>
                    <Img src={'data:image/jpeg;base64,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'}></Img>
                </StyledLink>
                <ItemInfo>
                    <div>유저이름</div>
                    <ItemInfo>
                        <div>좋아요</div>
                        <div>댓글</div>
                    </ItemInfo>
                </ItemInfo>
            </ContentsItem>
        )
    }


    return (
        <PageNationSection>
            <ContentsSection>
                {/* 데이터 렌더링 */}
                {
                    currentItems.map((item, index) => {
                        return <Card item={item} key={index}></Card>
                    })
                }
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
    width:60%;
    flex-direction:column;
    align-items:center;
`


const StyledLink = styled(Link)`
text-decoration:none;
    
`
const ContentsSection = styled.section`
    display:flex;
    flex-wrap:wrap;
    gap:2%;
`

const ContentsItem = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;

    width:100%;
    
    @media only screen and (min-width: 500px) {
        width:49%;

  }
    @media only screen and (min-width: 1000px) {
        width:23.5%;

  }

  @media only screen and (min-width: 1600px) {
        width:18.4%;

  }

background-color:var(--whiteGray);
margin-bottom:43px;



`
const Img = styled.img`
   width:100%;
   height:286px;
`

const ItemInfo = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    gap:20px;
    padding:10px;

    height:84px;


`

const PageBtnSection = styled.div`
    padding:10px;

    button{
        width:50px;
        height:50px;
    }
`