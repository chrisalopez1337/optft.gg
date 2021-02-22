import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const EditWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    flex-direction: row;
`;

export default function Settings({ userData, setModalView, setUserData }) {
    // Edit fields
    const [fields, setFields] = useState({ new_summoner_name: userData.summoner_name, new_region: userData.region });
    const { new_summoner_name, new_region } = fields;
    // Field handler
    function handleFields(e) {
        const { target } = e;
        const { name, value } = target;
        setFields({...fields, [name]: value});
    }
    // error message
    const [errorMessage, setErrroMessage] = useState('');
    // success message
    const [successMessage, setSuccessMessage] = useState('');

    // Submit handlers
    function handleSubmit(e) {
        e.preventDefault();
        // Make sure fields are not just the same.
        if (new_summoner_name === userData.summoner_name && new_region === userData.region) {
            setErrorMessage('No fields were edited, please edit fields to update them');
            return;
        }
        // Update user info will edit this later to only update changed fields rather than updating fields even if they didnt get changed.
        const updateInfo = 
            { 
                username: userData.username,
                updateItems: { region: new_region, summoner_name: new_summoner_name },
            }
        axios.patch('/api/users/update', updateInfo)
            .then(({ data }) => setUserData(data), setSuccessMessage('User updated!'), setTimeout(() => setModalView('none'), 1000))
            .catch(err => console.log(err));
    }
    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <TitleWrapper>
                    <Title>Settings</Title>
                    <CloseButton onClick={() => setModalView('none')}>Close</CloseButton>
                </TitleWrapper>

                <Label htmlFor="new_summoner_name">Edit Summoner Name</Label>
                <Input type="text" name="new_summoner_name" value={new_summoner_name} onChange={handleFields} />

                <Label htmlFor="new_region">Edit Region</Label>
                <select onChange={handleFields} value={new_region}>
                    <option value="NA">NA</option>
                </select>

                <SubmitButton type="submit">Submit changes</SubmitButton>

                <ErrorMessage>{errorMessage}</ErrorMessage>
                <SuccessMessage>{successMessage}</SuccessMessage>
            </Form>
        </FormWrapper>
    )
}
