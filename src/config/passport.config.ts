import bcrypt = require('bcrypt')
import mongoose = require('mongoose');
const localStrategy		= require('passport-local').Strategy;
import { user } from "../models/user.model";

class PassportController {

    validateUser(passport: any) {
        passport.use(new localStrategy(function (username, password, done) {
            console.log("passport controller funtion called")
            user.findOne({ username: username }, function (err, user) {
                if (err)
                    return done(err)
                if (!user)
                    return done(null, false, { message: 'Incorrect username.' });

                bcrypt.compare(password, user.password, function (err, res) {
                    if (err) return done(err);
                    if (res === false) {
                        return done(null, false, { message: 'Incorrect password.' })
                    } else {
                        return done(null, user)
                    }
                });
            });
        }))

        passport.serializeUser(function (user: any, done) {
            done(null, user.id)
        })

        passport.deserializeUser((id, done) => {
            user.findById(id, function (err, user) {
                done(err, user);
            });
        });
    }
}

export let passportValidator = new PassportController