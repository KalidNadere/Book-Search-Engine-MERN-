// Importing dependencies
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Creating GraphQL schema by passing 2 objects, typedefs and resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Exporting schema
module.exports = schema;