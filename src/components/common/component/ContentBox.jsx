import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import resizeNull from '../../assets/images/resizeNull.png'
import listHeart from '../../assets/icons/listHeart.svg'
import listView from '../../assets/icons/listView.svg'

const ContentBox = ({ data, type }) => {
    const navigate = useNavigate();
    const Card = ({ item }) => {
        return (
            <ContentsItem onClick={() => navigate(`/post/${item.id}`)}>
                <ImgSection>
                    <img src={item.image} alt=''/>
                </ImgSection>
                <ItemInfo>
                    <InfoHeader>
                        <Circle src={item.userImage?item.userImage:resizeNull}></Circle>
                        <span className='UserName'>{item.username}</span>
                        { type==="postList" &&
                        <OptionCount>
                            <img src={listHeart} alt='' />
                            <span className='option'>{item.likeCount}</span>
                            <img src={listView} alt='' />
                            <span className='option'>{item.viewCount}</span>
                        </OptionCount>
                        }
                        
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

    cursor:pointer;
`
const ImgSection = styled.div`
    width:100%;
    height:400px;
    border-top-right-radius:10px;
    border-top-left-radius:10px;
    display: flex;
    justify-content: center;
    background-color: var(--gray2);
    img{
        height: 100%;
        border-radius: 5px;
    }
`

const ItemInfo = styled.div`
    display:flex;
    flex-direction:column;
    margin: 20px 0 0 0px;

    .UserName{
        font-size:14px;
        font-weight: 400;
        margin-right: auto;
    }
    .option{
        font-size:12px;
        color: var(--gray4);
    }

    .Title{
        font-size:16px;
        font-weight: 500;
    }

`

const OptionCount = styled.div`
    display:flex;
    align-items: center;
    gap:5px;
    font-size:12px;
    font-weight: 400;
    margin-left:auto;

    img {
        margin-left: 2px;
        width: 20px;
        height: 20px;
    }
`
const Circle = styled.img`
    width: 30px;
    height: 30px;
    background-color: rgb(217, 217, 217);
    border-radius: 50%;
`
const InfoHeader = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
    margin-bottom: 10px;
`