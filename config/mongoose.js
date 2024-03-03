const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/API-db");

const db = mongoose.connection;

db.once("open", (err) => {
    err
        ? console.log("Db not connected")
        : console.log("Db connected successfully");
});

module.exports = db;
