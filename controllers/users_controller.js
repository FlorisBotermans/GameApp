const User = require('../models/user');
const jwt = require('jsonwebtoken');

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

    login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    if (user.isValid(req.body.password)) {
                        let token = jwt.sign({userName: user.userName}, 'secret', {expiresIn: '2d'});

                        return res.status(200).json(token);
                    } else {
                        res.status(501).send('Invalid Credentials');
                    }
                } else {
                    res.status(501).send('User email is not registered.')
                }
            })
            .catch(() => res.status(501).send('Some internal error'));
    },

    username(req, res, next) {
        return res.status(200).json(decodedToken.userName)
    }
}