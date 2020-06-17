const express = require('express');
const Routes = express.Router();
const dividasController = require('./controllers/dividasController');

Routes.get('/api', dividasController.show);
Routes.get('/api/:id', dividasController.showSingle);
Routes.post('/api', dividasController.store);
Routes.delete('/api/:id',dividasController.destroy);
Routes.put('/api', dividasController.update);

module.exports = Routes;