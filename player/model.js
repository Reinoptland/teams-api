const Sequelize = require('sequelize');
const db = require('../db');
const Team = require('../team/model')

const Player = db.define("player", {
  name: Sequelize.STRING,
  number: Sequelize.INTEGER
});


// Define relations
// - Make sure Models are imported correctly
// - Make sure force: true is on 
// (otherwise we cannot change a table)
// - Make sure to not have circular dependencies
// (not like this:) Team imports Player, Player import Team
Player.belongsTo(Team) // get the Team for this player
Team.hasMany(Player) // get me the Players of this team

module.exports = Player;
