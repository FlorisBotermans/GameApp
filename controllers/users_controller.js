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
    }
}