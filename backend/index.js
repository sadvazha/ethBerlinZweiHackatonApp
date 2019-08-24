'use strict';

const bodyParser = require('body-parser');
const config = require('./config');
const constants = require('./constants');
const express = require('express');
const metaStamp = require('meta-stamp');
const utils = require('./utils');

const app = express();

const activeSockets = new Map();

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
    hook: `${config.HOST}:${config.PORT}/signatures/`,
});

app.get('/:id', (req, res) => {
    const obj = {
        id: req.params.id,
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

app.post('/signatures/', (req, res) => {
    if (!utils.isString(req.body.id) || !utils.isString(req.body.signature)) {
        return res.sendStatus(constants.responseCodes.BAD_REQUEST);
    }

    if (!verifySignature(req.body.signature, req.body.id)) {
        return res.sendStatus(constants.responseCodes.BAD_REQUEST);
    }

    const socket = activeSockets.get(+req.body.id);
    if (!socket) {
        return res.sendStatus(constants.responseCodes.BAD_REQUEST);
    }

    socket.emit('success');

    return res.end();
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
    console.log('Connection established: ', client);

    client.on('request', () => {
        const currentId = ++incId;
        activeSockets.set(currentId, client);
        client.emit('id', currentId);
    });
});

server.listen(config.PORT, config.HOST);

/**
 * TODO: Implement signature verification
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