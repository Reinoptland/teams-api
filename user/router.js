const { Router } = require("express");
const User = require("./model");

const router = new Router();

router.post("/users", (req, res, next) => {
  User.create(req.body)
    .then(() => res.status(201).send({ message: "User created succesfully" }))
    .catch(next);
});

module.exports = router;
