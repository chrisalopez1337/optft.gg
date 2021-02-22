import React, { useState, useEffect } from 'react';
import axios from 'axois';
import styled from 'styled-components';

const FormWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 100;
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 2px solid #e38f10;
    padding-left: 65px;
    padding-bottom: 35px;
    padding-right: 65px;
    border-radius: 7px;
    background-color: #3a3e4a;
    max-width: 400px;
    min-width: 400px;
    `;

const TitleWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`;

const Title = styled.h1`
    font-size: 26px;
    color: #e38f10;
`;

const Input = styled.input`
    background-color: transparent;
    border: 0.7px solid #e38f10;
    border-radius: 5px;
    color: white;
    font-family: inherit;
    font-size: 20px;
    padding: 7px;
    margin: 10px;
`;

const Label = styled.label`
    font-size: 18px;
`;

const ErrorMessage = styled.div`
    font-size: 16px;
    max-width: 75%;
    color: red;
    margin: 4px;
`;

const SuccessMessage = styled.div`
    font-size: 16px;
    max-width: 75%;
    color: green;
    margin: 4px;
`;

const CloseButton = styled.button`
    border: 2px solid red;
    font-family: inherit;
    padding: 5px;
    margin: 4px;
    font-size: 16px;
    color: white;
    border-radius: 10px;
    background: transparent;
    transition-duration: 0.2s;
    &:hover {
        color: white;
        background: red;
        border: 2px solid #e38f10;
    }
`;

const SubmitButton = styled.button`
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


export default function Settings({ userData, setModalView }) {
    // Store data for conditional rendering on edit views.
    const [editViews, setEditViews] = useState({ summoner_name_view: false, regionView: false });
    const { summoner_name_view, regionView } = editViews;
    // Handler function
    function handleChange(name, value) {
        setEditViews({...editViews, [name]: value});
    }

    
    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <TitleWrapper>
                    <Title> Account Settings</Title>
                    <CloseButton onClick={() => setModalView('none')}>Close</CloseButton>
                </TitleWrapper>
                <Label htmlFor="summoner_name">Your summoner name</Label>
                <
            </Form>
        </FormWrapper>
    )
}