const { mount: mountDevEditorApi } = require('./scripts/dev-editor-api.js')

module.exports = {
  publicPath: '/',
  devServer: {
    before (app) {
      mountDevEditorApi(app)
    }
  }
}
