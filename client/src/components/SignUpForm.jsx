import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
        <>
            <form>
                <label htmlFor="username">Enter a Username</label>
                <input type="text" name="username" value={username} onChange={handleChange} />

                <label htmlFor="email">Enter your Email</label>
                <input type="email" name="email" value={email} onChange={handleChange} />

                <label htmlFor="password">Enter your Password</label>
                <input type="password" name="password" value={password} onChange={handleChange} />

                <label htmlFor="verifyPassword">Confirm your password</label>
                <input type="password" name="verifyPassword" value={verifyPassword} onChange={handleChange} />

                <label htmlFor="summoner_name">Enter your summoner name</label>
                <input type="text" name="summoner_name" value={summoner_name} onChange={handleChange} />
                
                <label htmlFor="region">Choose your region</label>
                <select name="region" value={region} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="NA">NA</option>
                </select>
            </form>
        </>
    );
}
