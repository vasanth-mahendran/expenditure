const path = require('path')
const express = require('express')
var fs = require('fs');
module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, 'public'))
    console.log('publicPath--'+publicPath)
    app.use('/public', publicPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })
    app.get("/getexpenditure", function(req, res) {
        var expenditure = JSON.parse(fs.readFileSync('static/expenditure.json', 'utf8'));
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(expenditure));
    });
    return app
  }
}

