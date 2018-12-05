const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');

describe('Game controller', () => {
    it('POST to api/games creates a new game', done => {
        request(app)
            .post('/api/games')
            .send({ name: 'testName', description: 'testDescription' })
            .end(() => {
                Game.findOne({ name: 'testName' })
                    .then(user => {
                        assert(user.description === 'testDescription');
                        done();
                    });
            });
    });

    it('GET to api/games retrieves all games', done => {
        const game1 = new Game({ name: 'testName1', description: 'testDescription1' });
        const game2 = new Game({ name: 'testName2', description: 'testDescription2' });

        Promise.all([game1.save(), game2.save()])
            .then(() => {
                request(app)
                    .get('/api/games')
                    .end((err, response) => {
                        assert(response.body.length === 2);
                        done();
                    });
            });
    });

    it('GET  to api/games/gameid retrieves a specific game', done => {
        const game = new Game({ name: 'testName', description: 'testDescription' });

        game.save().then(() => {
            request(app)
                    .get('/api/games/' + game._id)
                    .end((err, response) => {
                        assert(response.body.name === 'testName');
                        done();
                    });
        });
    });

    it('DELETE to api/games/gameid deletes a game', done => {
        const game = new Game({ name: 'testName', description: 'testDescription' });

        game.save().then(() => {
            request(app)
                .delete('/api/games/' + game._id)
                .end(() => {
                    Game.findOne({ name: 'testName' })
                        .then(game => {
                            assert(game === null);
                            done();
                        });
                });
        });
    });
});