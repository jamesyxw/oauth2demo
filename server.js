const request = require("request");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const { OAuth2Client } = require('google-auth-library');

const oauthClientId = "622741480313-8a3o12mt0i2pc6tkldcan5afrhlo6cfs.apps.googleusercontent.com";

const jsonParser = bodyParser.json();
const client = new OAuth2Client(oauthClientId);
const app = express();

const userSecret = {
    "pineapplepen128@gmail.com": {
        "bankAccountNumber": "1234-5678-1234-5678"
    }
};

app.use(jsonParser);
app.use(morgan('combined'));

function validateReq(req, res, next) {
    if (!req.get('Authorization')) {
        res.status(400).send("Authorization header is required");
    }
    const id_token = req.get('Authorization').substring("Bearer ".length);
    if (!id_token) {
        res.status(400).send("Id token is required");
    }

    client.verifyIdToken({
        idToken: id_token,
        audience: oauthClientId
    }, (err, loginTicket) => {
        if (err) {
            res.status(401).send("ID token is invalid");
        }

        const payload = loginTicket.getPayload();
        req.userContext = payload;
        next();
    });
}

app.use("/api/v1/*", validateReq);

app.get('/api/v1/bankaccount', (req, res) => {
    var userEmail = req.userContext.email;
    if (!userEmail) {
        res.status(403).send("Unknown user");
    }
    res.status(200).send({
        "user": userEmail,
        "bankAccount" : getBackAccountNumber(userEmail)
    });
});

function getBackAccountNumber(userEmail) {
    console.log(userEmail);
    return userSecret[userEmail].bankAccountNumber;
}


app.use(express.static('webapp'));
app.listen(8080);


