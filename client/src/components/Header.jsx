import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    display: flex;
    align-items: space-between;
    flex-direction: row;
    min-width: 400px;
`;

const Button = styled.button`
    border: 2px solid #e38f10;
    font-family: inherit;
    padding: 7px;
    margin: 10px;
    font-size: 20px;
    color: white;
    border-radius: 10px;
    background: transparent;
    transition-duration: 0.2s;
    &:hover {
        color: #e38f10;
        background: white;
        border: 2px solid white;
    }
`;

const HeaderWrapper = styled.div`
    padding-right: 25px;
    padding-left: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    @media (max-width: 435px) {
        flex-direction: column;
    }
`;

const Logo = styled.h1`
    color: #e38f10;
    font-size: 36px;
`;

export default function Header() {
    return (
        <HeaderWrapper>
            <Logo>optft.gg</Logo>
                <buttonWrapper>
                    <Button>Sign Up</Button>
                    <Button>Log In</Button>
                </buttonWrapper>
        </HeaderWrapper>
    );
}
