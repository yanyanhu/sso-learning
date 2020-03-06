'use strict';

const express = require('express');
const cors = require("cors");

const PORT = process.env.PORT || 9091;

var app = express();

app.use(cors());

const successAPI01 = (req, res) => {
    console.log(req.headers);
    res.send("successfully access /demo-frontend-api endpoint");
}

const successAPI02 = (req, res) => {
    console.log(req.headers);
    res.send("successfully access /external-service-api endpoint");
}

const tempLogger = (indicator) => {
    return (req, res, next) => {
        console.log(indicator);
        next();
    }
}

app.get('/demo-frontend-api', tempLogger("demo-frontend-api"), successAPI01);

app.get('/external-service-api', tempLogger("external-service-api"), successAPI02);

app.listen(PORT, function () {
    console.log(`Listening at http://localhost:${PORT}`);
});
