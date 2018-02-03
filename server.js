// server.js
//Connect to Spotify API
var SpotifyWebApi = require('spotify-web-api-node');
var refresh = require('spotify-refresh');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : '332f72199c50422196169615f8574d88',
  clientSecret : '54f10f146cf24df3a6a41aaeab7306ce',
  redirectUri : 'https://moodsic.glitch.me/auth/spotify/callback'
});

// init project
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    swig = require('swig');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(passport.initialize());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/login", 
        passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private']}), 
        function (request, response) {
  response.sendFile(__dirname + '/views/login.html');
});

app.get("/home", function (request, response) {
  response.sendFile(__dirname + '/views/home.html');
});

app.get("/index2", function (request, response) {
  response.sendFile(__dirname + '/views/index2.html');
});

// var mood = "happy"

// app.get("/getMood", function(request, response) {
//   response.send(mood);
// });

app.post("/postMood", function(request, response) {
  console.log("hellooooo");
  console.log(request.body);
  //getZipCode();
  //response.send(mood);
});

var playlistBaseURL = 'https://open.spotify.com/embed/user/spotify/playlist/';
var playlist = '37i9dQZF1DWYBO1MoTDhZI';
var mood = 'happy';

//playlists
var moods = {
  joyful : '37i9dQZF1DWYBO1MoTDhZI', 
  ecstatic : '37i9dQZF1DXdPec7aLTmlC', 
  calm : '',
  bad : '',
  depressed : ''
};

app.get("/playlist", function(request, response) {
  response.sendFile(__dirname + '/views/playlist.html');
  //response.render('/playlist.ejs', { playlist: '37i9dQZF1DWYBO1MoTDhZI' });
});

app.get("/getPlaylist", function(request, response) {
  response.send(playlistBaseURL + playlist);
});

app.get('/auth/spotify',
  passport.authenticate('spotify'),
  function(req, res){
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/home' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/playlist');
  });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

/*
Test of npm spotify-playlist that doesn't require authentication
*/
// var spotifyPlaylist = require('spotify-playlist');
//
 
// var callback = function(err, result) {
//     console.log(result.playlist.tracks);
// }

// spotifyPlaylist.playlistUri('spotify:user:spotify:playlist:37i9dQZF1DWY4xHQp97fN6', callback); //Normal spotify URI. 
// spotifyPlaylist.playlist('syknyk', '0Idyatn0m08Y48tiOovNd9', console.log); //Using username and playlist ID as parameters. 

/* 

Spotify Authentication
https://github.com/JMPerez/passport-spotify
https://www.npmjs.com/package/passport-spotify

*/
const SpotifyStrategy = require('passport-spotify').Strategy;

var appKey = process.env.SPOTIFY_CLIENT_ID;
var appSecret = process.env.SPOTIFY_CLIENT_SECRET;

//Support persistent login sessions after closing/reopening app.
//Spotify profile info is serialized and deserialized
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
    clientID: appKey,
    clientSecret: appSecret,
    callbackURL: "https://moodsic.glitch.me/auth/spotify/callback"
  }, 
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    //spotifyApi.setAccessToken(accessToken);
    //spotifyApi.setRefreshToken(refreshToken);
  }, function(err) {
      console.log('Something went wrong when retrieving the access token!', err.message);
    
  }))

/* 
https://github.com/JMPerez/spotify-web-api-node/tree/master/examples
*/
//search for music corresponding to mood

// var mood = 'Happy';

// spotifyApi.searchTracks('Love', function(err, data) {
//   if (err) {
//     console.error('Something went wrong', err.message);
//     return;
//   }

//   // Print some information about the results
//   console.log('I got ' + data.body.tracks.total + ' results!');

//   // Go through the first page of results
//   var firstPage = data.body.tracks.items;
//   console.log('The tracks in the first page are.. (popularity in parentheses)');

//   /*
//    * 0: All of Me (97)
//    * 1: My Love (91)
//    * 2: I Love This Life (78)
//    * ...
//    */
//   firstPage.forEach(function(track, index) {
//     console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
//   });
// });



// spotifyApi.searchPlaylists(mood, function(err, data) {
//   if (err) {
//     console.error('Something went wrong', err.message);
//     return;
//   }

//   // Print some information about the results
//   console.log('I got ' + data.body.tracks.total + ' results!');

//   // Go through the first page of results
//   var firstPage = data.body.tracks.items;
//   console.log('The tracks in the first page are.. (popularity in parentheses)');

//   firstPage.forEach(function(playlist, index) {
//     console.log(index + ': ' + playlist.name + ' (' + playlist.popularity + ')');
//   });
// });

app.get("/getMood", function(request, response) {
  response.send(mood);
});

//Cross post in client
//Weather API

// var zipcode = '100002';

// function getZipCode(code) {
//   console.log("hey " + zipcode);
  
//   let mood = 'happy';

//   var request = require('request');

//   let apikey = '12eb779f6fdf6fe70a9e4bfd82f5def6';
// //   var input = document.getElementById("#input");

// //let zipcode = (document).getElementById("#input").value;

//   let url = 'http://api.openweathermap.org/data/2.5/weather?q=${zipcode}&units=imperial&appid=${apikey}';

//   request(url, function (err, response, body) {
//     console.log(body);
//     if (err) {
//       console.log(err);
//     } else {
//       let weather = JSON.parse(body);
//       let message = `It's ${weather.main.temp} Fahrenheit degrees at this place`;
//       let temp = `${weather.main.temp}`;
//       let description = `${weather.description}`;
//       if ( temp > 64 && temp < 86 && description.indexOf("sun") >= 0) {
//         mood = 'ecstatic';
//       } else if ( temp  > 50 && temp  < 64 && description.indexOf("sun") >= 0){
//         mood = 'joyful';
//       } else if ( temp  > 20 && temp  < 50 || description.indexOf("sun") >= 0 || description.indexOf("clouds") >= 0) {
//         mood = 'calm';
//       } else if ( temp  > 10 && temp  < 20 || description.indexOf("rain") >= 0 || description.indexOf("snow") >= 0 || description.indexOf("wind") >= 0) {
//         mood = 'bad';
//       } else {
//         mood = 'depressed';
//       }
//       console.log(mood);
//     }
//   });
// }