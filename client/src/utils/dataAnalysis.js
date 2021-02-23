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
    constructor(gameData, puuid) {
        // Raw data
        this.gameData = gameData;
        // Stored calculated data for batch of matches
        this.averageGoldLeft = 0;
        this.averageLevel = 0;
        this.averageTotalDamage = 0;
        this.averageGameTime = 0;
        this.itemsMap = {};
        this.averageTimeEliminated = 0;
        this.traitsMap = {};
        this.averagePlacement = 0;
        this.unitsMap = {};
        this.puuid = puuid;
        this.averageUnitTier = 0;
        this.averageUnitRarity = 0;
    }
    
    collectDataForSinglePlayer() {
        // Loop over every game
        for (const key in this.gameData) {
            // Select current game and pull required data out
            const game = this.gameData[key];
            const { info, metadata } = game;
            const { game_datetime, game_length, participants } = info;
            // Loop over each participant
            for (let i = 0; i < participants.length; i++) {
                // Get all the main participant data
                const participant = participants[i];
                if (participant.puuid === this.puuid) {
                    const { companion, gold_left, last_round, level, placement, time_eliminated, total_damage_to_players, traits, units } = participant;
                    const win = placement >= 4 ? true : false;
                    // Add to global values
                    this.averageGoldLeft += gold_left;
                    this.averageLevel += level;
                    this.averageTotalDamage += total_damage_to_players;
                    this.averageGameTime += game_length;
                    this.averagePlacement += placement;
                    this.averageTimeEliminated += time_eliminated;

                    // Sum up total traits stats
                    for (let j = 0; j < traits.length; j++) {
                        // Get trait
                        const trait = traits[i];
                        const { name } = trait;
                        // Add to map or increment
                        if (!this.traitsMap[name]) {
                            this.traitsMap[name] = { count: 1, wins: 0, losses: 0 };
                        } else {
                            this.traitsMap[name][count]++;
                        }

                        if (win) {
                            this.traitsMap[name][wins]++;
                        } else {
                            this.traitsMap[name][losses]++;
                        }
                    }

                    // Sum upp total unit stats
                    for (let x = 0; x < units.length; x++) {
                        const unit = units[x];
                        const { character_id, items, tier, rarity } = unit;
                        // Add to average to map
                        if (!this.unitsMap[character_id]) {
                            this.unitsMap[character_id] = { count: 1, wins: 0, losses: 0 };
                        } else {
                            this.unitsMap[character_id][count]++;
                        }
                        // Win loss count
                        if (win) {
                            this.unitsMap[character_id][wins]++;
                        } else {
                            this.unitsMap[character_id][losses]++;
                        }
                        // Add defualt values to average
                        this.averageUnitTier += tier; 
                        this.averageUnitRarity += rarity;
                        // add items to item map
                        for (let y = 0; y < items.length; y++) {
                            const itemId = items[y];
                            const key = `itemId-${itemId}`;
                            if (!this.itemsMap[key]) {
                                this.itemsMap[key] = { wins: 0, losses: 0 };
                            }

                            if (wins) {
                                this.itemsMap[key][wins]++;
                            } else {
                                this.itemsMap[key][losses]++;
                            }
                        }

                    }

                }
            }
        }
        console.log(this);
    }
}








