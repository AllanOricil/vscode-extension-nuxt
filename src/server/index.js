const express = require("express");
const cors = require("cors");
const vscodeRoutes = require('./vscode');

const startServer = async() => {
    const app = express();
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));

    const http = require('http').Server(app);

    const io = require('socket.io')(http, { 
        serveClient: false, 
        cors: {
            origins: 'vscode-webview://*'
        }
    });
    io.on('connect', () => {
        console.log('connected');
    });
    app.set('io', io);

    app.use('/vscode', vscodeRoutes);

    http.listen(process.env.PORT || 5000, 'localhost', () => {
        const { address, port } = http.address();
        console.log(`Listening at http://${address}:${port}`);    
    });
}

module.exports = {
    startServer
}