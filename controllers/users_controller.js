const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errors = require('restify-errors');
const auth = require('../auth');

const User = require('../models/user');

module.exports = {
    register(req, res, next) {
        const user = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: User.hashPassword(req.body.password)
        });

        user.save()
            .then((user) => res.status(201).send(user))
            .catch(next);

    },

    auth(req, res, next) {
        const { email, password } = req.body;

        try {
            // Authenticate user
            auth.authenticate(email, password).then((user) => {
                res.sendStatus(201);
                console.log(user);
                next();
            })
            .catch(next);
        } catch(err) {
            // User unauthorized
            return next(new errors.UnauthorizedError(err));
        }
    },

    login(req, res, next) {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        jwt.sign({user}, 'secretkey', { expiresIn: '2d' }, (err, token) => {
            res.json({
                token
            });
        });
    }
}