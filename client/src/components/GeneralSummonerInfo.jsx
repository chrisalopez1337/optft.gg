import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OuterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const InnerWrapper = styled.div`
    display: flex;
    align-items: left;
    justify-content: left;
    flex-direction: row;
    border: 2px solid #e38f10;
    border-radius: 7px;
    padding: 10px;
    min-width: 300px;
`;

const ColumnHolder = styled.div`
    display: flex;
    align-items: left;
    justify-content: left;
    flex-direction: column;
    padding: 10px;
`;

const Section = styled.div`
    font-size: 18px;
    color: white;
`;

const Main = styled.div`
    color: #e38f10;
    font-size: 20px;
    margin-left: 10px;
`;

const Row = styled.div`
    display: flex;
    margin: 10px;
    flex-direction: row;
`;

export default function GeneralSummonerInfo({ searchedUser, analyzedData }) {
    console.log(searchedUser);
    const { name, profileIconId, rank, tier, leaguePoints, losses, wins, summonerLevel } = searchedUser;
    const { averagedData, playerSearchedData } = analyzedData;
    console.log(analyzedData)
    return (
        <OuterWrapper>
            <h1>{name}</h1>
            <InnerWrapper>
                <ColumnHolder>
                    <Row>
                        <Section>Tier:</Section>
                        <Main>{tier}</Main>
                    </Row>

                    <Row>
                        <Section>Rank:</Section>
                        <Main>{rank}</Main>
                    </Row>

                    <Row>
                        <Section>LP:</Section>
                        <Main>{leaguePoints}</Main>
                    </Row>
                </ColumnHolder>

                <ColumnHolder>
                    <Row>
                        <Section>Wins:</Section>
                        <Main>{wins}</Main>
                    </Row>

                    <Row>
                        <Section>Losses:</Section>
                        <Main>{losses}</Main>
                    </Row>
                </ColumnHolder>
            </InnerWrapper>
        </OuterWrapper>
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
