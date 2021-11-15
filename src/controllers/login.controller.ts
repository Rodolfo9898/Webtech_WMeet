import * as express from 'express';
import { BaseController } from './base.controller';
import { UserDbController } from '../config/user.db.config';
import passport = require('passport');
import { passportValidator } from "../config/passport.config";

export class LoginController extends BaseController {
    db: UserDbController

    constructor() {
        super("");
        this.db = new UserDbController();
    }

    initializeRoutes(): void {
        this.passportv()

        //GET http://localhost:5555 main page
        this.router.get("/login", this.isLoggedOut, (req, res) => {
            console.log("is logging in")
            res.render("login");
        });

        this.router.post("/login",
            passport.authenticate('local', {
                successRedirect: "/home",
                failureRedirect: "/login"
            })
        );

        this.router.post("/register", (req, res) => {
                this.db.InsertUser(req, res)
        })

        this.router.get("/home", this.isLoggedIn, (req, res) => {
            res.render("home")
        });

        this.router.get("/logout", this.isLoggedIn, (req, res) => {
            req.logOut()
            res.redirect("/login")
        })
    }

    passportv() {
        this.router.use(passport.initialize());
        this.router.use(passport.session());

        passportValidator.validateUser(passport)
        passport.authenticate('local', {
            successRedirect: "/home",
            failureRedirect: "/login"
        })
    }

    isLoggedIn(req: express.Request, res: express.Response, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/login")
        }
    }

    isLoggedOut(req: express.Request, res: express.Response, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/home")
        }
    }

}