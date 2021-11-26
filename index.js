const express = require('express');
const app = express();
const PORT = 3002;
const https = require('https');
const fs = require('fs');
const localIpV4Address = require("local-ipv4-address");

app.use('/', express.static('jarvis'))

//GET home route
app.get('/backend', (req, res) => {

    localIpV4Address().then(function(ipAddress){
        console.log("My IP address is " + ipAddress);

        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<a href="https://' + ipAddress + ':3002/">' + ipAddress + '</button>'));    
    });    
});

// we will pass our 'app' to 'https' server
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'papsxr'
}, app)
.listen(PORT);