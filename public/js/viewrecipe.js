
function popRecipe(recipe) {
  console.log("populating");
  const titleDiv = document.getElementById('title');
  const descDiv = document.getElementById('description')
  const ingDiv = document.getElementById('ingredients')
  const stepDiv = document.getElementById('steps')
  const edit = document.getElementById('editbutton')
  const authorLink = document.getElementById('author')
  get('/api/recipes', {_id: recipe}, function(recipeLoad) {
    console.log(recipeLoad);
    console.log(recipeLoad.description)
    titleDiv.innerHTML = recipeLoad.name;
    authorLink.innerHTML = recipeLoad.authorname;
    authorLink.setAttribute('href', '/u/profile?' + recipeLoad.author);
    descDiv.innerHTML= recipeLoad.description;
    ingDiv.innerHTML = recipeLoad.ingredients;
    stepDiv.innerHTML = recipeLoad.steps;
  });
  edit.href ="/edit"+"?"+recipe;
}

const recipeId = window.location.search.substring(1);
popRecipe(recipeId);
// let submit = document.getElementById("recipesubmit")
// submit.addEventListener("click", submitRecipeEdit);
