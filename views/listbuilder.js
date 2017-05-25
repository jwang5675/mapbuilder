var updatemapname = function (mapname, username) {
  $.ajax({
    type: 'POST',
    url: '/protected',
    data: { newmapname: mapname, userToAddMap: username },
    success: function (data) {
    }
  });
};

var setupLists = function (username) {
  $.ajax({
    type: 'POST',
    url: '/protected',
    data: { user: username },
    success: function (data) {
      console.log(data);
      $('.maps').empty();
      for (var i = 0; i < data.length; i++) {
        $('.maps').append($('<div> <a href="/protected/' + username + data[i] + '/index">' + data[i] + '</a></div>'));
      }
    }
  });
};

var setupFriendsList = function (username) {
  $.ajax({
    type: 'POST',
    url: '/protected',
    data: { friendlist: username },
    success: function (data) {
      console.log(data);
      if (data) {
        $('.friendmaps').empty();
        $('.friendmaps').append($("<h3> Your Friend's Maps: "));
        for (var i = 0; i < data.length; i++) {
          $('.friendmaps').append($('<div> <a href="/protected/' + username + data[i] + '/index">' + data[i] + '</a></div>'));
        }
      } else {
        $('.friendmaps').empty();
        $('.friendmaps').append($('<h3>No user with username: ' + username + ' has been found</h3>'));
      }
    }
  });
};


$(document).ready(function () {
  var user = $('h1').text();
  var res = user.substring(9, user.length);
  setupLists(res);
  console.log(res);

  $('.save').bind('click', function (e) {
    e.preventDefault();
  });

  $('.findfriendbutton').bind('click', function (e) {
    e.preventDefault();
  });

  $('.save').mouseup(function (event) {
    event.preventDefault();
    updatemapname(document.getElementById('newmap').value, res);
    setupLists(res);
  });

  $('.findfriendbutton').mouseup(function (event) {
    event.preventDefault();
    setupFriendsList(document.getElementById('findfriend').value);
  });
});