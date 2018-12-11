const UsersController = require('../controllers/users_controller');
const GamesController = require('../controllers/games_controller');
const DevelopersController = require('../controllers/developers_controller');
const CharactersController = require('../controllers/characters_controller');

module.exports = (app) => {
    // LOGIN CRUD
    app.post('/api/register', UsersController.register);
    app.post('/api/auth', UsersController.auth);
    app.post('/api/login', UsersController.login);

    // GAME CRUD
    app.post('/api/games', GamesController.createGame);
    app.get('/api/games', GamesController.getAllGames);
    app.get('/api/games/:gameid', GamesController.getGameById);
    app.put('/api/games/:gameid', GamesController.editGame);
    app.delete('/api/games/:gameid', GamesController.deleteGame);

    // DEVELOPER CRUD
    app.post('/api/games/:gameid/developers', DevelopersController.createDeveloper);
    app.put('/api/games/:gameid/developers/:developerid', DevelopersController.editDeveloper);
    app.delete('/api/games/:gameid/developers', DevelopersController.deleteDeveloper);

    // CHARACTER CRUD
    app.post('/api/games/:gameid/characters', CharactersController.createCharacter);
    app.get('/api/games/:gameid/characters/:characterid', CharactersController.getCharacterById);
    app.put('/api/games/:gameid/characters/:characterid', CharactersController.editCharacter);
    app.delete('/api/games/:gameid/characters/:characterid', CharactersController.deleteCharacter);

    // Verify Token
    function verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {
            // Splice at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }
    }
};