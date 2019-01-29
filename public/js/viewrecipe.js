
function popRecipe(recipe) {
  console.log("populating");
  const titleDiv = document.getElementById('title');
  const descDiv = document.getElementById('description');
  const ingDiv = document.getElementById('ingredients');
  const stepDiv = document.getElementById('steps');
  const edit = document.getElementById('editbutton');
  const fork = document.getElementById('fork-card');
  const image= document.getElementById('image-card');
  const authorLink = document.getElementById('author');
  const  score= document.getElementById('score');
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
  if (recipeLoad.image_url != ''){
    img = document.createElement('img');
    img.setAttribute('src', recipeLoad.image_url);
    img.className = 'recipe-image';
    image.appendChild(img);
  } else {
    image.remove();
  }
    titleDiv.innerHTML = recipeLoad.name;
    authorLink.innerHTML = recipeLoad.authorname;
    authorLink.setAttribute('href', '/u/profile?' + recipeLoad.author);
    descDiv.innerHTML= recipeLoad.description;
    ingDiv.innerHTML = recipeLoad.ingredients;
    stepDiv.innerHTML = recipeLoad.steps;

    score.innerHTML = recipeLoad.upvotes.length - recipeLoad.downvotes.length +1;
    score.value = recipeLoad.upvotes.length - recipeLoad.downvotes.length +1;
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

function vote(type, recipeId){
  data = {
    'recipe': recipeId,
    'type': type
    }
  
  post('/api/vote', data);
}

  
  
  

const recipeId = window.location.search.substring(1);
popRecipe(recipeId);
let submitUp = document.getElementById("upvote");
submitUp.addEventListener("click", function(event){
  vote(true,recipeId);
});
let submitDown = document.getElementById("downvote");
submitDown.addEventListener("click",  function(event){
  vote(false,recipeId);
});
