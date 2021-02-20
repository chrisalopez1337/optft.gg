const userModels = require('../models/userModels.js');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

// Helper functions
const isEmail = (str) => str.indexOf('@') > -1 ? true : false;

module.exports = {
    createUser: (req, res) => {
        const { username, password, email, summoner_name, region } = req.body;
        // Hash password
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
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
    },

    getUser: (req, res) => {
        const { searchItem } = req.params;
        // Define query 
        const query = isEmail(searchItem)
            ? { email: searchItem }
            : { username: searchItem };
        
        userModels.getUser(query, (err, docs) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.status(201).send(docs[0]);
            }
        });
    },

    validateUser: (req, res) => {
        const { searchItem, password } = req.body;
        // Define Query
        const query = isEmail(searchItem)
            ? { email: searchItem }
            : { username: searchItem };

        userModels.getUser(query, (err, docs) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                if (!docs[0]) {
                    res.status(201).send({ validated: false });
                    return;
                }
                const hash = docs[0].password;

                bcrypt.compare(password, hash, (err, result) =>  {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.status(201).send({ validated: result });
                    }
                });
            }
        });
    }
}
