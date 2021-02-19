const express = require('express');
const userRouter = express.Router();
const userControllers = require('../controllers/userControllers.js');

userRouter.post('/create', userControllers.createUser);
userRouter.get('/:searchItem', userControllers.getUser);

module.exports = userRouter;
