const jwt = require('jsonwebtoken');

const Game = require('../models/game');

module.exports = {
    createGame(req, res, next) {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
                res.status(403).send();
            } else {
                Game.create(new Game(req.body))
                    .then(game => res.send(game))
                    .catch(next);
            }
        });
    }, 

    getAllGames(req, res, next) {
        Game.find()
            .then(games => res.send(games))
            .catch(next);
    },

    getGameById(req, res, next) {
        Game.findById({ _id: req.params.gameid })
            .then(game => res.send(game))
            .catch(next);
    },

    editGame(req, res, next) {
        Game.findByIdAndUpdate(
            { _id: req.params.gameid },
            { name: req.body.name, description: req.body.description }
        )
        .then(game => res.send(game))
        .catch(next);
    },

    deleteGame(req, res, next) {
        Game.findByIdAndDelete(
            { _id: req.params.gameid }
        )
        .then(game => res.status(204).send(game))
        .catch(next);
    }
};