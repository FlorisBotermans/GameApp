const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');

describe('Developer controller', () => {
    it('POST to api/games/gameid/developers creates a new developer', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1' });

        game.save().then(() => {
            request(app)
                .post('/api/games/' + game._id + '/developers')
                .send({ name: 'testName2', description: 'testDescription2' })
                .end((err, response) => {
                    assert(response.body.name === 'testName2');
                    done();
                });
        });
    });

    it.only('DELETE to /api/games/gameid/developers/developerid deletes a developer', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', developer: { name: 'testName2', description: 'testDescription2' } });

        game.save().then(() => {
            request(app)
                .delete('/api/games/' + game._id + '/developers')
                .end(() => {
                    console.log(game);
                    assert(game.developer !== null);
                    done();
                });
        });
    });
});