const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const bodyParserMiddleWare = bodyParser.json()
const corsMiddleWare = cors()

const port = process.env.PORT || 4000;

const teamRouter = require('./team/router');
const playerRouter = require('./player/router')

// If req.body is undefined
// - use bodyparser
// - make sure to app.use(bodyparser) before doing app.use(blablRouter)
// - order matters here (wtf?) -> probably for a good reason 

app
  .use(corsMiddleWare)
  .use(bodyParserMiddleWare)
  .use(playerRouter)
  .use(teamRouter)
  .listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });


/* 

TODO

- player Model
- router -> Player router
- Define the relationships
- router -> add routes to team router so you can get the players of a team?

*/