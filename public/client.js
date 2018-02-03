// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
});

$.get('/getPlaylist', function(link) {
  console.log(link);
  var iframe = '<iframe src="' + link + '"width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'
  $(iframe).appendTo("#videoWrapper");
});


$.get('/getMood', function(currentMood) {
  $("#mood").html(currentMood);
});

var zipcode = null;

$('#bigmood').submit(function(event) {
  event.preventDefault();
  zipcode = $('input').val();
  console.log(zipcode);
   $("#mood").html(zipcode);
    $('input').val('');
    $("#mood").html(zipcode);
   $.post('/postMood', function() {
      
    });
  
});


//Weather API


  // $.get('/dreams', function(dreams) {
  //   dreams.forEach(function(dream) {
  //     $('<li></li>').text(dream).appendTo('ul#dreams');
  //   });
  // });

//prob not working bc need to add url to spotify dev list 
// $(window).load(function() {
//  $('.login-button').click(function(){
//   $.get('/login', function() {
//       console.log("authenticated!");
//       $('input').val('');
//       $('input').focus();
//     });
//  });
// });
  
  // $.get('/dreams', function(dreams) {
  //   dreams.forEach(function(dream) {
  //     $('<li></li>').text(dream).appendTo('ul#dreams');
  //   });
  // });
  
  // ('form').submit(function(event) {
  //   event.preventDefault();
  //   var dream = $('input').val();
  //   $.post('/dreams?' + $.param({dream: dream}), function() {
  //     $('<li></li>').text(dream).appendTo('ul#dreams');
  //     $('input').val('');
  //     $('input').focus();
  //   });
  // });
  
//   $(window).load(function() {
//     $("img").click(function(){
//         $.get('/auth/spotify', function() {
//           console.log("it works");

//      });
// });
  
//   $('form').submit(function(event) {
//     event.preventDefault();
//     var dream = $('input').val();
//     $.get('/auth/spotify', function() {
//       console.log("authenticated!");
//       $('input').val('');
//       $('input').focus();
//     });
//   });

// });
