import React from 'react';
import cancelImg from '../../assets/icons/cancel.png';
import styled from 'styled-components';
const StyledInputBox = () => {
    return (
        <StyledInput>
            <img src={cancelImg}></img>
            <input type='text' placeholder='아이디' />
            <img src={cancelImg}></img>
        </StyledInput>
    );
};

export default StyledInputBox;

const StyledInput=styled.div`
    display:flex;
    width:380px;
    align-items:center;
    border-bottom:2px solid black;
    padding : 0 16px 16px 16px;

    input{
        padding-left:10px;
        border:none;
        outline:none;
        font-size:16px;
    }

`