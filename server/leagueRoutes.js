const express = require('express');
const leagueRouter = express.Router();

leagueRouter.get('/summoner/by-summoner-name/:summoner_name', (req, res) => { res.sendStatus(200)});

module.exports = leagueRouter;
