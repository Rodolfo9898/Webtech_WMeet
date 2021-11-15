import * as express from "express";
import mongoose = require("mongoose");
import { DbController } from './db.config';
import { user } from "../models/user.model";
import dotenv = require('dotenv');
import bcrypt = require('bcrypt');

export class UserDbController extends DbController {
    constructor() {
        dotenv.config();
        super(process.env.CONNECTIONLINK);

    }

    async userExist(req: express.Request, res: express.Response) {
        return await user.exists({ username: req.body.username });
    }

    private saveUser(user: mongoose.Document) {
        try {
            user.save((err, result) => 
            { if (err){
                console.log(err)
            } else {
                console.log(result); }
            })
        } catch (err) {
            console.log(err)
        }
    }

    async InsertUser(req: express.Request, res: express.Response) {
        const exists = await user.exists({ username: req.body.username });
        if (exists) {return res.redirect("back")}
        
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        if (typeof confirmPassword === 'undefined') {return res.redirect("back")}

        const equal = password === confirmPassword
        if (!equal) { return res.redirect("back")}

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new user({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                school: req.body.school,
                email: req.body.email,
                password: hashedPassword
            })
            this.saveUser(newUser)
            res.redirect("back")
        } catch (err) {
            console.log(err)
        }
    }

}

