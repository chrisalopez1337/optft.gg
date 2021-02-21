const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/optftgg-dev', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// These will become deprecated on the next update, may want to remove.
db.on('error', (err) => console.log(err));
db.on('open', () => console.log('Connected to MongoDB @ optftgg-dev'));

// This is a naive schema just for development purposes.
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    summoner_name: String,
    region: String,
    lpRecord: { type: Object, default: { completeLpData: [] weeks: { dateHere: [] }}, // May want to consider splitting the arrays for this one 
    matchHistory: { type: Object, default: { allMatches: { 1: [] }}},
    lastMatchIndex: { type: Number, default: 1 },
    lastGameId: { type: String, default: 'null' },
})

const Users = mongoose.model('Users', userSchema);

module.exports = 
    {
        Users,
    };
