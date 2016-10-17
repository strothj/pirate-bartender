'use strict';

var $ = require('jquery');
var Question = require('./question');
var Ingredient = require('./ingredient');
var Questionnaire = require('./questionnaire');
var Pantry = require('./pantry');
var Bartender = require('./bartender');

// Returns an array of Questions.
function createQuestions() {
  return [
    new Question('Do ye like yer drinks strong?', 'strong'),
    new Question('Do ye like it with a salty tang?', 'salty'),
    new Question('Are ye a lubber who likes it bitter?', 'bitter'),
    new Question('Would ye like a bit of sweetness with yer poison?', 'sweet'),
    new Question('Are ye one for a fruity finish?', 'fruity')
  ];
}

// Returns an object containing Ingredients grouped by type.
function createIngredients() {
  var groupedIngredients = function(ingredients) {
    return ingredients.map(function(item) {
      return new Ingredient(item);
    });
  };

  return {
    strong: groupedIngredients(['glug of rum', 'slug of whisky', 'splash of gin']),
    salty: groupedIngredients(['olive on a stick', 'salt-dusted rim', 'rasher of bacon']),
    bitter: groupedIngredients(['shake of bitters', 'splash of tonic', 'twist of lemon peel']),
    sweet: groupedIngredients(['sugar cube', 'spoonful of honey', 'splash of color']),
    fruity: groupedIngredients(['slice of orange', 'dash of cassis', 'cherry on top'])
  };
}

$(function() {
  var questions = createQuestions();
  var ingredients = createIngredients();
  var pantry = new Pantry(ingredients);
  var bartender = new Bartender(pantry);
  var questionnaire = new Questionnaire($('#js-form'), questions);
  questionnaire.submit = function(preferences) {
    var drink = bartender.createDrink(preferences);
    $('#js-drink-header').removeClass('hidden');
    $('#js-drink').text(drink);
    $('html, body').scrollTop( $(document).height() );
  };
});
