const { User } = require ('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async () => {

        },
        me: async () => {

        },
    },


    Mutation: {
        createUser: async () => {

        },
        saveBook: async () => {

        },
        deleteBook: async () => {

        },
        login: async () => {

        },
    },
};

module.exports = resolvers;