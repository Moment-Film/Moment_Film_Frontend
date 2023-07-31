import React from 'react';
import styled from 'styled-components';

const EmailLogin = () => {
    return (
        <StyledForm>
            <input placeholder='Email' type='email' />
            <input placeholder='password' type='password' />
        </StyledForm>
    );
};

export default EmailLogin;

const StyledForm=styled.form`
    display:flex;
    flex-direction:column;
`