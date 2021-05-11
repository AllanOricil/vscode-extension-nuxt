// @ts-nocheck
const Webview = require('./Webview');
const name = 'test-extension';
const webview = new Webview(name);

const activate = async (context) => {
  webview.activate(context, 'TEST.openWebview');
};

const deactivate = () => {
  webview.deactivate();
};

module.exports = {
  activate,
  deactivate
};
