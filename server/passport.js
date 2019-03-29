const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const config = require('../config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id');

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }

        })
    );
    // create admin user
    User.findOneAndUpdate(
        { email: 'admin@nc.com'},
        { email: 'admin@nc.com', password: "$2a$10$fqQJ1ruk5gAi0stoBlV0Ae1r/t.JP2e/OR.5.NYJCNROsovgbyzVa"},
        { upsert: true, new: true, setDefaultsOnInsert: true },
        function(error, result) {
            if (error) return;
            // do something with the document
        });

};