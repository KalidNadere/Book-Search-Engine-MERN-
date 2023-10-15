// Importing the necessary 'gql' function from 'apollo-server-express'.
const { gql } = require('apollo-server-express');

// Defining GraphQL types for schema, including 'Book', 'User', 'Query', 'Auth', 'SavedBookInput', and 'Mutation'.
const typeDefs = gql`
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: SavedBookInput): User
        removeBook(bookId: String!): User
    }
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    
    type Auth {
        token: ID!
        user: User
    }

    input SavedBookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

`;

// Exporting 'typeDefs' variable
module.exports = typeDefs;
