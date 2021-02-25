import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DataAnalysis from '../utils/dataAnalysis.js';

const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    flex-direction: row;
`;

const SearchItemWrapper = styled.div`
    display: flex;
    align-items: left;
    justify-content: left;
    flex-direction: column;
`;


export default function SearchBar({ setUserData, userData }) {
    // Field data
    const [fields, setFields] = useState({ searchName: '', searchRegion: 'NA' });
    const { searchName, searchRegion } = fields;
    // Field handler
    function handleFields(e) {
        const { target } = e;
        const { name, value } = target;
        setFields({...fields, [name]: value});
    }
    // User messaging
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle search
    function handleSearch() {
        console.time('Search')
        if (searchName === '' || searchRegion === '') {
            setErrorMessage('Make sure you select a summoner name and region.');
            return;
        }

        axios.get(`/api/leagues/allInfo/by-summmoner-name/${searchName}`)
            .then(({ data }) => {
                setUserData(data);
                console.log(data);
            })
            .catch(err => console.log(err));
    }
    return (
        <MainWrapper>
            <SearchBarWrapper>
            
                <SearchItemWrapper>
                    <label htmlFor="searchName">Summoner Name</label>
                    <input type="text" name="searchName" value={searchName} onChange={handleFields} />
                </SearchItemWrapper>
            
                <SearchItemWrapper>
                    <label htmlFor="searchRegion">Region</label>
                    <select value={searchRegion} onChange={handleFields}>
                        <option value="NA">NA</option>
                    </select>
                </SearchItemWrapper>
                <button onClick={() => handleSearch()}>Search</button>
            </SearchBarWrapper>
        </MainWrapper>
    );
}
