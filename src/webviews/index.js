const CustomWebview = require('./custom-webview');

const webview = new CustomWebview('Webview', 'Test.openWebview');

const activate = async (context) => {
  webview.activate(context);
};

const deactivate = () => {
  webview.deactivate();
};

module.exports = {
  activate,
  deactivate
};
