import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Components
import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import GeneralSummonerInfo from './GeneralSummonerInfo.jsx';
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
        if (!savedData) {
            setUserData(savedData);
            return;
        }
        // Get summoner data.
        axios.get(`/api/users/${savedData.username}`)
            .then(({ data }) => setUserData(data))
            .catch(err => console.log(err));
    }, []);

    // Searched users data
    const [searchedUser, setSearchedUser] = useState(null);
    const [analyzedData, setAnalyzedData] = useState(null);

    // Conditional rendering for General summoner info
    let renderGeneralInfo;
    if (searchedUser) {
        if (searchedUser.name) {
            renderGeneralInfo = <GeneralSummonerInfo searchedUser={searchedUser} analyzedData={analyzedData} />
        } else {
            renderGeneralInfo = <></>;
        }
    } else {
        renderGeneralInfo = <></>;
    }

    return (
        <AppWraper>
            <Header setUserData={setUserData} userData={userData} />
            <SearchBar setSearchedUser={setSearchedUser} userData={userData} setAnalyzedData={setAnalyzedData} />
            {renderGeneralInfo}
        </AppWraper>
    );
}
