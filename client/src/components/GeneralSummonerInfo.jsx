import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column; 
    padding: 25px;
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #e38f10;
    border-radius: 7px;
    padding: 10px;
`;

export default function GeneralSummonerInfo({ searchedUser }) {
    return (
        <MainWrapper>
            <InnerWrapper>
                <h1>{searchedUser.name}</h1>
            </InnerWrapper>
        </MainWrapper>
    );
}

/* Notes
 *
 * Fields ______
 * name
 * tier
 * division
 * leaguePoints
 * losses
 * wins
 * summonerLevel
 * pofileIconId
 * _____________
 * These are currently the only fields we probably care about, may add more later, but for now just want to statically display this information.
 */
