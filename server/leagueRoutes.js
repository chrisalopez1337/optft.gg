const express = require('express');
const leagueRouter = express.Router();
const leagueControllers = require('../controllers/leagueControllers.js');

leagueRouter.get('/summoner/by-summoner-name/:summoner_name', leagueControllers.getSummonerBySummonerName);

module.exports = leagueRouter;
