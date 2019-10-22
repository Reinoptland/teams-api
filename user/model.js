const Sequelize = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    // email should be unique (imho)
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
