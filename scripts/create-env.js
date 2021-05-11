// @ts-nocheck
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function checksum (input) {
    const hash = crypto.createHash('sha256').update(input, 'utf8');
    const hashBase64 = hash.digest('base64');
    return 'sha256-' + hashBase64;
}

function run(){
    const file = fs.readFileSync(path.resolve('web','dist', '_nuxt', 'app.js'));
    const hash = checksum(file);
    console.log(hash);
    const appPackage = JSON.parse(fs.readFileSync(path.resolve('web', 'package.json'), {encoding : 'utf-8'}));
    console.log(appPackage.version);
    const envFile = `SALESFORCE_API_VERSION=v50.0\nNODE_ENV=production\nSERVER_ENDPOINT=http://localhost:5000\nKEY_ACCOUNT_ID=78edb4be-f034-4809-9ea9-b29b0dff113e\nPACKAGE_NAME=salesforce-query-editor-app@${appPackage.version}\nCHECKSUM=${hash}`
    fs.writeFileSync(path.resolve('.', '.env'), envFile, { encoding: 'utf-8'});
}

run();