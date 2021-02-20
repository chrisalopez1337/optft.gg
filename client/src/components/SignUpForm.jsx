import React, { useState, useEffect } from 'react';
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
    
`;

const TitleWrapper = styled.div`
    width: 100%;
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

export default function SignUpForm() {
    // Store form data;
    const [fields, setFields] = useState({ username: '', password: '', verifyPassword: '', email: '', summoner_name: '', region: ''});
    const { username, password, verifyPassword, email, summoner_name, region } = fields;

    // Update handlers
    function handleChange(e) {
        const { target } = e;
        const { value, name } = target;
        setFields({...fields, [name]: value});
    }

    return (
        <FormWrapper>
            <Form>
            <TitleWrapper>
                <Title>Create Account</Title>
            </TitleWrapper>
                <Label htmlFor="username">Enter a Username:</Label>
                <Input type="text" name="username" value={username} onChange={handleChange} />

                <Label htmlFor="email">Enter your Email:</Label>
                <Input type="email" name="email" value={email} onChange={handleChange} />

                <Label htmlFor="password">Enter your Password:</Label>
                <Input type="password" name="password" value={password} onChange={handleChange} />

                <Label htmlFor="verifyPassword">Confirm your password:</Label>
                <Input type="password" name="verifyPassword" value={verifyPassword} onChange={handleChange} />

                <Label htmlFor="summoner_name">Enter your summoner name:</Label>
                <Input type="text" name="summoner_name" value={summoner_name} onChange={handleChange} />
                
                <Label htmlFor="region">Choose your region</Label>
                <select name="region" value={region} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="NA">NA</option>
                </select>
            </Form>
        </FormWrapper>
    );
}
