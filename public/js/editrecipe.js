
function popRecipe(recipe) {
  console.log("populating");
  const titleDiv = document.getElementById('recipetitle');
  const descDiv = document.getElementById('recipedescription')
  const ingDiv = document.getElementById('ingredients')
  const stepDiv = document.getElementById('steps')
  get('/api/recipes', {_id: recipe}, function(recipeLoad) {
    console.log(recipeLoad);
    titleDiv.value = recipeLoad.name;
    descDiv.value = recipeLoad.description;
    ingDiv.value = recipeLoad.ingredients;
    stepDiv.value = recipeLoad.steps;
  });
}


function submitRecipeEdit() {
  // TO BE IMPLEMENTED:
  // submit the story to our newly implemented database
  const parent = window.location.search.substring(1);
  const rtitle = document.getElementById('recipetitle').value;
  const rdesc = document.getElementById('recipedescription').value;
  const ringr = document.getElementById('ingredients').value;
  const rsteps = document.getElementById('steps').value;

  const data = {
    "p" : parent,
    "rt": rtitle,
    "rd": rdesc,
    "ri": ringr,
    "rs": rsteps  };
  post('/api/editrecipe', data);
}
const recipeId = window.location.search.substring(1);
console.log(recipeId);
popRecipe(recipeId);
let submit = document.getElementById("recipesubmit")
submit.addEventListener("click", submitRecipeEdit);
