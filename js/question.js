'use strict';

var $ = require('jquery');

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

Question.prototype.template = '<fieldset class="question-field">' +
  '<legend class="question-field__question">${question}</legend>' +
  '<label for="${id}-yes">Yes</label>' +
  '<input class="question-field__input" checked id="${id}-yes" type="radio" name="${id}"' +
  '<label for="${id}-no">No</label>' +
  '<input class="question-field__input" id="${id}-no" type="radio" name="${id}">' +
'</fieldset>';

// Returns a boolean. Returns true if the user wants the ingredient type.
Question.prototype.wants = function() {
  return this.yesElement.prop('checked');
};

module.exports = Question;
