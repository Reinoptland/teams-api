// Strategies:

// - Cook by the book (you can look at examples and use them) -> authMiddleware
// - Build backend route & handler, test it using httpie & console.log
// - Then implement the frontend, go along the redux circle, 1 step at a time

// TODO:

// Authenticate user by checking the information in the token
// X Make User Model
// - Make a way for a user to sign up
//    X Backend
//    - Frontend
// - Make a way for a user to login (this is when we give them a token)
//    X Backend
//    - Frontend
//      X Make a route
//      X Make a form component
//      X Make an action that sends a request
//      X We have token now -> store it (dispatch and make reducer)
//      X Redirect the user to homepage? when user is logged in
//      - Error handling .. hehehe
// - Make the user send us their token in requests that require authorization
//    - Frontend
//      X Post teams -> posting teams & sending the token

// Update the middleware
// - Change this auth middleware to check database iif this user exists
// - Add the information from the user to the "req" object (so we can use it in the next step)

// function with 3 parameters, req, res, next <-- when this middleware is "done" we call next()
// const authMiddleWare = (req, res, next) => {
//   // do we an auth header, if so split it
//   const auth =
//     req.headers.authorization && req.headers.authorization.split(" "); // 'Bearer `ldsvhasdjbvs`.dv'
//   console.log("SPLIT:", auth);

//   // is auth something && is the first element a string "Bearer" && do we have a token
//   // auth[1] should be a token
//   if (auth && auth[0] === "Bearer" && auth[1]) {
//     // verify the token and get me the information inside (toData(auth[1]))
//     const data = toData(auth[1]);
//     //   res.send({
//     //     message: 'Thanks for visiting the secret endpoint.',
//     //     data
//     //   })
//     next();
//   } else {
//     res.status(401).send({
//       message: "Please supply some valid credentials"
//     });
//   }
// };

const User = require("../user/model");
// Import toData, that decrypts our token and gives the encrypted data
const { toData } = require("./jwt");

function authMiddleWare(req, res, next) {
  // check if we have a header, split on a space
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  // check if we have a header at all, if the first part is "Bearer"
  // and if we have a second part, the token
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      // Decrypts token to get the encrypted data (should contain userId)
      const data = toData(auth[1]);
      User.findByPk(data.userId)
        .then(user => {
          if (!user) return next("User does not exist");

          req.user = user;
          // store the user in the request object, so we can use in the next step
          // We are not allowed to send a user in the body of a request
          next();
        })
        .catch(next);
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
}

module.exports = authMiddleWare;
