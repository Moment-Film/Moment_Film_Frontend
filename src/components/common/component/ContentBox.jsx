import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContentBox = ({ data }) => {

    const Card = ({ item }) => {
        return (
            <ContentsItem>
                <StyledLink>
                    <Img src={'https://pbs.twimg.com/media/Fi3MBQvaMAAMymZ.jpg'}></Img>
                </StyledLink>
                <ItemInfo>
                    <OptionCount>
                        <div>b {'123'}</div>
                        <div>C {'123'}</div>
                    </OptionCount>
                    <div>● 유저이름</div>
                </ItemInfo>
            </ContentsItem>
        )
    }

    return (
        <ContentsSection>
            {
                data.map((item, index) => {
                    return <Card item={item} key={index}></Card>
                })
            }
        </ContentsSection>
    );
};

export default ContentBox;


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

    box-shadow: 0px 0px 40px -5px rgba(0, 0, 0, 0.3);

    
    @media only screen and (min-width: 500px) {
        width:49%;

  }
    @media only screen and (min-width: 1000px) {
        width:23.5%;

  }

  @media only screen and (min-width: 1600px) {
        width:18.4%;

  }

  background-color:var(--white);
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

const OptionCount = styled.div`
    display:flex;
    gap:5px;
    font-size:12px;
    font-weight:normal;
    margin-left:auto;

`