const path = require('path')
const express = require('express')
var fs = require('fs');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var bodyParser = require('body-parser');
module.exports = {
  app: function () {
    const app = express()
    .use(bodyParser.json()) // support json encoded bodies
    .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, 'public'))
    const uristring = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
    mongoose.connect(uristring, function (err, res) {
      if (err) { 
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
        console.log ('Succeeded connected to: ' + uristring);
      }
    });
    ObjectId = mongoose.Schema.ObjectId;
    var expenditureSchema = new mongoose.Schema({
      ssn: Number,
      name: {
        first: String,
        last: { type: String, trim: true }
      },
      phno: { type: Number },
      age: { type: Number, min: 0},
      expense: {
        food: Number,
        travel: Number,
        accomodation: Number,
        entertaiment: Number,
        emergency: Number,
        other: Number
      }
    });
    expenditureSchema.plugin(mongoosePaginate);
    var Expenditure = mongoose.model('expenditures', expenditureSchema);
    app.use('/public', publicPath);
    app.get("/static/expenditures", function(req, res) {
        var expenditure = JSON.parse(fs.readFileSync('static/expenditure.json', 'utf8'));
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(expenditure));
    });
    app.get('/api', function (req, res) {
      res.status(200).json({msg: 'OK' });
    });
    app.get('/api/expenditures', function (req, res) {
      var page = req.query.page;
      var limit = req.query.limit;
      if( page !=null && limit!=null){
        page = parseInt(page);
        limit = parseInt(limit);
        Expenditure.paginate({}, { page: page, limit: limit }).then(result=> {
            res.status(200).json(result);
        });
      }else{
        Expenditure.find( function ( err, expenditures ){
          res.status(200).json(expenditures);
        });
      }
    });
    app.get('/api/expenditures/:id', function (req, res) {
      Expenditure.findById( req.params.id, function ( err, expenditure ) {
        res.status(200).json(expenditure);
      });
    });
    app.get('*', function (_, res) { res.sendFile(indexPath) });
    return app
  }
}

