var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var base62 = require('./base62.js');
var Url = require('./models/url');
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', function(req, res){
  var longUrl = req.body.url;
  var shortUrl = ''; // the shortened URL we will return
  if(longUrl == ''){
      res.send({'shortUrl': ""});
  }else {
    Url.findOne({long_url: longUrl}, function (err, doc){
        if (doc){
            shortUrl = config.webhost + base62.encode(doc._id);
            res.send({'shortUrl': shortUrl});
        } else {
            var newUrl = Url({
                long_url: longUrl
            });
            // save the new link
            newUrl.save(function(err) {
                if (err){
                    console.log(err);
                }
                // construct the short URL
                shortUrl = config.webhost + base62.encode(newUrl._id);
                res.send({'shortUrl': shortUrl});
            });
        }
    });
  }
});

app.post('/api/shorten-custom', function(req, res){
  var longUrl = req.body.url;
  var inputUrl = req.body.custom; // your input

  var id = base62.decode(inputUrl);
  
  if(longUrl == '' || inputUrl == ''){
      res.send({'shortUrl': ""});
  }else {
    Url.findOne({_id: id}, function (err, doc){
        if (doc){
            res.send({'shortUrl': "Custom URL is not available."});
        } else {
            var newUrl = Url({
                _id : id,
                long_url: longUrl
            });
            // save the new link
            newUrl.save(function(err) {
                if (err){
                console.log(err);
                }
                res.send({'shortUrl': config.webhost + inputUrl});
            });
        }
    });
  }
});

app.get('/:encoded_id', function(req, res){
  var base62Id = req.params.encoded_id;
  var id = base62.decode(base62Id);

  // check if url already exists in database
  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
  });
});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});