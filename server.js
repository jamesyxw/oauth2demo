const request = require("request");
const express = require("express");
const path = require("path");

const app = express();

app.get('/oauth/redirect', (req, res) => {
    console.log("/oauth/redirect");
    res.sendFile(path.join(__dirname, "webapp", 'redirect.html'));
});

app.get('/login', (req, res) => {
    console.log("login");
    res.sendFile(path.join(__dirname, "webapp", 'index.html'));
});

app.use(express.static('webapp'));

app.listen(8080);


