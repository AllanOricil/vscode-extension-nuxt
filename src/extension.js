// @ts-nocheck
const vscode = require('vscode');
const testExtension = require('./test-extension');

const activate = async (context) => {
    await testExtension.activate(context);
    vscode.window.showInformationMessage('Test Extension is Activated');
}

const deactivate = () => {
    testExtension.deactivate();
}

module.exports = {
    activate,
    deactivate
};