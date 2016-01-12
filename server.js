var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var status = require('statuses');
var app = express();
var Twit  = require('twitter');
var cors = require('cors')

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

var T = new Twit({
  consumer_key:'tEdHRzqIwQN196zRQXkVkyCtu',
  consumer_secret:'rI2WzjjiFazIXXlC498ZdJao9zbYjcj6lWy4EkFmf1h5pmNYli',
  access_token_key:'4233599248-aeqI3HmurSt70SG9lZ5bf4tNBW7l1khZNF8X2QS',
  access_token_secret:  'bknox3Vc8syHxxbLpotQ3BdcyCbikbFIv1dExOsTeTb0A'
})

app.post('/', function (req, res) {
  // get image
  var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");

  //write image
  require("fs").writeFile("./users-images/out.png", base64Data, 'base64', function(err) {
      var data = require('fs').readFileSync('./users-images/out.png');
      T.post('media/upload', {media: data}, function(error, media, response){

        if (!error) {
          // write tweet
          var status = {
            status: 'I am a tweet',
            media_ids: media.media_id_string // Pass the media id string
          }

          T.post('statuses/update', status, function(error, tweet, response){
            if (!error) {
              console.log('tweeted');
            }
          });

        }
      });
  });

  res.send('Done');
});

app.listen(3000, function () {
  console.log('Server app listening on port 3000!');
})
