import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Components
import Header from './Header.jsx';

const AppWraper = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    const [userData, setUserData] = useState(null);

    return (
        <AppWraper>
            <Header setUserData={setUserData} userData={userData} />
        </AppWraper>
    );
}
