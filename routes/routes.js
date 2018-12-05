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
    app.post('/api/games', verifyToken, GamesController.createGame);
    app.get('/api/games', verifyToken, GamesController.getAllGames);
    app.get('/api/games/:gameid', verifyToken, GamesController.getGameById);
    app.put('/api/games/:gameid', verifyToken, GamesController.editGame);
    app.delete('/api/games/:gameid', verifyToken, GamesController.deleteGame);

    // DEVELOPER CRUD
    app.post('/api/games/:gameid/developers', verifyToken, DevelopersController.createDeveloper);
    app.put('/api/games/:gameid/developers/:developerid', verifyToken, DevelopersController.editDeveloper);
    app.delete('/api/games/:gameid/developers', verifyToken, DevelopersController.deleteDeveloper);

    // CHARACTER CRUD
    app.post('/api/games/:gameid/characters', verifyToken, CharactersController.createCharacter);
    app.put('/api/games/:gameid/characters/:characterid', verifyToken, CharactersController.editCharacter);
    app.delete('/api/games/:gameid/characters/:characterid', verifyToken, CharactersController.deleteCharacter);

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