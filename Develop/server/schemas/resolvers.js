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
           const user = await User.create({username, email, password});
           const token = signToken(user);
           
            return User.create({token, user});
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('No user with this email found.');
            }

            const correctPW = await user.isCorrectPassword(password);

            if(!correctPW) {
                throw new AuthenticationError('Incorrect password.');
            }

            const token = signToken(user);
            return {token, user};
        },

        saveBook: async (parent, {userId, book}) => {
            return User.findOneAndUpdate(
                {_id: userId},
                {$addToSet: { savedBooks: book }},
                {new: true, runValidators:true}
            );
        },

        deleteBook: async (parent, {userId, book}) => {
            return User.findOneAndUpdate(
                {_id: userId},
                {$pull: { savedBooks: book}},
                {new: true}
            );
        },

    },
};

module.exports = resolvers;