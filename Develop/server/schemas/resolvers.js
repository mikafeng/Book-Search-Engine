const { AuthenticationError } = require('apollo-server-express');
const { User } = require ('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, userId) => {
            return User.findOne({_id: userId});

        },
        me: async () => {

        },
    },


    Mutation: {
        createUser: async (parent, {username, email, password}) => {
           const username = await User.create({username, email, password});
           const token = signToken(username);
           
            return User.create({token, username});
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('No user with this email found.');
            }

            const correctPW = await username.isCorrectPassword(password);

            if(!correctPW) {
                throw new AuthenticationError('Incorrect password.');
            }

            const token = signToken(username);
            return {token, username};
        },
        saveBook: async () => {

        },
        deleteBook: async () => {

        },

    },
};

module.exports = resolvers;