import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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


export default function SearchBar() {
    // Field data
    const [fields, setFields] = useState({ searchName: '', searchRegion: '' });
    const { searchName, searchRegion } = fields;
    // Field handler
    function handleFields(e) {
        const { target } = e;
        const { name, value } = e;
        setFields({...fields, [name]: value});
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
        </SearchBarWrapper>
        </MainWrapper>
    );
}
