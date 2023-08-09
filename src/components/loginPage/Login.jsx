import React from 'react';
import GoogleLoginBtn from './GoogleLoginBtn';
import KakaoLoginBtn from './KakaoLoginBtn';
import EmailLogin from './EmailLogin';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import right_arrow from '../assets/images/right_arrow.png'
import line from '../assets/images/line.png'

import * as S from '../common/styles/StyledSpan';
import * as L from '../common/styles/StyledLink';

const Login = () => {
    return (
        <LoginSection>
            <Wrap>
                <S.StyledSpan20>{'로그인'}</S.StyledSpan20>
                <LinkBox>
                    <L.StyledLink14 to={'/signup'}>
                        {'회원가입하기'}
                        <img src={right_arrow}></img>
                    </L.StyledLink14>
                </LinkBox>

                <EmailLogin />

                <BoundaryLine>
                    <Img src={line} /> <S.StyledSpan16>또는</S.StyledSpan16>  <Img src={line} />
                </BoundaryLine>

                <GoogleLoginBtn width='380px' height='60px' />
                <KakaoLoginBtn width='380px' height='60px' />
  
            </Wrap>
        </LoginSection>

    );
};

export default Login;

const LoginSection = styled.section`
    display:flex;
    justify-content:center;
    padding-top:50px;
    padding-bottom:50px;
    height:80vh; 

    background-color:#f5f5f5;
`

const Wrap = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:520px;
    gap:10px;

    background-color:#ffff;
    padding-top:50px;

   /*  max-width:350px; */

`
const StyledLink = styled(Link)`
    text-decoration:none;
    display:flex;
    align-items:center;
`
const LinkBox = styled.div`
    margin-left:auto;
`

const BoundaryLine = styled.div`
    display:flex;
    width:80%;
    align-items:center;
`

const Img = styled.img`
    height:1px;
    width:0;
    flex-grow:1;
`

