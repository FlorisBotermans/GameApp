const GamesController = require('../controllers/games_controller');
const DevelopersController = require('../controllers/developers_controller');
const CharactersController = require('../controllers/characters_controller');

module.exports = (app) => {
    // GAME CRUD
    app.post('/api/games', GamesController.createGame);
    app.get('/api/games', GamesController.getAllGames);
    app.get('/api/games/:gameid', GamesController.getGameById);
    app.put('/api/games/:gameid', GamesController.editGame);
    app.delete('/api/games/:gameid', GamesController.deleteGame);

    // DEVELOPER CRUD
}