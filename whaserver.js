const express = require('express');
var qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');

var destination = "53463151";

// // Path where the session data will be stored
// const SESSION_FILE_PATH = './session.json';

// // Load the session data if it has been previously saved
// let sessionData;
// if(fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

const app = express();
const port = 3000;

// const client = new Client({ 
//     puppeteer: { 
//         headless: true,
//         args: ['--no-sandbox', '--disable-setuid-sandbox']
//     } 
// });

const client = new Client({ 
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true,
        args: ["--no-sandbox"]
    } 
});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Client is ready');


    app.get('/pedir25', (req, res) => {
        const number = `+502${destination}`;
        const text = "Hola, sera que me puede traer un cilindro de 25 libras";
        const chatId = number.substring(1) + "@c.us";
        client.sendMessage(chatId, text);
        res.status(200).json({
            "msg": "mensaje enviado",
            "code": 200
        });
    });

    app.get('/pedir35', (req, res) => {
        const number = `+502${destination}`;
        const text = "Hola, sera que me puede traer un cilindro de 35 libras";
        const chatId = number.substring(1) + "@c.us";
        client.sendMessage(chatId, text);
        res.status(200).json({
            "msg": "mensaje enviado",
            "code": 200
        });
    });




});

client.initialize();

app.get('/changedest/:destination', (req, res) => {
    console.log('change dest');
    console.log('params:', req.params );

    if (req.params['destination'] === '') {
        res.status(400).json({
            "msg": "necesita un parametro despues de /changedest/",
            "code": 400
        });
    }

    destination = req.params['destination'];
    console.log('new dest:', destination);


    res.status(200).json({
        "msg": `nuevo destinatario: ${destination}`,
        "code": 200
    });
});

app.get('/destination', (req, res) => {
    res.status(200).json({
        "msg": `Destinatario: ${destination}`,
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


