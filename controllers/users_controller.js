const jwt = require('jsonwebtoken');

module.exports = { 
    login(req, res, next) {
        const user = {
            id: 1,
            userName: 'Floris',
            email: 'floris29@hotmail.com'
        }

        jwt.sign({user}, 'secretkey', (err, token) => {
            res.json({
                token
            });
        });
    }
}