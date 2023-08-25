import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const ContentBox = ({ data }) => {
    const navigate = useNavigate();
    const Card = ({ item }) => {
        return (
            <ContentsItem onClick={() => navigate(`/post/${item.id}`)}>
                <Img src={item.image}></Img>
                <ItemInfo>
                    <InfoHeader>
                        <Circle></Circle>
                        <span className='UserName'>{item.username}</span>
                        <OptionCount>
                            <IconImg></IconImg>
                            <span className='option'>{item.likeCount}</span>
                            <IconImg></IconImg>
                            <span className='option'>{item.viewCount}</span>
                        </OptionCount>
                    </InfoHeader>
                    <span className='Title'>{item.title}</span>
                </ItemInfo>
            </ContentsItem>
        )
    }

    return (

        <ContentsSection>
            {
                data.map((item, index) => {
                    return <Card item={item} key={index} onClick={() => navigate(`${item.id}`)}></Card>
                })
            }
        </ContentsSection>

    );
};

export default ContentBox;


const ContentsSection = styled.section`
  width: 1140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;


@media (max-width: 1299px) {
    width:850px;
}

@media (max-width: 936px) {
    width:560px;
}

@media (max-width: 650px) {
    width:270px;
    justify-content: center;

}
`

const ContentsItem = styled.div`
    display:flex;
    flex-direction:column;
    width:270px;
    height: 502px;

    background-color:var(--white);
    margin-bottom:43px;
    border-top-right-radius:5px;
    border-top-left-radius:5px;
`
const Img = styled.img`
    width:100%;
    height:400px;
    border-top-right-radius:10px;
    border-top-left-radius:10px;
`

const ItemInfo = styled.div`
    display:flex;
    flex-direction:column;
    margin: 20px 0 0 0px;

    .UserName{
        font-size:14px;
    }
    .option{
        font-size:12px;
    }

    .Title{
        margin-top:10px;
        font-size:16px;
    }

`

const OptionCount = styled.div`
    display:flex;
    gap:5px;
    font-size:12px;
    font-weight:normal;
    margin-left:auto;

`

const Circle = styled.div`
width: 30px;
height: 30px;
border: 10px solid rgb(217, 217, 217);
background-color: rgb(217, 217, 217);
border-radius: 50%;

`
const InfoHeader = styled.div`
display:flex;
align-items:center;
gap:10px;

`

const IconImg = styled.div`
width: 15px;
height: 15px;
border: 1px solid rgb(217, 217, 217);
background-color: rgb(217, 217, 217);
border-radius: 25%;
`