
function popRecipe(recipe) {
  console.log("populating");
  const titleDiv = document.getElementById('title');
  const descDiv = document.getElementById('description')
  const ingDiv = document.getElementById('ingredients')
  const stepDiv = document.getElementById('steps')
  const edit = document.getElementById('editbutton')
  const fork = document.getElementById('fork-card')
  const authorLink = document.getElementById('author')
  get('/api/recipes', {_id: recipe}, function(recipeLoad) {
    console.log(recipeLoad);
    if (recipeLoad.forks.length !==0){
    console.log("forks here");
    console.log();
    forktitle = document.createElement('div');
    forktitle.className = 'title-text';
    forktitle.innerHTML = "forks";
    fork.appendChild(forktitle);
    makeForks(fork, recipeLoad, false);
  } else {
    console.log("no forks");
    fork.remove();
  }
    titleDiv.innerHTML = recipeLoad.name;
    authorLink.innerHTML = recipeLoad.authorname;
    authorLink.setAttribute('href', '/u/profile?' + recipeLoad.author);
    descDiv.innerHTML= recipeLoad.description;
    ingDiv.innerHTML = recipeLoad.ingredients;
    stepDiv.innerHTML = recipeLoad.steps;
  });
  edit.href ="/edit"+"?"+recipe;
}


function makeForks(parentElem, recipeJSON, show){
  const forkCard = document.createElement('ul');
  forkCard.setAttribute('id', recipeJSON._id);
  //forkCard.className = 'view-container';
  parentElem.appendChild(forkCard);

  if (show){
  const cardBody = document.createElement('div');
  cardBody.className = 'section';
  forkCard.appendChild(cardBody);

  const contentSpan = document.createElement('a');
  contentSpan.className = 'card-text';
  contentSpan.style.fontWeight = 'bold';
  contentSpan.innerHTML = (recipeJSON.name+ ' ');
  contentSpan.setAttribute('href', '/view?' + recipeJSON._id);
  cardBody.appendChild(contentSpan);
  
  const creatorSpan = document.createElement('a');
  creatorSpan.className = 'card-text';
  creatorSpan.innerHTML = recipeJSON.authorname;
  creatorSpan.setAttribute('href', '/u/profile?' + recipeJSON.author);
  cardBody.appendChild(creatorSpan);
  }
  get('/api/recipes', {_id: recipeJSON._id}, function(recipeLoad) {
    console.log(recipeLoad);    
    if (recipeLoad.forks!==[]){
      for (i=0;i<recipeJSON.forks.length;i++){
        forkCard.appendChild(makeForks(forkCard, recipeLoad.forks[i], true));
      }
    }
  });
  return forkCard;
}
const recipeId = window.location.search.substring(1);
popRecipe(recipeId);
// let submit = document.getElementById("recipesubmit")
// submit.addEventListener("click", submitRecipeEdit);
