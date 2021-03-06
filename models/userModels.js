const { Users } = require('../database');

module.exports = {
    createUser: (data, cb) => {
        Users.create(data, cb);
    },

    getUser: (query, cb) => {
        Users.find(query, cb);
    },

    updateUser: (query, data, cb) => {
        Users.findOneAndUpdate(query, data, cb);
    }
}
