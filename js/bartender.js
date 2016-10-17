'use strict';

var Bartender = function(pantry) {
  this.pantry = pantry;
};

// Returns a comma separated list of drink ingredients.
Bartender.prototype.createDrink = function(preferences) {
  var ingredients = [];
  for (var i = 0; i < preferences.length; i++) {
    ingredients.push(this.pantry.randomIngredient(preferences[i]));
  }
  return ingredients.map(function(item) {
    return item.name;
  }).join(', ');
};

module.exports = Bartender;
