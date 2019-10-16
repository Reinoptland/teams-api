const express = require('express');

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 4000;

require('./db');

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
