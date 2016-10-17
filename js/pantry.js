'use strict';

var Pantry = function(ingredients) {
  this.ingredients = ingredients;
};

// Returns a random ingredient of the specified type.
Pantry.prototype.randomIngredient = function(type) {
  var ingredients = this.ingredients[type];
  return ingredients[Math.floor(Math.random() * (ingredients.length))];
};

module.exports = Pantry;
