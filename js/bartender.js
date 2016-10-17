class Bartender {
  constructor(pantry) {
    this.pantry = pantry;
  }

  // Returns a comma separated list of drink ingredients.
  createDrink(preferences) {
    const ingredients = [];
    for (const ingredientType of preferences) {
      ingredients.push(this.pantry.randomIngredient(ingredientType));
    }
    return ingredients.map(item => item.name).join(', ');
  }
}

module.exports = Bartender;
