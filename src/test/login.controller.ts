import * as express from 'express';
import { BaseController } from './base.controller';
import { db } from './user.db.controller';
import passport = require('passport');
//import validateUser = require('./passport-config');
import { user } from "../models/user.model";
import { passportValidator } from "./passport.controller";
import mongoose = require("mongoose");
import dotenv = require('dotenv');

export class LoginController extends BaseController {

    constructor() {
        super("");
        dotenv.config();
        this.connectDB(process.env.CONNECTIONLINK);
    }

    initializeRoutes(): void {
        this.passportv()

        //GET http://localhost:5555 main page
        this.router.get("", this.isLoggedOut, (req, res) => {
            res.render("login");
        });

        //Post: once login is clicked.
        this.router.post("", this.isLoggedOut,
            passport.authenticate('local', {
                successRedirect: "/home",
                failureRedirect: ""
            }));

        this.router.get("/home", this.isLoggedIn, (req, res) => {
            res.render("home")
        });
    }

    passportv() {
        this.router.use(passport.initialize());
        this.router.use(passport.session());

        passportValidator.validateUser(passport)
        //validateUser(passport, user)
        passport.authenticate('local', {
            successRedirect: "/home",
            failureRedirect: "/"
        })
    }

    private connectDB(connectionUrl: string): void {
        mongoose.connect(connectionUrl,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        );
        const db = mongoose.connection
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log("Connected successfully");
        });
    }

    //db.handler(req, res, passport);

    isLoggedOut(req: express.Request, res: express.Response, next) {
        console.log("is logged out")
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("home")
        }
    }

    isLoggedIn(req: express.Request, res: express.Response, next) {
        console.log("is logged in")
        if (!req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("")
        }
    }

}