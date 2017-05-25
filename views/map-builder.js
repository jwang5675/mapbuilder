/*eslint-env browser */
/*globals $ */

// Default size of map (in tiles)
var DEFAULT_WIDTH = 30;
var DEFAULT_HEIGHT = 15;
var current = 'grass';
var tile = '';
var repaint = false;
var mousedown = false;
var current_map = [];
var username = null;

var drawMapAjax = function () {
  $.ajax({
    type: 'POST',
    url: '/protected/:className/index',
    data: { mapstring : null, currentUser: username },
    success: function (data) {
      console.log('data is: ' + data);
      console.log('user name is: ' + username);

      if (data) {
        var x = 0;
        for (var i = 0; i < 15; i++) {
          $('.map').append($('<div class = "row"> </div>'));
        }
        var rowlist = document.getElementsByClassName('row');
        for (var i = 0; i < rowlist.length; i++) {
          for (var j = 0; j < 30; j++) {
            $(rowlist[i]).append($('<div class = "tile swatch ' + data[x] + '"> </div>'));
            x = x + 1;
          }
        }
        console.log('map from database');
      } else {
        for (var i = 0; i < 15; i++) {
          $('.map').append($('<div class = "row"> </div>'));
        }
        var rowlist = document.getElementsByClassName('row');
        for (var i = 0; i < rowlist.length; i++) {
          for (var j = 0; j < 30; j++) {
            $(rowlist[i]).append($('<div class = "tile swatch grass"> </div>'));
          }
        }
        console.log('base map');
      }

      $('.tile').mouseenter(function () {
        var list = (this).classList;
        tile = list[2];
        $(this).removeClass(list[2]);
        $(this).addClass('tile ' + current);
        repaint = true;
        if (mousedown) {
          repaint = false;
        }
      });

      $('.tile').mouseout(function () {
        if (repaint) {
          var list = (this).classList;
          $(this).removeClass(list[2]);
          $(this).addClass('tile ' + tile);
        }
      });

      $('.tile').mousedown(function () {
        var list = (this).classList;
        $(this).removeClass(list[2]);
        $(this).addClass('tile ' + current);
        repaint = false;
        mousedown = true;
      });

      $('.tile').mouseup(function () {
        mousedown = false;
      });

    }
  });
};

var MapBuilder = function ($container, params) {
  // TODO: Initialize MapBuilder parameters
  this.$elem = $container;
  if (params) {
    this.width = params.width;
    this.height = params.height;
  } else {
    this.width = DEFAULT_WIDTH;
    this.height = DEFAULT_HEIGHT;
  }

  // initalizes current swatch
  this.currentSwatch = $('.grass');

};

// TODO: Implement MapBuilder.setupPalette()
MapBuilder.prototype.setupPalette = function () {
  $('.swatch').click(function () {
    var $toremove = $('#map-builder').find('.selected');
    $toremove.removeClass('selected');
    $(this).addClass('selected');
    current = this.classList[1];
    console.log(current);
  });
};

// TODO: Implement MapBuilder.setupMapCanvas
MapBuilder.prototype.setupMapCanvas = function () {
  // for (var i = 0; i < 15; i++) {
  //   $('.map').append($('<div class = "row"> </div>'));
  // }
  // var rowlist = document.getElementsByClassName("row");
  // for (var i = 0; i < rowlist.length; i++) {
  //   for (var j = 0; j < 30; j++) {
  //     $(rowlist[i]).append($('<div class = "tile swatch grass"> </div>'));
  //   }
  // }
  username = $('h1').text();
  drawMapAjax();

  // $('.tile').mouseenter(function () {
  //   var list = (this).classList;
  //   tile = list[2];
  //   $(this).removeClass(list[2]);
  //   $(this).addClass('tile ' + current);
  //   repaint = true;
  //   if (mousedown) {
  //     repaint = false;
  //   }
  // });

  // $('.tile').mouseout(function () {
  //   if (repaint) {
  //     var list = (this).classList;
  //     $(this).removeClass(list[2]);
  //     $(this).addClass('tile ' + tile);
  //   }
  // });

  // $('.tile').mousedown(function () {
  //   var list = (this).classList;
  //   $(this).removeClass(list[2]);
  //   $(this).addClass('tile ' + current);
  //   repaint = false;
  //   mousedown = true;
  // });

  // $('.tile').mouseup(function () {
  //   mousedown = false;
  // });

  $('.save').mouseup(function () {
    var list = document.getElementsByClassName('tile');
    var string = '';
    for (var i = 0; i < list.length; i++) {
      current_map[i] = list[i].classList[2];
      var holder = list[i].classList[2];
      string = string.concat(holder);
      string = string.concat('|');
    }
    console.log(string); 
    document.getElementById('mapfield').value = string;
  });

};
//