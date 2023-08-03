
import React from 'react';
import styled from 'styled-components';
const StyledButton = ({func,title,width,height,fontWeight}) => {
    return (
        <Outline>
            <WhiteBox width={width} height={height}/>
            <MainBox onClick={func} width={width} height={height} fontWeight={fontWeight}>
                {title}
            </MainBox>
        </Outline>
    );

};

export default StyledButton;

const Outline = styled.div`
    display:flex;
    margin-bottom:10px;
`
const WhiteBox = styled.div`
    margin-left: 10px;
  
    width:${props => (props.width)};
    height:${props => (props.height)};
    border:2px solid black;
    position:absolute;
    z-index:-1;

    max-width:470px;

`
const MainBox = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:10px;

    width:${props => (props.width)};
    height:${props => (props.height)};
		font-weight:${props => (props.fontWeight)};
    border:2px solid black;
    background-color:var(--lightGreen);
		font-size: 18px;
    max-width:470px;
    
    
`
