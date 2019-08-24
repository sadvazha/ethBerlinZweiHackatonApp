'use strict';

const bodyParser = require('body-parser');
const config = require('./config');
const constants = require('./constants');
const express = require('express');
const metaStamp = require('meta-stamp');
const utils = require('./utils');

const app = express();

app.use(bodyParser.json());

metaStamp.init({
    version: '1.0.0',
    domain: 'https://trade.dib.one',
    logo: 'https://dib.one/static/log.png',
    hook: 'https://api.dib.one/v1/signatures/submit',
});

app.get('/', (req, res) => {
    return res.send(metaStamp.generate({
        id: '123',
        description: 'Test',
        data: {},
        metadata: {},
    }));
});

app.post('/', (req, res) => {
    if (!req.body || !utils.isString(req.body.id) || !utils.isString(req.body.signature)) {
        return res.sendStatus(constants.responseCodes.BAD_REQUEST);
    }

    return res.send('Good job! We did nothing!');
});

app.listen(3000);
