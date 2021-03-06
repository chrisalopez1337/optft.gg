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

export default function SignUpForm({ setModalView }) {
    // Store form data;
    const [fields, setFields] = useState({ username: '', password: '', verifyPassword: '', email: '', summoner_name: '', region: ''});
    const { username, password, verifyPassword, email, summoner_name, region } = fields;

    // Store user messaging
    const [messages, setMessages] = useState({ submitMessage: '', usernameMessage: '', passwordMessage: '', verifyPasswordMessage: '', emailMessage: ''});
    const { usernameMessage, passwordMessage, verifyPasswordMessage, emailMessage, submitMessage } = messages;

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

    // Form validation for password
    useEffect(() => {
        if (password === '') {
            handleMessage('passwordMessage', '');
        } else {
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
            if (regex.test(password)) {
                handleMessage('passwordMessage', '');
            } else {
                handleMessage('passwordMessage', 'Password must be eight or more characters, contain atleast one uppercase, one symbol, and one lowercase.');
            }
        }
    }, [password]);

    // Form validation for password verification
    useEffect(() => {
        if (verifyPassword === '' && password === '') {
            handleMessage('verifyPasswordMessage', '');
        } else if (verifyPassword === password) {
            handleMessage('verifyPasswordMessage', '');
        } else {
            handleMessage('verifyPasswordMessage', 'Passwords must match');
        }
    }, [verifyPassword]);


    // Form validation for email
    useEffect(() => {
        if (email === '') {
            handleMessage('emailMessage', '');
        } else {
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (regex.test(email.toLowerCase())) {
                // First make sure the email hasnt already been registered.
                axios.get(`/api/users/${email}`)
                    .then(({ data }) => {
                        if (!data.email) {
                            // This means the email hasnt been taken.
                            handleMessage('emailMessage', '');
                        } else {
                            // The email is already registered.
                            const message = 'This email is already registered';
                            handleMessage('emailMessage', message);
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                handleMessage('emailMessage', 'Please enter a valid email.');
            }
        }
    }, [email]);


    // Submit handler
    function handleSubmit(e) {
        e.preventDefault();

        let valid = true; // For some reason return statements werent working so this is a temp fix, will refactor later.
        
        // First make sure all the fields have been filled out.
        const requiredFields = [username, email, password, verifyPassword];
        for (let i = 0; i < requiredFields.length; i++) {
            const item = requiredFields[i];
            if (item === '') {
                const message = 'All fields must be filled out';
                handleMessage('submitMessage', message);
                return;
            }
        }

        // Then make sure the formatting is correct for all fields.
        const errorMessages = [usernameMessage, emailMessage, passwordMessage, verifyPasswordMessage];
        for (let i = 0; i < errorMessages.length; i++) {
            const item = errorMessages[i];
            if (item !== '') {
                const message = 'Please make sure all fields are formatted correctly.';
                handleMessage('submitMessage', message);
                return;
            }
        }

        // Format the data to be POSTed.
        const summonerName = summoner_name !== '' ? summoner_name : 'scarra'; // Im setting it to default to scarra so they can preview the page.
        const regionData = region !== '' ? region : 'NA'; // Defaulting to NA for same reasons as above.
        const userData = { username, email, password, summoner_name: summonerName, region: regionData };
        // Create the user.
        axios.post('/api/users/create', userData)
            .then(res => {
                const message = `Thanks for signing up ${username}! Please log in :)`;
                handleMessage('submitMessage', message);
            })
            .catch(err => console.error(err));
    }


    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
            <TitleWrapper>
                <Title>Create Account</Title>
                <CloseButton onClick={() => setModalView('none')}>Close</CloseButton>
            </TitleWrapper>
                <Label htmlFor="username">Enter a Username:</Label>
                <Input type="text" name="username" value={username} onChange={handleChange} />

                <ErrorMessage>{usernameMessage}</ErrorMessage>

                <Label htmlFor="email">Enter your Email:</Label>
                <Input type="email" name="email" value={email} onChange={handleChange} />

                <ErrorMessage>{emailMessage}</ErrorMessage>

                <Label htmlFor="password">Enter your Password:</Label>
                <Input type="password" name="password" value={password} onChange={handleChange} />

                <ErrorMessage>{passwordMessage}</ErrorMessage>

                <Label htmlFor="verifyPassword">Confirm your password:</Label>
                <Input type="password" name="verifyPassword" value={verifyPassword} onChange={handleChange} />

                <ErrorMessage>{verifyPasswordMessage}</ErrorMessage>

                <Label htmlFor="summoner_name">Enter your summoner name:</Label>
                <Input type="text" name="summoner_name" value={summoner_name} onChange={handleChange} />
                
                <Label htmlFor="region">Choose your region</Label>
                <select name="region" value={region} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="NA">NA</option>
                </select>

                <SubmitButton type="submit">Create Account</SubmitButton>

                <SuccessMessage>{submitMessage}</SuccessMessage>
            </Form>
        </FormWrapper>
    );
}
