
function submitNewRecipe() {
  // TO BE IMPLEMENTED:
  // submit the story to our newly implemented database
  console.log("submitting");
  const rtitle = document.getElementById('recipetitle');
  const rdesc = document.getElementById('recipedescriptions');
  const ringr = document.getElementById('recipeingredients');
  const rsteps = document.getElementById('recipesteps');

  const data = {
    "rt": rtitle,
    "rd": rdesc,
    "ri": ringr,
    "rs": rsteps  };

  post('/api/newrecipe', data);
}

document.addEventListener("recipe-submit", submitNewRecipe());