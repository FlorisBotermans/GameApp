const bcrypt = require('bcryptjs');
const User = mongoose.model('user');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get user by email
            const user = await User.findOne({ email });
            
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    resolve(user);
                } else {
                    // Pass didn't match
                    reject('Authentication failed');
                }
            });
        } catch(err) {
            // Email not found
            reject('Authentication failed');
        }
    });
}