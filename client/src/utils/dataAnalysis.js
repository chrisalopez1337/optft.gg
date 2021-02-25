/* Data outlay that we care about
 * Info:
 *     game_datetime: int
 *     game_length: int
 *     participants: [
 *          0:
 *              companion:
 *                  content_ID: int
 *                  skin_ID: int
 *                  species: String
 *              
 *              gold_left: int
 *              last_round: int
 *              level: int
 *              placement: int
 *              players_eliminated: int
 *              puuid: String
 *              total_damages_to_players: 127
 *
 *              traits: [ 
 *                  0:
 *                      name: String
 *                      num_units: int
 *                      style: int
 *                      tier_current: int
 *                      tier_total: int
 *              ]
 *
 *              units: [
 *                  0: 
 *                      character_id: String
 *                      items: Array of Int
 *                      rarity: int
 *                      tier: int
 *              ]
 *
 *     ]
 *
 * _________________________
 * What metrics can we gather from this over a game
 * gold_left -> Spending gold correctly
 * level -> Pushing levels to fast or waiting to long
 * placement -> get average placement over last 20 games
 * players_elimintated / total_damage_to_players -> Indicator of playing to slow
 * time_eliminated -> Indicator of playing to slow
 * traits -> analyze winrate with each trait over last 20 games
 * units -> Analyze to many units (trying to tier 3), to few tier 1, etc.
 * units part 2 -> Analayze winrates with units
 * items -> Analyze winrate with items
 * last_round -> Average last round
 */


export default class DataAnalysis {
    constructor(allGames, playerPuuid) {
        this.allGames = allGames;
        this.playerPuuid = playerPuuid;
    }

    collectData() {
        let allPlayerData = {};
        for (const key in this.allGames) {
            const game = this.allGames[key];
            const { info, metadata } = game;
            // Get meaningful info out of the metadata;
            const participantIds = metadata.participants; 
            const matchId = metadata.match_id;
            // Get meaningful info out of the info obj
            const { game_length, game_datetime, participants};

            // Structure the data
            for (let i = 0; i < participantsId.length; i++) {
                const pId = participantsId[i];
                if (!allPlayerData[pId]) {
                    allPlayersData[pId] = {}; 
                }
            }

        }
    }
}












