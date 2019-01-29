

function submitNewRecipe(user) {
  // TO BE IMPLEMENTED:
  // submit the story to our newly implemented database
  console.log("submitting");
  const rtitle = document.getElementById('recipetitle').value;
  const rdesc = document.getElementById('recipedescription').value;
  const ringr = document.getElementById('ingredients').value;
  const rsteps = document.getElementById('steps').value;

  const data = {
    "rt": rtitle,
    "rd": rdesc,
    "ri": ringr,
    "rs": rsteps  };
  console.log(data);
  post('/api/newrecipe', data);
  window.location.href = '/feed';
}

function redirectHome(){
  console.log('redirecting');
  window.location.href = '/feed';
}
// let submit = document.getElementById("recipesubmit")
// submit.addEventListener("click", submitNewRecipe);
