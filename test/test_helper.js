const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/game_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', error);
        });
});

beforeEach(done => {
    const { games, developers, characters } = mongoose.connection.collections;
    games.drop(() => {
        developers.drop(() => {
            characters.drop(() => {
                done();
            });
        });
    });
});