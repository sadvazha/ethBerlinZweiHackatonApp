'use strict';

const bodyParser = require('body-parser');
const config = require('./config');
const constants = require('./constants');
const express = require('express');
const metaStamp = require('meta-stamp');
const utils = require('./utils');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log({headers: req.headers, body:req.body, ip: req.connection.remoteAddress});
    next();
});

let incId = 0;
metaStamp.init({
    version: '1.0.0',
    domain: 'trade.dib.one',
    logo: 'https://pbs.twimg.com/profile_images/998895674522353665/mQFAbUOX_400x400.jpg',
    hook: 'https://afraid-rattlesnake-67.localtunnel.me/signatures/',
});

app.get('/', (req, res) => {
    const obj = {
        id: (++incId).toString(),
        description: 'Test',
        data: {
            types: {
                EIP712Domain: [{
                    name: 'name',
                    type: 'string'
                }, {
                    name: 'version',
                    type: 'string'
                }],
                Login: [{
                    name: 'message',
                    type: 'string'
                }]
            },
            domain: {
                name: 'DIB.ONE',
                version: '1'
            },
            primaryType: 'Login',
            message: {
                message: 'Login to DIBOne!'
            }
        },
        metadata: {},
    };

    return res.send(metaStamp.generate(obj));
});

app.post('/', (req, res) => {
    if (!req.body || !utils.isString(req.body.id) || !utils.isString(req.body.signature)) {
        return res.sendStatus(constants.responseCodes.BAD_REQUEST);
    }

    return res.send('Good job! We did nothing!');
});

app.post('/signatures/', (req, res) => {
    if (!req.body || !utils.isString(req.body.id) || !utils.isString(req.body.signature)) {
        return res.sendStatus(constants.responseCodes.BAD_REQUEST);
    }

    verifySignature(req.body.signature, req.body.id);

    return res.send('Transaction approved');
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
    console.log('Some one connected: ', client);

    client.on('event', data => {
        client.emit('finished', 'OK');
    });

    client.on('disconnect', () => {
        console.log('Some one has disconnected');
    });
});

server.listen(3001, '0.0.0.0');

/**
 *
 * @param {string} signature
 * @param {string} id
 * @returns {boolean}
 */
function verifySignature(signature, id) {
    if (parseInt(id, 10) <= incId) {
        return true;
    }

    return false;
}