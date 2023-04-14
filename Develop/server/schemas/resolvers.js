const { AuthenticationError } = require('apollo-server-express');
const { User } = require ('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if(context.user) {
                const userData= await User.findOneAndReplace({_id: context.user._id})
                    .select('-__v -password')
            return userData;
            }
            throw new AuthenticationError('You need to be logged in!');
        },              
    },


    Mutation: {
        createUser: async (parent, {username, email, password}) => {
           const user = await User.create({username, email, password});
           const token = signToken(user);
           
            return {token, user};
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

        saveBook: async (parent, {input}, context) => {
            if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: { savedBooks: input }},
                {new: true}
            );
            return updatedUser
            }
            throw new AuthenticationError('You need to be logged in.')
        },

        deleteBook: async (parent, {user, book}, context) => {
            if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$pull: { savedBooks: book._id}},
                {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in')
        },
    },
};

module.exports = resolvers;