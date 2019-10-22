// Import toData, that decrypts our token and gives the encrypted data
const { toData } = require("./jwt");

// TODO:

// Authenticate user by checking the information in the token
// X Make User Model
// - Make a way for a user to sign up
//    X Backend
//    - Fronted
// - Make a way for a user to login (this is when we give them a token)
//    X Backend
//    - Frontend
// - Make the user send us their token in requests that require authorization
//    - Frontend

// Update the middleware
// - Change this auth middleware to check database iif this user exists
// - Add the information from the user to the "req" object (so we can use it in the next step)

// function with 3 parameters, req, res, next <-- when this middleware is "done" we call next()
const authMiddleWare = (req, res, next) => {
  // do we an auth header, if so split it
  const auth =
    req.headers.authorization && req.headers.authorization.split(" "); // 'Bearer `ldsvhasdjbvs`.dv'
  console.log("SPLIT:", auth);

  // is auth something && is the first element a string "Bearer" && do we have a token
  // auth[1] should be a token
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // verify the token and get me the information inside (toData(auth[1]))
    const data = toData(auth[1]);
    //   res.send({
    //     message: 'Thanks for visiting the secret endpoint.',
    //     data
    //   })
    next();
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
};

module.exports = authMiddleWare;
