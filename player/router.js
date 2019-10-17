const { Router } = require('express');
const Player = require('./model');
const Team = require('../team/model')

const router = new Router();

router.get('/players', (req, res, next) => {
  Player.findAll()
    .then(players => {
      res.send(players);
    })
    .catch(next);
});

router.get('/players/:id', (req, res, next) => {
  Player.findByPk(req.params.id, { include: [ Team ] })
    .then(player => {
      res.send(player);
    })
    .catch(next);
});

// // Create a new player account
router.post("/players", (req, res, next) => {
  // console.log("WHAT IS REQ.BODY", req.body)
  Player.create(req.body)
    .then(player => res.json(player))
    .catch(next)
});

router.delete("/players/:playerId", (req, res, next) => {
  // console.log('WHAT IS REQ.PARAMS before we get wrecked by params', req.params)
  // res.send('Some people want to watch the world burn') // -> route works

  Player.destroy({
    where: {
      id: req.params.playerId,
    }
  })
  .then(numDeleted => {
    if (numDeleted) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
  .catch(next);
});

router.put("/players/:playerId", (req, res, next) => {
  // res.send('oh hi')
  // console.log(req.params, 'WRECKED BY PARAMS??')
  Player.findByPk(req.params.playerId)
    .then(player => {
      // console.log("player FOUND?", player)
      if (player) {
        player
          .update(req.body)
          .then(player => res.json(player));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

module.exports = router;
