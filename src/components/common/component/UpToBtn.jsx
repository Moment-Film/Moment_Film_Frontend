import React from 'react';
import { styled } from 'styled-components';

const UpToBtn = () => {
    const ToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
            <Box onClick={ToTop}>
                <div >▲</div>
            </Box>
    );
};

export default UpToBtn;

const Box = styled.div`
display:flex;
justify-content:center;
align-items:center;

top:80%;
right:3%;
position:fixed;

width:30px;
height:30px;

max-width:80px;
max-height:80px;
border-radius:50%;
border:1px solid black;

color:aliceblue;

cursor: pointer;
`
