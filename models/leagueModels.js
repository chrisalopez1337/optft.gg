const { Users } = require('../database');

module.exports = {
    storeMatch: async (data) => {
        // So in the users model I can store the last index, and create a datastructure in the DB to split matches into chunks, and then we only have to update one array rather then going O(n) through all these games.
        try { 
            Users.
        } catch(err) {
            return err;
        }
    }
}
