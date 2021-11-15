import * as express from "express";
import mongoose = require("mongoose");

export abstract class DbController {

  constructor(connectionUrl: string) {
    this.connectDB(connectionUrl);
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


}