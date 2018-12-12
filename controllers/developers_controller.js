const Game = require('../models/game');

module.exports = {
    createDeveloper(req, res, next) {
        const developer = req.body;

        Game.findById({ _id: req.params.gameid })
            .then(game => {
                game.developer = developer;
                return game.save();
            })
            .then(() => res.send(developer))
            .catch(next);
    }, 

    deleteDeveloper(req, res, next) {
        Game.findByIdAndUpdate(
            { _id: req.params.gameid },
            { $unset: { developer: '' } } 
        )
        .then(game => res.status(204).send(game))
        .catch(next);
    }
};