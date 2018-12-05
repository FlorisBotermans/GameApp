const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errors = require('restify-errors');
const auth = require('../auth');

const User = require('../models/user');

module.exports = {
    register(req, res, next) {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                // Hash Password
                user.password = hash;
                // Save User
                try {
                    user.save()
                        .then(() => res.send(201))
                        .catch(next);
                } catch(err) {
                    return next(new errors.InternalError(err.message));
                }
            });
        });
    },

    auth(req, res, next) {
        const { email, password } = req.body;

        try {
            // Authenticate user
            auth.authenticate(email, password).then((user) => {
                console.log(user);
                next();
            });
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