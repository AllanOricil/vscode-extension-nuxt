const vscode = require('vscode');
const webviews = require('./webviews');
const { startServer } = require('./server');

const activate = async (context) => {
    await webviews.activate(context);
    await startServer();
    vscode.window.showInformationMessage('Webview is Activated');
}

const deactivate = () => {
    webviews.deactivate();
}

module.exports = {
    activate,
    deactivate
};