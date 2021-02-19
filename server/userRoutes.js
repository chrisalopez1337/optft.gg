const express = require('express');
const userRouter = express.Router();
const userControllers = require('../controllers/userControllers.js');

userRouter.get('/test', (req, res) => res.sendStatus(200));

module.exports = userRouter;
