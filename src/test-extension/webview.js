// @ts-nocheck
const vscode = require('vscode');
const path = require('path');

class QueryEditorWebview {

  constructor(name) {
    this._name = name;
    this._panel = null;
  }

  activate(context, contributeCommand) {
    vscode.commands.registerCommand(contributeCommand, async() => {
      this.showPanel(context);
      this.onDidPose();
    })
  }

  deactivate(){
    this._panel.dispose();
  }

  didDispose(){
    this._panel = null;
  }

  showPanel(context) {
    if (this._panel) {
      this._panel.reveal(vscode.ViewColumn.Three);
    } else {
      const distFolderPath = path.dirname(path.join(context.extensionPath, 'app', 'dist', '_nuxt'));

      this._panel = vscode.window.createWebviewPanel(
        this._name,
        this._name,
        vscode.ViewColumn.Three,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          enableFindWidget: false,
          localResourceRoots: [vscode.Uri.file(distFolderPath)],
        }
      );

      const darkIcon = vscode.Uri.file(
        path.join(context.extensionPath, '.images', 'database_dark.svg')
      );

      const lightIcon = vscode.Uri.file(
        path.join(context.extensionPath, '.images', 'database_light.svg')
      );

      this._panel.iconPath = {
        light: lightIcon,
        dark: darkIcon,
      };
      
      this._panel.webview.html = this.prepareView(`<!doctype html><html lang="en" data-n-head="%7B%22lang%22:%7B%221%22:%22en%22%7D%7D"><head><title>Salesforce Query Editor</title><meta data-n-head="1" charset="utf-8"><meta data-n-head="1" name="viewport" content="width=device-width,initial-scale=1"><meta data-n-head="1" data-hid="description" name="description" content=""><meta data-n-head="1" http-equiv="cache-control" content="no-cache"><meta data-n-head="1" http-equiv="cache-control" content="0"><meta data-n-head="1" http-equiv="cache-control" content="Tue, 01 Jan 1980 1:00:00 GMT"><link rel="preload" href="/_nuxt/app.js" as="script"></head><body><div id="__nuxt"><style>#nuxt-loading{background:#fff;visibility:hidden;opacity:0;position:absolute;left:0;right:0;top:0;bottom:0;display:flex;justify-content:center;align-items:center;flex-direction:column;animation:nuxtLoadingIn 10s ease;-webkit-animation:nuxtLoadingIn 10s ease;animation-fill-mode:forwards;overflow:hidden}@keyframes nuxtLoadingIn{0%{visibility:hidden;opacity:0}20%{visibility:visible;opacity:0}100%{visibility:visible;opacity:1}}@-webkit-keyframes nuxtLoadingIn{0%{visibility:hidden;opacity:0}20%{visibility:visible;opacity:0}100%{visibility:visible;opacity:1}}#nuxt-loading>div,#nuxt-loading>div:after{border-radius:50%;width:5rem;height:5rem}#nuxt-loading>div{font-size:10px;position:relative;text-indent:-9999em;border:.5rem solid #f5f5f5;border-left:.5rem solid #000;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);-webkit-animation:nuxtLoading 1.1s infinite linear;animation:nuxtLoading 1.1s infinite linear}#nuxt-loading.error>div{border-left:.5rem solid #ff4500;animation-duration:5s}@-webkit-keyframes nuxtLoading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes nuxtLoading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}</style><script>window.addEventListener("error",function(){var e=document.getElementById("nuxt-loading");e&&(e.className+=" error")})</script><div id="nuxt-loading" aria-live="polite" role="status"><div>Loading...</div></div></div><script>window.__NUXT__={config:{app:{basePath:"/",assetsPath:"/_nuxt/",cdnURL:null}}}</script> <script src="/_nuxt/app.js"></script></body></html>`, distFolderPath);
      this._panel.onDidDispose(
        () => this.didDispose(),
        undefined,
        context.subscriptions
      );
    }
  }

  prepareView(html, distFolderPath) {
    html = html.replace(/(href=|src=)(.+?)(\ |>)/g, (m, $1, $2, $3) => {
      let uri = $2;
      uri = uri.replace('"', '').replace("'", '');
      uri.indexOf('/_nuxt') === 0 && (uri = `.${uri}`);
      if (uri.substring(0, 1) == '.') {
        const resourceUriOnDisk = vscode.Uri.file(path.resolve(distFolderPath, uri));
        const resourceUri = this._panel.webview.asWebviewUri(resourceUriOnDisk);
        uri = `${$1}${resourceUri}${$3}`;
        return uri.replace('%22', '');
      }
      return m;
    });
    return html;
  }

}

module.exports = QueryEditorWebview;
