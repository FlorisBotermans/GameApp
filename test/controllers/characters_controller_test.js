const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');

describe('Developer controller', () => {
    it('POST to api/games/gameid/characters creates a new character of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform1', category: 'testCategory1' });

        game.save().then(() => {
            request(app)
                .post('/api/games/' + game._id + '/characters')
                .send({ name: 'testName2', title: 'testTitle2', role: 'testRole2' })
                .end((err, response) => {
                    assert(response.body.name === 'testName2');
                    done();
                });
        });
    });

    it('PUT to /api/games/gameid/characters/characterid edits a character of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform', category: 'testCategory', characters: [{ name: 'testName2', title: 'testTitle2', role: 'testRole2' }] });

        game.save().then(() => {
            request(app)
                .put('/api/games/' + game._id + '/characters/' + game.characters[0]._id)
                .send({ name: 'testName3', title: 'testTitle3', role: 'testRole3' })
                .end(() => {
                    Game.findOne({ name: 'testName1' })
                        .then((game) => {
                            assert(game.characters[0].name === 'testName3');
                            done();
                        });
                });
        });
    });

    it('DELETE to /api/games/gameid/characters/characterid deletes a character of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform', category: 'testCategory', characters: [{ name: 'testName2', title: 'testTitle2', role: 'testRole2' }] });

        game.save().then(() => {
            request(app)
                .delete('/api/games/' + game._id + '/characters/' + game.characters[0]._id)
                .end((err, response) => {
                    assert(response.status === 204);
                    done();
                });
        });
    });
});