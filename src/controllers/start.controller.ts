import * as express from 'express';
import { BaseController } from './base.controller';
import { db } from './user.db.controller';
import dotenv = require('dotenv');

export class StartController extends BaseController {
    constructor() {
        super("");
    }

    initializeRoutes(): void {
        //GET http://localhost:5555 main page
        this.router.get("", this.getlogin.bind(this));

        //Post: once login is clicked.
        this.router.post("", this.linkdb.bind(this));
        
        this.router.get("/home", this.gohome.bind(this));
    }

    gohome(req: express.Request, res: express.Response): void{
        console.log("testen");
        res.render("home");
    }

    
    linkdb(req: express.Request, res: express.Response): void{
        var x = req.body.email
        console.log(req.body.email);
        if (typeof x !== 'undefined'){
            console.log('branch1');
            db.insertUser(req, res, "/home");
        }else{
            console.log('branch2');
            db.findUser(req, res, "/home");
        }
        //console.log(req.body.action());
       
    }

    getlogin(req: express.Request, res: express.Response): void {
        console.log("loginpage");
        res.render("login");
    }

}