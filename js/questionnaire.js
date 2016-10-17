const $ = require('jquery');

// Creates the user interface which asks for the user's drink preferences.
class Questionnaire {
  constructor(formElement, questions) {
    questions.forEach(question => formElement.append(question.element));

    const submitElement = $('<buttom class="submit-button" type="submit">Make my drink!</button>');
    formElement.append(submitElement);

    submitElement.click((event) => {
      event.preventDefault();
      const preferences = [];
      questions.forEach((question) => {
        if (question.wants()) {
          preferences.push(question.ingredientType);
        }
      });
      this.submit(preferences);
    });
  }
}

module.exports = Questionnaire;
