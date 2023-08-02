import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from '../common/StyledButton';

const cards = ['1컷', '2컷', '4컷'];

const FrameSelect = () => {

  const [activeCard, setActiveCard] = useState(2);
  const navigate = useNavigate();


  const rotateRight = () => {
    setActiveCard((activeCard + 1) % 3);
  };

  const rotateLeft = () => {
    setActiveCard((activeCard + 3 - 1) % 3);
  };

  const moveBtnHandler = () => {
    navigate('/camera/capture')
  }
  return (
    <Wrap>
      <Slider>
        <OptionWrap>
          <Cards>
            {cards.map((card, index) => (
            <div style={{ display:'flex', flexDirection: 'column', alignItems:'center', fontSize: '20px', }}>
              {card}
              <Card onClick={()=>{setActiveCard(index)}} key={index} zIndex={index === activeCard ? 3 : 1} height={index === activeCard ? '300px' : '200px'}
              backgroundColor={index === activeCard ? 'lightgrey' : '#333'}>
              </Card>
            </div>
          ))}
          </Cards>
          <ArrowWrap>
            <Arrow onClick={rotateLeft}>{'<'}</Arrow>
            <Arrow onClick={rotateRight}>{'>'}</Arrow>
          </ArrowWrap>
          <StyledButton func={moveBtnHandler} title={'촬영하러 가기'} width={'350px'} />
        </OptionWrap>
      </Slider>
    </Wrap>
  );
};

export default FrameSelect;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Slider = styled.div`
  display: flex;
`;

const OptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 50px;
  gap: 20px;
`

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
  gap: 20px;
`

const Card = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  background-color: #333;
  z-index: ${props => props.zIndex};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
`;

const ArrowWrap = styled.div`
  display: flex;
  gap: 10px;
`

const Arrow = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: rgb(240, 240, 240);
  font-size: 16px;
  line-height: 30px;
`;