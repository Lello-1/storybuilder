const express = require('express');
const cors = require('cors');
const router = require('./router');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Listening on http://localhost/:${PORT}`); // eslint-disable-line no-console
});

module.exports = app;
