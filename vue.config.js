const { mount: mountDevEditorApi } = require('./scripts/dev-editor-api.js')

// Served at site root (e.g. custom domain https://vivekraja.me/ via GitHub Pages + public/CNAME).
module.exports = {
  publicPath: '/',
  devServer: {
    before (app) {
      mountDevEditorApi(app)
    }
  }
}
