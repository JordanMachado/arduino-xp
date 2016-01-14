var express = require('express');
var bodyParser = require('body-parser');
var status = require('statuses');
var serialport = require('serialport');
var http = require('http');
var app = express();
var server = app.listen(3000);
var cors = require('cors');

var sp;
var number;
var portName = '/dev/tty.usbmodem1411';
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));


serialport.list(function (err, ports) {
  ports.forEach(function(port) {
  	if(port.manufacturer.search("arduino")) {
  		portName = port.comName;
  	}
  });
  connectToSerialPort();
});

//tter
// var Twit  = require('twitter');
// var T = new Twit({
//   consumer_key:'tEdHRzqIwQN196zRQXkVkyCtu',
//   consumer_secret:'rI2WzjjiFazIXXlC498ZdJao9zbYjcj6lWy4EkFmf1h5pmNYli',
//   access_token_key:'4233599248-aeqI3HmurSt70SG9lZ5bf4tNBW7l1khZNF8X2QS',
//   access_token_secret:  'bknox3Vc8syHxxbLpotQ3BdcyCbikbFIv1dExOsTeTb0A'
// })
//
// app.post('/', function (req, res) {
//   // get image
//   var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
//
//   //write image
//   require("fs").writeFile("./users-images/out.png", base64Data, 'base64', function(err) {
//       var data = require('fs').readFileSync('./users-images/out.png');
//       T.post('media/upload', {media: data}, function(error, media, response){
//
//         if (!error) {
//           // write tweet
//           var status = {
//             status: 'I am a tweet',
//             media_ids: media.media_id_string // Pass the media id string
//           }
//
//           T.post('statuses/update', status, function(error, tweet, response){
//             if (!error) {
//               console.log('tweeted');
//             }
//           });
//
//         }
//       });
//   });
//
//   res.send('Done');
// });

var io = require('socket.io').listen(server);

//SOCKET IO ++ SERIAL

function connectToSerialPort(){
	console.log("Connect to Arduino by seriaPort " + portName);
	sp = new serialport.SerialPort(portName, {
	    baudRate: 9600,
	    dataBits: 8,
	    parity: 'none',
	    stopBits: 1,
	    flowControl: false,
	    parser: serialport.parsers.readline("\r\n")
	});
  sp.open( function(error){
    console.log('Serial Port Opened');
    sp.on('data', function(data){
      console.log(data[0]);
          number = data[0];
          if(number>=0){
            //Nombre composé
              io.emit('number', number);
          }else if(number == "i"){
            // Si l'utilisateur est en train de composer
              io.emit('composing', 'true');
          }else if(number == "s"){
            // Déclencheur de photos
              io.emit('snap', 'snaped');
          }else if(number == "p"){
            // Si le téléphonne est reaccroché
              io.emit('pickedUp', 'true');
          }
          else if(number == "r"){
            // Si le téléphonne est reaccroché
              io.emit('hangUp', 'true');
          }

    });
  });
}
// twi


//
//
app.get('/', function(req, res){
  res.sendfile('public/index.html');
});
