import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

export default function SignUpForm() {
    // Store form data;
    const [fields, setFields] = useState({ username: '', password: '', verifyPassword: '', email: '', summoner_name: '', region: ''});
    const { username, password, verifyPassword, email, summoner_name, region } = fields;

    // Store user messaging
    const [messages, setMessages] = useState({ usernameMessage: '', passwordMessage: '', verifyPasswordMessage: '', emailMessage: ''});
    const { usernameMessage, passwordMessage, verifyPasswordMessage, emailMessage } = messages;

    // Update handlers
    function handleChange(e) {
        const { target } = e;
        const { value, name } = target;
        setFields({...fields, [name]: value});
    }

    function handleMessage(name, value) {
        setMessages({...messages, [name]: value});
    }
    // Form validation for username: 4-10 Chars no special.
    useEffect(() => {
        if (username === '') {
            handleMessage('usernameMessage', '');
        } else {
            const regex = new RegExp("^[a-zA-Z0-9]{4,10}$");
            if (regex.test(username)) {
                // Make sure username doesnt already exist.
                axios.get(`/api/users/${username}`)
                    .then(({ data }) => {
                        if (!data.username) {
                            // Username is available.
                            handleMessage('usernameMessage', '');
                        } else {
                            // Username is taken;
                            const message = 'Username is already taken';
                            handleMessage('usernameMessage', message);
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                const message = 'Username must be 4-10 characters, and contain no special characters.';
                handleMessage('usernameMessage', message)
            }
        }
    }, [username]);

    return (
        <FormWrapper>
            <Form>
            <TitleWrapper>
                <Title>Create Account</Title>
            </TitleWrapper>
                <Label htmlFor="username">Enter a Username:</Label>
                <Input type="text" name="username" value={username} onChange={handleChange} />

                <ErrorMessage>{usernameMessage}</ErrorMessage>

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
