const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const bcrypt = require("bcrypt");
const User = require("../user/model");

const router = new Router();

// define endpoints here
router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Please give me some credentials, stranger" });
  }

  // Query to find a user by email (unique, right ;) )
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      // we can get null, it was not found
      if (!user) {
        res.status(400).send({
          // message: "User with that email does not exist" ... yeah, but let's not tell people ok?
          message: "Email or password incorrect, sorry"
        });
      }

      // 2. use bcrypt.compareSync to check the password against the stored hash
      else if (bcrypt.compareSync(req.body.password, user.password)) {
        // 3. if the password is correct, return a JWT with the userId of the user (user.id)
        res.send({
          jwt: toJWT({ userId: user.id }) // make a token, with userId encrypted inside of it
        });
      } else {
        res.status(400).send({
          // message: "Password was incorrect" ... yeah, but let's not tell people ok?
          message: "Email or password incorrect, sorry"
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});

router.get("/secret-endpoint", (req, res) => {
  console.log("WHAT IS REQ.HEADERS.AUTHORIZATIOn", req.headers.authorization);
  // do we have req.headers.authorization && if so: split the header on a space
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  console.log("SPLIT:", auth);

  // is auth something && is the first element a string "Bearer" && do we have a token
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // verify the token and get me the information inside (toData(auth[1]))
    const data = toData(auth[1]);
    res.send({
      message: "Thanks for visiting the secret endpoint.",
      data
    });
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
});

module.exports = router;
