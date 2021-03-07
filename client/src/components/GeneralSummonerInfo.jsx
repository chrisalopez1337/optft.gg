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
    const { traits } = playerSearchedData;
    // Convert traits into an array for mapping
    const playerTraits = [];
    const formatName = (str) => {
        if (str.indexOf('_') > -1) {
            return str.split('_')[1];
        } else {
            return str;
        }
    };
    for (const key in traits) {
        const obj = 
            {
                name: formatName(key),
                wins: traits[key].wins,
                losses: traits[key].losses,
            }
        playerTraits.push(obj);
    };
    console.log(playerTraits);
    const { averageDamageToPlayers, averageGoldLeft, averageLastRound, averageLevel, averagePlacement, averagePlayersEliminated, averageTimeEliminated, averageTraitData } = averagedData;
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

                    <Row>
                        <Section>W/L Ratio:</Section>
                        <Main>{Math.floor(wins / (wins + losses) * 100)}%</Main>
                    </Row>
                </ColumnHolder>
            </InnerWrapper>
                <h1>Your Average Stats</h1>
            <InnerWrapper>
                <ColumnHolder>
                    <Row>
                        <Section>Average Level:</Section>
                        <Main>{playerSearchedData.averageLevel}</Main>
                    </Row>

                    <Row>
                        <Section>Average Gold Left:</Section>
                        <Main>{playerSearchedData.averageGoldLeft}</Main>
                    </Row>

                    <Row>
                        <Section>Average Placement:</Section>
                        <Main>{playerSearchedData.averagePlacement}</Main>
                    </Row>

                    <Row>
                        <Section>Average Last Round:</Section>
                        <Main>{playerSearchedData.averageLastRound}</Main>
                    </Row>
                </ColumnHolder>

                <ColumnHolder>
                    <Row>
                        <Section>Average Players Eliminated:</Section>
                        <Main>{playerSearchedData.averagePlayersEliminated}</Main>
                    </Row>

                    <Row>
                        <Section>Average Time Eliminated:</Section>
                        <Main>{Math.floor(playerSearchedData.averageTimeEliminated / 60)}mins</Main>
                    </Row>

                    <Row>
                        <Section>Average Damage To Players:</Section>
                        <Main>{playerSearchedData.averageDamageToPlayers}</Main>
                    </Row>
                </ColumnHolder>
            </InnerWrapper>
                <h1>Your Trait Data</h1>
            <InnerWrapper>
                <ColumnHolder>
                {playerTraits.map(obj => {
                    return (
                        <Row>
                            <Section>{obj.name}</Section>
                            <Main> Wins: {obj.wins} Losses: {obj.losses} Ratio: {Math.floor(obj.wins / (obj.wins + obj.losses) * 100)}%</Main>
                        </Row>
                    );
                })}
                </ColumnHolder>
            </InnerWrapper>
                <h1>Peers Average Data</h1>
            <InnerWrapper>
                <ColumnHolder>
                    <Row>
                        <Section>Average Level:</Section>
                        <Main>{Math.floor(averageLevel)}</Main>
                    </Row>

                    <Row>
                        <Section>Average Gold Left:</Section>
                        <Main>{Math.floor(averageGoldLeft)}</Main>
                    </Row>

                    <Row>
                        <Section>Average Placement:</Section>
                        <Main>{Math.floor(averagePlacement)}</Main>
                    </Row>

                    <Row>
                        <Section>Average Last Round:</Section>
                        <Main>{Math.floor(averageLastRound)}</Main>
                    </Row>
                </ColumnHolder>

                <ColumnHolder>
                    <Row>
                        <Section>Average Players Eliminated:</Section>
                        <Main>{Math.floor(averagePlayersEliminated)}</Main>
                    </Row>

                    <Row>
                        <Section>Average Time Eliminated:</Section>
                        <Main>{Math.floor(averageTimeEliminated / 60)}mins</Main>
                    </Row>

                    <Row>
                        <Section>Average Damage To Players:</Section>
                        <Main>{Math.floor(averageDamageToPlayers)}</Main>
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
