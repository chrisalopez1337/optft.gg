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
            </form>
        </>
    );
}
