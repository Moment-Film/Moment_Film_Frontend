import React from 'react';
import styled from 'styled-components';

const StyledButton = ({func,title,width}) => {
    return (
        <Outline>
            <WhiteBox width={width}/>
            <MainBox onClick={func} width={width}>
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
    height:55px;
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
    height:55px;
    border:2px solid black;
    background-color:rgba(194, 248, 126, 1);

    max-width:470px;
    
    
`