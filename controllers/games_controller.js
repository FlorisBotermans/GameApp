const Game = require('../models/game');

module.exports = {
    createGame(req, res, next) {
        Game.create(new Game(req.body))
            .then((game) => res.send(game))
            .catch(next);
    }, 

    getAllGames(req, res, next) {
        Game.find()
            .then(games => res.send(games))
            .catch(next);
    },

    getGameById(req, res, next) {
        
    },

    editGame(req, res, next) {

    },

    deleteGame(req, res, next) {

    }
}