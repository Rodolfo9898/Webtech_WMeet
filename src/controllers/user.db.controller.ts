import * as express from 'express';
import mongodb = require('mongodb');
import { BaseController } from './base.controller';
import dotenv = require('dotenv');
import { User } from '..';

enum action {
    insert = 1,
    find = 2
}

class UserDbController{

    insertUser(req: express.Request, res: express.Response, url: string) {
        this.dbHandler(action.insert, req, res, url)
    }

    findUser(req: express.Request, res: express.Response, url: string) {
        this.dbHandler(action.find, req, res, url)
    }

    private dbHandler(act: number, req: express.Request, res: express.Response, url: string): void {
        dotenv.config();
        mongodb.MongoClient.connect(process.env.CONNECTIONLINK, async (err, client) => {
            const db = client.db()
            const userdb = db.collection("UserDB")

            try {
                const username = req.body.username
                const password = req.body.password
                const userFound = (await userdb.find({ username: username }).toArray()).length > 0
                const passFound = (await userdb.find({ pass: password }).toArray()).length > 0
                switch (act) {
                    case action.insert:
                        const firstname = req.body.firstname
                        const lastname = req.body.lastname
                        const school = req.body.school
                        const email = req.body.email
                        const pass = req.body.password

                        if (!userFound) {
                            await userdb.insertOne({ username, firstname, lastname, school, email, pass })
                            res.redirect(url)
                            console.log("user not found -> insert")
                        } else {  
                            console.log("user found - don't insert")
                        }
                        break;

                    case action.find:
                        if (userFound && passFound) {
                            console.log("user found")
                            console.log("-----")
                            console.log(username)
                            console.log("-----")
                            console.log(userFound)
                            res.redirect(url)
                        } else if (userFound) {
                            res.redirect("back")
                            console.log("password wrong")
                        }else{
                            console.log("user not found")
                            res.redirect("back")
                        }
                        break;
                }
            } catch (err) {
                console.log(err)
                console.log("Try again later.")
            }

            client.close()
        });
    }
}

export let db = new UserDbController();