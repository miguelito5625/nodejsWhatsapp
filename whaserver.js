const express = require('express');
var qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const app = express();
const port = 3000;

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Client is ready');


    app.get('/pedir25', (req, res) => {
        const number = "+50237084140";
        const text = "Hola, sera que me puede traer un cilindro de 25 libras";
        const chatId = number.substring(1) + "@c.us";
        client.sendMessage(chatId, text);
        res.status(200).json({
            "msg": "mensaje enviado",
            "code": 200
        });
    });

    app.get('/pedir35', (req, res) => {
        const number = "+50237084140";
        const text = "Hola, sera que me puede traer un cilindro de 35 libras";
        const chatId = number.substring(1) + "@c.us";
        client.sendMessage(chatId, text);
        res.status(200).json({
            "msg": "mensaje enviado",
            "code": 200
        });
    });


    app.get('/', (req, res) => {
        res.status(200).json({
            "msg": "mensaje enviado",
            "code": 200
        });
    });



    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })


});

client.initialize();
