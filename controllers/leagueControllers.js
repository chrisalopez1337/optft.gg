const TftQuery = require('tft-query');
const apiKey = require('../config');

module.exports = {
    getSummonerBySummonerName: async (req, res) => {
        try {
            const region = 'NA' // Default NA for now, but going to change to be dynamic later
            const payload = { summonerName: req.params.summoner_name };
            const config = { region, payload, apiKey, useRedis: false, redisOptions: false };
            const tft = new TftQuery(config);
            const data = await tft.getSummonerBySummonerName();
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },

    getAllInfoBySummonerName: async (req, res) => {
        try {
            const region = 'NA' // Default NA for now, but going to change to be dynamic later
            const payload = { summonerName: req.params.summoner_name };
            const config = { region, payload, apiKey, useRedis: false, redisOptions: false };
            const tft = new TftQuery(config);
            const data = await tft.getAllInfoBySummonerName();
            res.status(200).send(data);
            
        } catch(err) {
            res.status(500).send(err);
        }
    },

    getMatchByMatchId: async (req, res) => {
        try {
            const region = 'NA' // Default NA for now, but going to change to be dynamic later
            const payload = { matchId: req.params.matchId };
            const config = { region, payload, apiKey, useRedis: false, redisOptions: false };
            const tft = new TftQuery(config);
            const data = await tft.getMatchByMatchId();
            // Store into db
            await leagueModels.storeMatch(data);
            res.status(200).send(data);
        } catch(err) {
            res.status(500).send(err);
        }
    }
}
