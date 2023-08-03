import styled from 'styled-components';

export const StyledInput = styled.input`
    width:${(props)=>props.width};
    height:60px;
    font-size: 20px;
    background-color:rgba(248, 248, 248, 1);
    border:none;
    border-bottom:2px solid black;
    outline:none;
`