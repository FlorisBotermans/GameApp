const bcrypt = require('bcryptjs');
const User = require('./models/user');

exports.authenticate = (email, password) => {
    return new Promise((resolve, reject) => {
        try {
            // Get user by email
            User.findOne({ email })
                .then((user) => {
                    console.log(user);
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;
                        if(isMatch) {
                            resolve(user);
                        } else {
                            // Pass didn't match
                            reject('Authentication failed');
                        }
                    });
                })
                .catch(reject('Authentication failed'));
        } catch(err) {
            // Email not found
            reject('Authentication failed');
        }
    });
}