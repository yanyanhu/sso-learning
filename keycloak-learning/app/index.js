'use strict';

const express = require('express');
const cors = require("cors");

const PORT = process.env.PORT || 9090;

var app = express();

app.use(cors());

const successAdmin = (req, res) => {
    console.log(req.headers);
    res.send("successfully access admin endpoint");
}

const successMember = (req, res) => {
    console.log(req.headers);
    res.send("successfully access member endpoint");
}

const tempLogger = (indicator) => {
    return (req, res, next) => {
        console.log(indicator);
        next();
    }
}

app.get('/member', tempLogger("user"), successMember);

app.get('/admin', tempLogger("admin"), successAdmin);

app.listen(PORT, function () {
    console.log(`Listening at http://localhost:${PORT}`);
});
