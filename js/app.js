'use strict';

var Question = function(question, ingredientType) {
  this.question = question;
  this.ingredientType = ingredientType;
};

Question.prototype.template = '<fieldset>' +
  '<legend>${question}</legend>' +
  '<label for="${id}-yes">Yes</label>' +
  '<input checked id="${id}-yes" type="radio" name="${id}"' +
  '<label for="${id}-no">No</label>' +
  '<input id="${id}-no" type="radio" name="${id}">' +
'</fieldset>';

// Returns a jQuery element containing the question.
Question.prototype.createElement = function() {
  var renderedHTML = this.template
    .replace(/\$\{question\}/g, this.question)
    .replace(/\$\{id\}/g, 'js-answer-' + this.ingredientType);
  var elem = $(renderedHTML);
  this.yesElem = elem.find('#js-answer-' + this.ingredientType + '-yes');
  return elem;
};

// Returns a boolean. Returns true if the user wants the ingredient type.
Question.prototype.wants = function() {
  return this.yesElem.prop('checked');
};

// Returns an array of Questions.
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

var Ingredient = function(name) {
  this.name = name;
};

// Returns an array of objects containing Ingredients grouped by type.
function createIngredients() /* { type: string, ingredients: Ingredient[] }[] */{
  return  [
    { type: 'strong', ingredients: ['glug of rum', 'slug of whisky', 'splash of gin'] },
    { type: 'salty', ingredients: ['olive on a stick', 'salt-dusted rim', 'rasher of bacon'] },
    { type: 'bitter', ingredients: ['shake of bitters', 'splash of tonic', 'twist of lemon peel'] },
    { type: 'sweet', ingredients: ['sugar cube', 'spoonful of honey', 'splash of color'] },
    { type: 'fruity', ingredients: ['slice of orange', 'dash of cassis', 'cherry on top'] }
  ].map(function(ingredientGroup) {
    return {
      type: ingredientGroup.type,
      ingredients: ingredientGroup.ingredients.map(function(ingredient) {
        return new Ingredient(ingredient);
      })
    };
  });
}

var Questionnaire = function(questions) {
  this.questions = questions;
};

Questionnaire.prototype.render = function(formElement) {
  for (var i = 0; i < this.questions.length; i++) {
    formElement.append(this.questions[i].createElement());
  }
  var submitElem = $('<buttom type="submit">Make my drink!</button>');
  var _this = this;
  submitElem.click(function(e) {
    e.preventDefault();
    for (i = 0; i < _this.questions.length; i++) {
      console.log(_this.questions[i], _this.questions[i].wants());
    }
  });
  formElement.append(submitElem);
};

var Pantry = function(ingredients) {
  this.ingredients = ingredients;
};

$(function() {
  var questions = createQuestions();
  var ingredients = createIngredients();
  var pantry = new Pantry(ingredients);
  var questionnaire = new Questionnaire(questions);
  questionnaire.render($('#js-form'));
});
