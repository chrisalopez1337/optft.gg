const userModels = require('../models/userModels.js');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

module.exports = {
    createUser: (req, res) => {
        const { username, password, email, summoner_name, region } = req.body;
        // Hash password
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            // Store hashed password
            const data = { username, password: hash, email, summoner_name, region };
            userModels.createUser(data, (err, docs) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        });
    }
}
