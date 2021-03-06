export default function DataAnalysis(rawData) {
    // Extract base data needed
    const searchedPlayerPuuid = rawData.puuid;
    const allMatchInfo = rawData.allMatchInfo;
    // Define result holder
    let formattedData = {};

    // Begin to loop over the data.
    for (const key in allMatchInfo) {
        const currentGame = allMatchInfo[key];
        
        // Add placeholder for our result
        const currentGameId = currentGame.metadata.match_id;
        formattedData[currentGameId] = 
            { 
                global: {} 
            };

        // Retrieve meaningful info from the game info
        const { game_datetime, game_length, participants } = currentGame.info;
        const allParticipantIds = currentGame.metadata.participants;

        // Add in global info for each gameId
        formattedData[currentGameId].global['game_length'] = game_length;
        formattedData[currentGameId].global['game_datetime'] = game_datetime;
        formattedData[currentGameId].global['participants'] = allParticipantIds;

        // Create structure for each players overall averages in the last 20
        for (let j = 0; j < allParticipantIds.length; j++) {
            if (!formattedData[allParticipantIds[j]]) {
                formattedData[allParticipantIds[j]] = 
                    {
                        totalGoldLeft: 0,
                        totalLastRound: 0,
                        totalLevel: 0,
                        totalPlacement: 0,
                        totalPlayersEliminated: 0,
                        totalTimeEliminated: 0,
                        totalDamageToPlayers: 0,
                        traits: {},
                        gamesTracked: 0,
                    }
            }
        }

        // Begin to process individual player data
        for (let i = 0; i < participants.length; i++) {
            const currentPlayerInfo = participants[i];
            const currentPlayerId = currentPlayerInfo.puuid;

            // Retrieve the meaningful data from the players info.
            const { gold_left, last_round, level, placement, players_eliminated , time_eliminated, total_damage_to_players, traits, units } = currentPlayerInfo; 

            const win = placement >= 4 ? true : false;

            // Add that data to the players info
            const playerData = formattedData[allParticipantIds[i]];
            playerData.totalGoldLeft += gold_left;
            playerData.totalLastRound += last_round;
            playerData.totalLevel += level;
            playerData.totalPlacement += placement;
            playerData.totalPlayersEliminated += players_eliminated;
            playerData.totalTimeEliminated += time_eliminated;
            playerData.totalDamageToPlayers += total_damage_to_players;
            playerData.gamesTracked++;

            // For now we are only going to map primary traits
            
            // First find the main trait used in this match
            let mainTrait = { name: null, count: 0 };
            for (let x = 0; x < traits.length; x++) {
                const currentTrait = traits[x];
                const { name, num_units } = currentTrait;
                if (mainTrait.count < num_units) {
                    mainTrait.count = num_units;
                    mainTrait.name = name;
                }
            }

            // Then add it as a win or loss to the trait map
            if (!playerData.traits[mainTrait.name]) {
                playerData.traits[mainTrait.name] = { wins: 0, losses: 0 };
            }

            if (win) {
                playerData.traits[mainTrait.name].wins += 1;
            } else {
                playerData.traits[mainTrait.name].losses += 1;
            }

            // DEV NOTE: we could potentially add processing for specific champion and item data, however I think unit data is sufficent at this point.
        }
    }
    // At this point we have a map of more well formatted data, now however we have to average this data out in a meaningful fashion and pin that against the player who is searching.
    
    // Average out all the data.
    const averagedData = 
        {
            averageGoldLeft: 0,
            averageLastRound: 0,
            averageLevel: 0,
            averagePlacement: 0,
            averagePlayersEliminated: 0,
            averageTimeEliminated: 0,
            averageDamageToPlayers: 0,
            averageTraitData: {},
        }
    // Find the number to be dividing by, and collect averages
    let amountOfPlayersChecked = 0;
    let keys = Object.keys(formattedData);
    for (let z = 0; z < keys.length; z++) {
        const key = keys[z];
        if (key[0] + key[1] === 'NA') {
            continue;
        }
        amountOfPlayersChecked++;
        const currentCheckedPlayer = formattedData[key];
        const { gamesTracked, totalDamageToPlayers, totalGoldLeft, totalLastRound, totalLevel, totalPlacement, totalPlayersEliminated, totalTimeEliminated, traits } = currentCheckedPlayer;
        // Add averages
        function getAverage(value, divider = gamesTracked) {
            return Math.floor(value / divider);
        }

        averagedData.averageGoldLeft += getAverage(totalGoldLeft);
        averagedData.averageLastRound += getAverage(totalLastRound);
        averagedData.averageLevel += getAverage(totalLevel);
        averagedData.averagePlacement += getAverage(totalPlacement);
        averagedData.averagePlayersEliminated += getAverage(totalPlayersEliminated);
        averagedData.averageTimeEliminated += getAverage(totalTimeEliminated);
        averagedData.averageDamageToPlayers += getAverage(totalDamageToPlayers);

        // Now add to the map of all of the traits
        console.log(currentCheckedPlayer);
        const traitKeys = Object.keys(currentCheckedPlayer.traits);
        console.log(traitKeys);
        for (let k = 0; k < traitKeys.length; k++) {
            const trait = traitKeys[k];
            if (!averagedData.averageTraitData[trait]) {
                averagedData.averageTraitData[trait] = currentCheckedPlayer.traits[trait];
            } else {
                averagedData.averageTraitData[trait].wins += currentCheckedPlayer.traits[trait].wins;
                averagedData.averageTraitData[trait].losses += currentCheckedPlayer.traits[trait].losses;
            }
        }
    }
    console.log(averagedData);
}
