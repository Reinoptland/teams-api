const { Router } = require("express");
const Team = require("./model");
const Player = require("../player/model");
const authMiddleWare = require("../auth/middleware");

const router = new Router();

router.get("/teams", (req, res, next) => {
  Team.findAll()
    .then(teams => {
      res.send(teams);
    })
    .catch(next);
});

router.get("/teams/:teamId", (req, res, next) => {
  Team.findByPk(req.params.teamId, { include: [Player] })
    .then(team => {
      res.send(team);
    })
    .catch(next);
});

// Create a new team account
router.post("/teams", authMiddleWare, (req, res, next) => {
  console.log("Do we have the user of this request?", req.user);
  // since this was an authenticated route, we now have req.user
  // it contains all info about this user (actually req.user is a Sequelize User instance)

  // You can interact with the database record of this user as well:
  // req.user.update()

  // const userId = req.body.userId // NO!
  Team.create(req.body)
    .then(team => res.json(team))
    .catch(next);
});

router.delete("/teams/:teamId", (req, res, next) => {
  // console.log('WHAT IS REQ.PARAMS before we get wrecked by params', req.params)
  // res.send('Some people want to watch the world burn') // -> route works

  Team.destroy({
    where: {
      id: req.params.teamId
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

router.put("/teams/:teamId", (req, res, next) => {
  // res.send('oh hi')
  // console.log(req.params, 'WRECKED BY PARAMS??')
  Team.findByPk(req.params.teamId)
    .then(team => {
      console.log("TEAM FOUND?", team);
      if (team) {
        team.update(req.body).then(team => res.json(team));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

module.exports = router;
