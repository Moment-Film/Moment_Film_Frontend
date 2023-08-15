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
                <StyledLink to={`/post/${item.id}`}>
                    <Img src={item.image}></Img>
                </StyledLink>
                <ItemInfo>
                    <OptionCount>
                        <div>아이디 {item.id}</div>
                        {/* <div>C {'123'}</div> */}
                    </OptionCount>
                    <div>제목 {item.title}</div>
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

    flex-direction:column;

    width:100%;
    height: 285px;
    
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
border-top-right-radius:5px;
  border-top-left-radius:5px;
`
const Img = styled.img`
   width:100%;
   height:228px;
   border-top-right-radius:10px;
  border-top-left-radius:10px;
`

const ItemInfo = styled.div`
display:flex;
flex-direction:column;
padding:0 10px 0 10px;

`

const PageBtnSection = styled.div`
    padding:10px;

    button{
        width:50px;
        height:50px;
    }
`



const OptionCount = styled.div`
display:flex;
gap:5px;
font-size:12px;
font-weight:normal;
margin-left:auto;

`