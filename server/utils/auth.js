const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Coult not authenticate user.', {
    extentions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;
    console.log(token);
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};


// const { AuthenticationError } = require('apollo-server-express');
// const { secret, expiration } = require('../config/connection');
// const jwt = require('jsonwebtoken');

// module.exports = {
//   authMiddleware: (context) => {
//     const authHeader = context.req.headers.authorization;

//     if (authHeader) {
//       const token = authHeader.split(' ')[1];

//       if (token) {
//         try {
//           const user = jwt.verify(token, secret, { maxAge: expiration });
//           context.user = user;
//         } catch (error) {
//           throw new AuthenticationError('Invalid or expired token');
//         }
//       } else {
//         throw new AuthenticationError('Authentication token must be provided');
//       }
//     } else {
//       throw new AuthenticationError('Authorization header must be provided');
//     }
//   },
//   signToken: ({ username, email, _id }) => {
//     const payload = { username, email, _id };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };
