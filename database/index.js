const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/optftgg-dev', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// These will become deprecated on the next update, may want to remove.
db.on('error', (err) => console.log(err));
db.on('open', () => console.log('Connected to MongoDB @ optftgg-dev'));

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    summoner_Name: String,
    region: String,
});

const gameInfoSchema = new Mongoose.Schema({
    summoner_name: String,
    account_id: String,
    puuid: String,
    profile_icon_id: Number,
    league_id: String,
    tier: String,
    rank: String,
    league_points: Number,
    wins: Number,
    losses: Number,
    summoner_id: String,
    summoner_level: Number,
    lp_history: {},
    match_history: {},
});

const Users = mongoose.model('Users', userSchema);

module.exports = 
    {
        Users,
    };
