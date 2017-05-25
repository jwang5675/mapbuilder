/*eslint-env browser */
/*globals $ */

// The size of a swatch (in pixels)
var SWATCH_SIZE = 25;
var currentDirection = 'player facing-down';
var xcord = 0;
var ycord = 0;
var maxwidth;
var maxheight;

// Utility function - checks if a given swatch name is walkable terrain.
var isTerrain = function (swatchType) {
  return [
    'grass', 'flowers-red', 'flowers-orange', 'flowers-blue', 'weed', 'weed-4x',
    'weed-small', 'weed-2x', 'field', 'sand-patch', 'sand', 'sand-nw', 'sand-n',
    'sand-ne', 'sand-w', 'sand-e', 'sand-sw', 'sand-s', 'sand-se',
    'sand-nw-inverse', 'sand-ne-inverse', 'sand-sw-inverse', 'sand-se-inverse'
  ].indexOf(swatchType) >= 0;
};

/*
 * Constructor for the player (Pikachu sprite).
 *
 * @param x - The beginning x coordinate (usually zero)
 * @param y - The beginning y coordinate (usually zero)
 * @param builder - The MapBuilder object, with information about the map.
 * In particular, this builder object should have the container element
 * as a property so the '.map' div can be found using a jQuery 'find' call.
 */
var Player = function (x, y, builder) {
  this.builder = builder;
  this.$map = builder.$elem.find('.map');
  xcord = x;
  ycord = y;
  maxwidth = this.builder.width - 1;
  maxheight = this.builder.height - 1;

  // TODO: Initialize the player class. You'll need to
  // 1. Create an element for the player and add it to the DOM, with a class
  //    specifying orientation. The classes are 'facing-{up, down, left, right}.'
  var $pikachu = $('<div>').addClass('player facing-down');
  this.$map.append($pikachu);
  $pikachu.css('left', x * SWATCH_SIZE);
  $pikachu.css('top', y * SWATCH_SIZE);

  var moveto = function (newx, newy) {
    $pikachu.css('left', newx * SWATCH_SIZE);
    $pikachu.css('top', newy * SWATCH_SIZE);
  };

  var checksquares = function (xcheck, ycheck) {
    var checker = (ycheck) * (maxwidth + 1) + (xcheck);
    var $element = $('.tile').eq(checker);
    var swatch = $element.get(0);
    var list = swatch.classList;
    return (isTerrain(list[2]));
  };

  // 2. Listen to *keydown* events *on the document* to move the player.
  //    Keycodes for [left, up, right, down] are [37, 38, 39, 40], respectively.
  $(document).on('keydown', function (e) {
    if (e.which === 37) {
      $pikachu.removeClass(currentDirection);
      $pikachu.addClass('player facing-left');
      currentDirection = 'player facing-left';
      if (xcord > 0) {
        if (checksquares(xcord - 1, ycord)) {
          xcord = xcord - 1;
        }
      }

    } else if (e.which === 38) {
      $pikachu.removeClass(currentDirection);
      $pikachu.addClass('player facing-up');
      currentDirection = 'player facing-up';
      if (ycord > 0) {
        if (checksquares(xcord, ycord - 1)) {
          ycord = ycord - 1;
        }
      }

    } else if (e.which === 39) {
      $pikachu.removeClass(currentDirection);
      $pikachu.addClass('player facing-right');
      currentDirection = 'player facing-right';
      if (xcord != maxwidth) {
        if (checksquares(xcord + 1, ycord)) {
          xcord = xcord + 1;
        }
      }

    } else if (e.which === 40) {
      $pikachu.removeClass(currentDirection);
      $pikachu.addClass('player facing-down');
      currentDirection = 'player facing-down';
      if (ycord != maxheight) {
        if (checksquares(xcord, ycord + 1)) {
          ycord = ycord + 1;
        }
      }

    }

    moveto(xcord, ycord);

  });

 

};
