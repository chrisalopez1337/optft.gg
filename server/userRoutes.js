const express = require('express');
const userRouter = express.Router();
const userControllers = require('../controllers/userControllers.js');

userRouter.post('/create', userControllers.createUser);
userRouter.get('/:searchItem', userControllers.getUser);
userRouter.post('/validate', userControllers.validateUser);
userRouter.patch('/update', userControllers.updateUser);

module.exports = userRouter;
