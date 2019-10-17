const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const bodyParserMiddleWare = bodyParser.json()
// eslint-disable-next-line no-undef
const port = process.env.PORT || 4000;

const teamRouter = require('./team/router');

// If req.body is undefined
// - use bodyparser
// - make sure to app.use(bodyparser) before doing app.use(blablRouter)
// - order matters here (wtf?) -> probably for a good reason 

app
  .use(bodyParserMiddleWare)
  .use(teamRouter)
  .listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
