// function getZipCode() {
// let apikey = '12eb779f6fdf6fe70a9e4bfd82f5def6';
// let zipcode = (document).getElementById("#input").value;
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${zipcode}&units=imperial&appid=${apikey}`;

// let mood = 'tba';
// let test = (document).getElementById("#output");
// fetch(url). then(function(response) {
//     let weather = JSON.parse(response);
//     let message = `It's ${weather.main.temp} Fahrenheit degrees at this place`;
//     let temp = `${weather.main.temp}`;
//     let description = `${weather.description}`;
//     if ( temp > 64 && temp < 86 && description.indexOf("sun") >= 0) {
//       mood = 'ecstatic';
//     } else if ( temp  > 50 && temp  < 64 && description.indexOf("sun") >= 0){
//       mood = 'joyful';
//     } else if ( temp  > 20 && temp  < 50 || description.indexOf("sun") >= 0 || description.indexOf("clouds") >= 0) {
//       mood = 'calm';
//     } else if ( temp  > 10 && temp  < 20 || description.indexOf("rain") >= 0 || description.indexOf("snow") >= 0 || description.indexOf("wind") >= 0) {
//       mood = 'bad';
//     } else {
//       mood = 'depressed';
//     }
//     test.value = mood;
//   })
//   .catch(function(err) {
//       test.value = "errors: " + err;
// });
// }
// document.getElementById('button').addEventListener("click", getZipCode);
