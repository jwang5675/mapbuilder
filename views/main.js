/*eslint no-unused-vars: 0 */
/*eslint-env browser */
/*globals $, MapBuilder, Player */

$(document).ready(function () {
  var $mapElement = $('#map-builder');
  var builder = new MapBuilder($mapElement);
  builder.setupPalette();
  builder.setupMapCanvas();
  var pikachu = new Player(0, 0, builder);
  $('#ImageHosting').click(function () {
    alert('Instructions: \n \n 1. Pick a swatch from the palette \n 2. Hover over the map canvas to see swatch in context \n 3. Click on the canvas to paint it with a selected swatch \n 4. Use the arrow keys to navigate Pikachu around the map.\n 5. Press the save button at the bottom of the page to save your map for later! You can share with your friends by telling them your username. \n Happy building!');
  });
});
