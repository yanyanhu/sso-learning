'use strict';

const Keycloak = require('keycloak-connect');
const express = require('express');
const session = require('express-session');
const cors = require("cors");

const PORT = 3000;

var memoryStore = new session.MemoryStore();

var keycloak = new Keycloak({
    store: memoryStore
});

var app = express();

app.use(cors());

app.use(session({
    secret: 'thisShouldBeLongAndSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

app.use(keycloak.middleware());

const success = (req, res) => {
    console.log(req);
    res.send("success");
}

app.get('/test', keycloak.enforcer("Default Resource"), success);

app.get('/login', keycloak.protect(), success);

app.get('/user', keycloak.protect("vanilla:user"), success);

app.get('/admin', keycloak.protect("vanilla:admin"), success);

// app.use(keycloak.middleware({ logout: '/' }));

app.listen(PORT, function () {
    console.log(`Listening at http://localhost:${PORT}`);
});