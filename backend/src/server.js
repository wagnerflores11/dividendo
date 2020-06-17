const express = require('express')
const app = express();
const Routes = require('./Routes');

const cors = require('cors')
app.use(cors())

app.use(express.json())

app.use(Routes);

app.listen(3333);

module.exports = app;