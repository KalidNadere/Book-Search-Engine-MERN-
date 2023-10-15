// Import the 'gql' function from Apollo Client to define GraphQL mutations
import { gql } from '@apollo/client';

// Define the LOGIN_USER mutation to perform user login
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    #  Call the 'login' mutation with email and password as parameters
    login(email: $email, password: $password) {
      token   # JWT token returned upon successful login
      user {
        _id 
        username 
        email 
      }
    } 
  }
`;

// Define the ADD_USER mutation to create a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    # Call the 'addUser' mutation with username, email, and password as parameters
    addUser(username: $username, email: $email, password: $password) {
      token   # JWT token returned upon successful user creation
      user {
        _id 
        username 
        email 
      }
    }
  }
`;

// Define the SAVE_BOOK mutation to save a book to a user's account
export const SAVE_BOOK = gql`
  mutation saveBook($book: SavedBookInput!) {
    # Call the 'saveBook' mutation with book data as a parameter
    saveBook(book: $book) {
      username   
      email
      bookCount   
      savedBooks {
        # Define the structure of saved books
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

// Define the REMOVE_BOOK mutation to remove a book from a user's account
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    # Call the 'removeBook' mutation with bookId as a parameter
    removeBook(bookId: $bookId) {
      username  
      email   
      bookCount
      savedBooks {
        # Define the structure of saved books
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
