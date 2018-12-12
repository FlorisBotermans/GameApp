const UsersController = require('../controllers/users_controller');
const GamesController = require('../controllers/games_controller');
const DevelopersController = require('../controllers/developers_controller');
const CharactersController = require('../controllers/characters_controller');

module.exports = (app) => {
    // USER CRUD
    app.post('/api/register', UsersController.register);
    app.post('/api/login', UsersController.login);
    app.get('/api/username', verifyToken, UserController.getUsername);

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
    app.put('/api/games/:gameid/characters/:characterid', CharactersController.editCharacter);
    app.delete('/api/games/:gameid/characters/:characterid', CharactersController.deleteCharacter);

    var decodedToken = '';
    function verifyToken(req, res, next) {
        let token = req.query.token;

        jwt.verify(token, 'secret', function(err, tokendata) {
            if (err) {
                return res.status(400).json({message: 'Unauthorized request'});
            }
            if (tokendata) {
                decodedToken = tokendata;
                next();
            }
        })
    }
};