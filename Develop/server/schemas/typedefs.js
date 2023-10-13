// Importing gql from apollo-server-express
const { gql } = require('apollo-server-express');

// Defining GraphQL types, Books, Query & Mutation
const typeDefs = gql`
type Book {
  _id: _id
  title: String
  author: String
}

type Query {
  books: (Book)
}

type Mutation {
  addBook(title: String, author: String): Book
}
`;

module.exports - typeDefs;