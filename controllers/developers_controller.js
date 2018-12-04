const Game = require('../models/game');

module.exports = {
    createDeveloper(req, res, next) {
        const developer = req.body;

        Game.findById({ _id: req.params.gameid })
            .then(game => {
                game.developers.push(developer);
                return game.save();
            })
            .then(() => res.send(developer))
            .catch(next);
    }, 

    editDeveloper(req, res, next) {
        // CREATE LATER
    },

    deleteDeveloper(req, res, next) {
        Game.findByIdAndUpdate(
            { _id: req.params.gameid },
            { $pull: { developers: { _id: req.params.developerid } } }
        )
        .then(game => res.status(204).send(game))
        .catch(next);
    }
};