import styled from 'styled-components';
import { Link } from 'react-router-dom';


//font-weight : basic , BOLD 존재  props => color 
//----------------------------------------------------------
// font-weight : basic

export const StyledLink16 = styled(Link)`
    font-size:16px;
    text-decoration:none;
    text-align:center;
    color: ${(props)=>props.color};

`
export const StyledLink14 = styled(Link)`
    font-size:14px;
    text-decoration:none;
    text-align:center;
    color: ${(props)=>props.color};
    display: flex;
    align-items: center;

    &:visited {
    color: var(--black);
}
`

//---------------------------------------------------------------
// font-weight : BOLD

export const StyledBoldLink16 = styled(Link)`
    font-size:16px;
    text-decoration:none;
    text-align:center;
    font-weight:bold;
    color: ${(props)=>props.color};
`
export const StyledBoldLink14 = styled(Link)`
    font-size:14px;
    text-decoration:none;
    text-align:center;
    font-weight:bold;
    color: ${(props)=>props.color};
`