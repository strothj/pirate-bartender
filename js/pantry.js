class Pantry {
  constructor(ingredients) {
    this.ingredients = ingredients;
  }

  // Returns a random ingredient of the specified type.
  randomIngredient(type) {
    const ingredients = this.ingredients[type];
    return ingredients[Math.floor(Math.random() * (ingredients.length))];
  }
}

module.exports = Pantry;
