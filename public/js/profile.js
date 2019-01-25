	
function storyDOMObject(storyJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', storyJSON._id);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  const contentSpan = document.createElement('a');
  contentSpan.className = 'story-content card-title';
  contentSpan.innerHTML = storyJSON.name;
  contentSpan.setAttribute('href', '/view?' + storyJSON._id);
  cardBody.appendChild(contentSpan);

  // const cardFooter = document.createElement('div');
  // cardFooter.className = 'card-footer';
  // card.appendChild(cardFooter);

  return card;
}


function submitNewProfile() {
  // TO BE IMPLEMENTED:
  // submit the story to our newly implemented database
  console.log("submitting");
  const photo = document.getElementById('new-photo').value;
  data = {
    pic: photo,
    u : window.location.search.substring(1)
  }
  post('/api/newpropic', photo);
}

// let submit = document.getElementById("profile-image")
// submit.addEventListener("click", submitNewProfile);


function popProfile(u) {
  console.log("populating");
  const titleDiv = document.getElementById('name');
  const descDiv = document.getElementById('bio');
  const recipeCard =document.getElementById('recipes');
  if (u !== ""){
    get('/api/user', {_id: u}, function(userLoad) {
    console.log("getting specific user from url");
  	console.log(userLoad);
    titleDiv.innerHTML = userLoad.name;
    descDiv.innerHTML = userLoad.bio;
  });
  	
	} else {

		get('/api/whoami', {}, function(user) {
		    console.log(user._id);
		    if (user._id !== undefined){
		    	titleDiv.innerHTML = user.name;
		    	descDiv.innerHTML = user.bio;
		    	if (user.recipes !== []){
		    		console.log(user.recipes);
		    		for (let i = 0; i < user.recipes.length; i++) {
     					const currentStory = get('/api/recipes', {_id: user.recipes[i]}, function(currentStory) {
      					recipeCard.prepend(storyDOMObject(currentStory));
      						});
    					}
		    		}
		  
		    }else {
				window.location.replace('/auth/google');
			}

		   
		 });
		
	} 


}
const profileId = window.location.search.substring(1);
window.onload = function(event){(popProfile(profileId));}