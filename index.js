const express = require('express');
const ParseDashboard = require('parse-dashboard');
const fs = require('fs');
const port = 4040;
const os = require( 'os' );
const networkInterfaces = os.networkInterfaces();
const ipAddress = networkInterfaces['eth0'][0]['address'];
const dbName = 'parse';

const dashboard = new ParseDashboard({
    apps: [
        {
            'serverURL': `http://${ipAddress}:1337/${dbName}`,
            'appId': 'yourAppId',
            'masterKey': 'yourMasterKey',
            'appName': 'APP_NAME',
            'iconName': 'icon.jpg'
        }
    ],
    users: [
        { 'user': 'USER', 'pass': 'PASS' }
    ],
    iconsFolder: 'icons'
}, true);

const app = express();
app.use('/', dashboard);

const httpServer = require('http').createServer(app);
httpServer.listen(port, () => {
    console.log('parse-dashboard-starter is running on port ', port);
});
