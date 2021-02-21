const express = require('express');
const leagueRouter = express.Router();
const leagueControllers = require('../controllers/leagueControllers.js');

leagueRouter.get('/summoner/by-summoner-name/:summoner_name', leagueControllers.getSummonerBySummonerName);
leagueRouter.get('/allInfo/by-summmoner-name/:summoner_name', leagueControllers.getAllInfoBySummonerName);
leagueRouter.get('/matchInfo/by-game-id/:gameId', leagueControllers.getMatchByMatchId);

// I think for a faster way to load data, we can just store the summoner 20 matches, and then have a while loop, where we continue to do 1 match requests and load it one game at a time on the front end. (We continue the loop till the last stored gameId matches)). Also this can be done on the backedn or frontent (with axios and while loop). And could be used as a maintence script to keep all users up to date.

module.exports = leagueRouter;
