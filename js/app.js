'use strict';

// Returns an object which represents a user's preference for an ingredient.
var Question = function(question, ingredientType) {
  this.ingredientType = ingredientType;

  // Create a jQuery element using the Question template.
  this.element = $(this.template
    .replace(/\$\{question\}/g, question)
    .replace(/\$\{id\}/g, 'js-answer-' + this.ingredientType)
  );
  // Store the element for the yes radio input so it can be checked later.
  this.yesElement = this.element.find('#js-answer-' + this.ingredientType + '-yes');
};

Question.prototype.template = '<fieldset>' +
  '<legend>${question}</legend>' +
  '<label for="${id}-yes">Yes</label>' +
  '<input checked id="${id}-yes" type="radio" name="${id}"' +
  '<label for="${id}-no">No</label>' +
  '<input id="${id}-no" type="radio" name="${id}">' +
'</fieldset>';

// Returns a boolean. Returns true if the user wants the ingredient type.
Question.prototype.wants = function() {
  return this.yesElement.prop('checked');
};

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

var Ingredient = function(name) {
  this.name = name;
};

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

// Creates the user interface which asks for the user's drink preferences.
var Questionnaire = function(formElement, questions) {
  var submitElement = $('<buttom type="submit">Make my drink!</button>');
  for (var i = 0; i < questions.length; i++) {
    formElement.append(questions[i].element);
  }
  formElement.append(submitElement);

  var _this = this; // capture this so it can be used in the jQuery handler below.
  submitElement.click(function(event) {
    event.preventDefault();
    var preferences = [];
    for (i = 0; i < questions.length; i++) {
      if (questions[i].wants()) {
        preferences.push(questions[i].ingredientType);
      }
    }
    _this.submit(preferences);
  });
};

var Pantry = function(ingredients) {
  this.ingredients = ingredients;
};

$(function() {
  var questions = createQuestions();
  var ingredients = createIngredients();
  var pantry = new Pantry(ingredients);
  var questionnaire = new Questionnaire($('#js-form'), questions);
  questionnaire.submit = function(preferences) {
    console.log(preferences);
    // TODO: Ask bartender to create drink here.
  };
});
