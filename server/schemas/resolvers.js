// Import necessary modules and dependencies, including the User and Book models, and utility functions for token signing and authentication errors.
const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Define the resolvers object that will handle GraphQL queries and mutations.
const resolvers = {
  Query: {
    // Resolver for the "me" query, which fetches user data.
    me: async (parent, args, context) => {
      if (context.user) {
        // If a user is authenticated (context.user exists), fetch their data.
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      // If the user is not authenticated, throw an authentication error.
      throw new AuthenticationError('You need to be logged in!');
    }
  },
  Mutation: {
    // Resolver for the "addUser" mutation, which creates a new user.
    addUser: async (parent, { username, email, password }) => {
      // Create a new user with the provided data.
      const user = await User.create({ username, email, password });
      // Sign a token for the user.
      const token = signToken(user);
      // Return the token and user data in the response.
      return { token, user };
    },
    // Resolver for the "login" mutation, which handles user login.
    login: async (parent, { email, password }) => {
      // Find a user by email.
      const user = await User.findOne({ email });
      if (!user) {
        // If the user does not exist, throw an authentication error.
        throw new AuthenticationError('Incorrect credentials');
      }
      // Check if the provided password matches the stored hashed password.
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        // If the password is incorrect, throw an authentication error.
        throw new AuthenticationError('Incorrect credentials');
      }
      // Sign a token for the user and return it along with user data.
      const token = signToken(user);
      return { token, user };
    },
    // Resolver for the "saveBook" mutation, which adds a book to a user's saved books.
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        // If a user is authenticated, update their savedBooks array.
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true }
        );
        // Return the updated user data.
        return updateUser;
      }
      // If the user is not authenticated, throw an authentication error.
      throw new AuthenticationError('You need to be logged in!');
    },
    // Resolver for the "removeBook" mutation, which removes a book from a user's saved books.
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        // If a user is authenticated, update their savedBooks array by removing the specified book.
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        // Return the updated user data.
        return updateUser;
      }
      // If the user is not authenticated, throw an authentication error.
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

// Export the resolvers object for use in your GraphQL schema.
module.exports = resolvers;
