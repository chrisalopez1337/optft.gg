import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteItem } from '../utils/localStorage.js';
// Components
import SignUpForm from './SignUpForm.jsx';
import LogInForm from './LogInForm.jsx';
import Settings from './Settings.jsx';

const ButtonWrapper = styled.div`
    display: flex;
    align-items: space-between;
    flex-direction: row;
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

const Slogan = styled.h6`
    font-size: 20px;
`;

export default function Header({ userData, setUserData }) {
   // Conditional rendering propertys 
    const [modalView, setModalView] = useState('none');
    const [buttonView, setButtonView] = useState('loggedOut');

    // User data functions
    function handleLogout() {
        setModalView('none');
        const key = 'loggedIn';
        deleteItem(key);
        setUserData(null);
    }

    // Conditional Rendering for the button.
    useEffect(() => {
        if (userData) {
            setButtonView('loggedIn');
        } else {
            setButtonView('loggedOut');
        }
    }, [userData]);
 
    const buttonRender = buttonView === 'loggedOut'
        ? (
            <ButtonWrapper>
                <Button onClick={() => setModalView('sign-in')}>Sign Up</Button>
                <Button onClick={() => setModalView('log-in')}>Log In</Button>
            </ButtonWrapper>
          )
        : (
            <ButtonWrapper>
                <Button onClick={() => setModalView('settings')}>Settings</Button>
                <Button onClick={() => handleLogout()}>Log Out</Button>
            </ButtonWrapper>
          );

    // Conditional rendering for the modal views
    const modalRender = modalView === 'sign-in'
        ? <SignUpForm setModalView={setModalView} />
        : modalView === 'log-in'
        ? <LogInForm setModalView={setModalView} setUserData={setUserData} />
        : modalView === 'settings'
        ? <Settings setModalView={setModalView} setUserData={setUserData} userData={userData} />
        : (<></>);

    return (
       <>
        <HeaderWrapper>
            <Logo>optft.gg</Logo>
            <Slogan>Analayze recent TFT Matches</Slogan>
                    {buttonRender}
        </HeaderWrapper>
        <>
            {modalRender}
        </>
       </>
    );
}
