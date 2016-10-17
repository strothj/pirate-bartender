const $ = require('jquery');
const Question = require('./question');
const Ingredient = require('./ingredient');
const Questionnaire = require('./questionnaire');
const Pantry = require('./pantry');
const Bartender = require('./bartender');

// Returns an array of Questions.
function createQuestions() {
  return [
    new Question('Do ye like yer drinks strong?', 'strong'),
    new Question('Do ye like it with a salty tang?', 'salty'),
    new Question('Are ye a lubber who likes it bitter?', 'bitter'),
    new Question('Would ye like a bit of sweetness with yer poison?', 'sweet'),
    new Question('Are ye one for a fruity finish?', 'fruity'),
  ];
}

// Returns an object containing Ingredients grouped by type.
function createIngredients() {
  const groupedIngredients = ingredients => ingredients.map(item => new Ingredient(item));

  return {
    strong: groupedIngredients(['glug of rum', 'slug of whisky', 'splash of gin']),
    salty: groupedIngredients(['olive on a stick', 'salt-dusted rim', 'rasher of bacon']),
    bitter: groupedIngredients(['shake of bitters', 'splash of tonic', 'twist of lemon peel']),
    sweet: groupedIngredients(['sugar cube', 'spoonful of honey', 'splash of color']),
    fruity: groupedIngredients(['slice of orange', 'dash of cassis', 'cherry on top']),
  };
}

$(() => {
  const questions = createQuestions();
  const ingredients = createIngredients();
  const pantry = new Pantry(ingredients);
  const bartender = new Bartender(pantry);
  const questionnaire = new Questionnaire($('#js-form'), questions);

  questionnaire.submit = (preferences) => {
    const drink = bartender.createDrink(preferences);
    $('#js-drink-header').removeClass('hidden');
    $('#js-drink').text(drink);
    $('html, body').scrollTop($(document).height());
  };
});
