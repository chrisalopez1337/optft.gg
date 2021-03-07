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

const PlayerTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export default function GeneralSummonerInfo({ searchedUser, analyzedData }) {
    console.log(searchedUser);
    const { name, profileIconId, rank, tier, leaguePoints, losses, wins, summonerLevel } = searchedUser;
    const { averagedData, playerSearchedData } = analyzedData;
    console.log(analyzedData)
    return (
        <MainWrapper>
            <InnerWrapper>
                <PlayerTitleWrapper>
                    <h1>{name}</h1>
                </PlayerTitleWrapper>
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
