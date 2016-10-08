'use strict';

var Question = function(question, ingredientType) {
  this.question = question;
  this.ingredientType = ingredientType;
};

Question.prototype.createElement = function() {
  var fieldID = 'js-answer-' + this.ingredientType;
  var elem =  $('<fieldset>' +
    '<legend>' + this.question + '</legend>' +
    '<label for="' + fieldID + '-yes">Yes</label>' +
    '<input type="radio" id="' + fieldID + '-yes">' +
    '<label for="' + fieldID + '-no">No</label>' +
    '<input type="radio" id="' + fieldID + '-no">' +
    '</fieldset>'
  );
  return elem;
};

function createQuestions() {
  return [
    [ 'Do ye like yer drinks strong?', 'strong' ],
    [ 'Do ye like it with a salty tang?', 'salty' ],
    [ 'Are ye a lubber who likes it bitter?', 'bitter' ],
    [ 'Would ye like a bit of sweetness with yer poison?', 'sweet' ],
    [ 'Are ye one for a fruity finish?', 'fruity' ]
  ].map(function(question) {
    return new Question(question[0] /* question */, question[1] /* ingredientType */);
  });
}

var Ingredient = function(name, type) {
  this.name = name;
  this.type = type;
};

function createIngredients() {
  var ingredientTypePairs = [
    { type: 'strong', ingredients: ['glug of rum', 'slug of whisky', 'splash of gin'] },
    { type: 'salty', ingredients: ['olive on a stick', 'salt-dusted rim', 'rasher of bacon'] },
    { type: 'bitter', ingredients: ['shake of bitters', 'splash of tonic', 'twist of lemon peel'] },
    { type: 'sweet', ingredients: ['sugar cube', 'spoonful of honey', 'splash of color'] },
    { type: 'fruity', ingredients: ['slice of orange', 'dash of cassis', 'cherry on top'] }
  ];
  // TODO: Implement
}

var Pantry = function(ingredients) {
};

$(function() {
  var questions = createQuestions();
  var form = $('#js-form');
  for (var i = 0; i < questions.length; i++) {
    form.append(questions[i].createElement());
  }
});
