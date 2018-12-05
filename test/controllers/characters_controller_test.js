const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');

describe('Developer controller', () => {
    it('POST to api/games/gameid/characters creates a new character of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1' });

        game.save().then(() => {
            request(app)
                .post('/api/games/' + game._id + '/characters')
                .send({ name: 'testName2', description: 'testDescription2' })
                .end((err, response) => {
                    assert(response.body.name === 'testName2');
                    done();
                });
        });
    });

    it('DELETE to /api/games/gameid/characters/characterid deletes a character of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', characters: [{ name: 'testName2', description: 'testDescription2' }] });

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