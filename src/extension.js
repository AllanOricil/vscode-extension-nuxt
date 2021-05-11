// @ts-nocheck
const vscode = require('vscode');
const testExtension = require('./test-extension');
const { startServer } = require('./server');

const activate = async (context) => {
    await testExtension.activate(context);
    await startServer();
    vscode.window.showInformationMessage('Test Extension is Activated');
}

const deactivate = () => {
    testExtension.deactivate();
}

module.exports = {
    activate,
    deactivate
};