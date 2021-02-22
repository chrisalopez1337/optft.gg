import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Components
import Header from './Header.jsx';
// Utils
import { getItem } from '../utils/localStorage.js';

const AppWraper = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    // User data handlers
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const savedData = getItem('loggedIn');
        console.log(savedData);
        if (!savedData) {
            setUserData(savedData);
            return;
        }
        // Get summoner data.
        axios.get(`/api/users/${savedData.username}`)
            .then(({ data }) => setUserData(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <AppWraper>
            <Header setUserData={setUserData} userData={userData} />
        </AppWraper>
    );
}
