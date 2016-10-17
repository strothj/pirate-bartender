'use strict';

var $ = require('jquery');

// Creates the user interface which asks for the user's drink preferences.
var Questionnaire = function(formElement, questions) {
  var submitElement = $('<buttom class="submit-button" type="submit">Make my drink!</button>');
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

module.exports = Questionnaire;
