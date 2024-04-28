const express = require('express');
var cors = require('cors')
const app = express();
const path = require('path');
const PORT = 8009;

require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const custom  = require('./controllers/custom');
app.use('/controller', custom);
const celebsRoute = require('./routes/celebs');
app.use('/celebs', celebsRoute);
const topicsRoute = require('./routes/topics');
app.use('/topics', topicsRoute);
const chapterRoute = require('./routes/chapters');
app.use('/chapter', chapterRoute);

//Please don't delete this health API
app.use('/api/health', (req, res) => {
    res.send('Hello Vox Machina');
  });

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

module.exports = app;