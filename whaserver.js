const express = require('express');
var qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LegacySessionAuth } = require('whatsapp-web.js');

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
    // authStrategy: new LegacySessionAuth({
    //     session: sessionData
    // }),
    puppeteer: { 
        headless: true,
        args: ["--no-sandbox"]
    } 
});

// Save session values to the file upon successful auth
// client.on('authenticated', (session) => {
//     sessionData = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// });


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Client is ready');


    app.get('/pedir25', (req, res) => {
        const number = "+50242345578";
        const text = "Hola, sera que me puede traer un cilindro de 25 libras";
        const chatId = number.substring(1) + "@c.us";
        client.sendMessage(chatId, text);
        res.status(200).json({
            "msg": "mensaje enviado",
            "code": 200
        });
    });

    app.get('/pedir35', (req, res) => {
        const number = "+50242345578";
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

app.get('/', (req, res) => {
    res.status(200).json({
        "msg": "mensaje enviado",
        "code": 200
    });
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


