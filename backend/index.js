'use strict';

const bodyParser = require('body-parser');
const config = require('./config');
const constants = require('./constants');
const express = require('express');
const utils = require('./utils');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send({
        id: 'some id',
        version: '1.0.0',
        domain: 'trade.dib.one',
        logo: 'https://dib.one/static/log.png',
        description: 'Test description',
        hook: '',
        data: {},
        metaData: {},
    });
});

app.post('/', (req, res) => {
    if (!req.body || !utils.isString(req.body.id) || !utils.isString(req.body.signature)) {
        return res.sendStatus(constants.responseCodes.BAD_REQUEST);
    }

    return res.send('Good job! We did nothing!');
});

app.listen(3000);
