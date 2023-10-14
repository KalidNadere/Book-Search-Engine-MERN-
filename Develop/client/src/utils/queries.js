// Import the 'gql' function from Apollo Client to define GraphQL queries
import { gql } from '@apollo/client';

// Define the GET_ME query to fetch user data
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// The 'GET_ME' query can be imported and used in front-end components to fetch user data from the server.