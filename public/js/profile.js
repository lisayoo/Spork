
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


function submitNewProfile(user) {
  // TO BE IMPLEMENTED:
  // submit the story to our newly implemented database
  const parent = user;
  const name = document.getElementById('editdisplayname').value;
  const bio = document.getElementById('editbio').value;

  const data = {
    "p" : parent,
    "n": name,
    "b": bio,
     };
    console.log(data);
  post('/api/editprofile', data);
}

// let submit = document.getElementById("profile-image")
// submit.addEventListener("click", submitNewProfile);


function popProfile(u) {
  console.log("populating");
  const titleDiv = document.getElementById('name');
  const descDiv = document.getElementById('bio');
  const recipeCard =document.getElementById('recipes');
  if (u !== ""){
  	currentUser = "";
  	get('/api/whoami', {}, function(user) {
  		currentUser = user;
  	});
    get('/api/user', {_id: u}, function(user) {
    console.log("getting specific user from url");
    titleDiv.innerHTML = user.name;
    descDiv.innerHTML = user.bio;
    if (user.recipes !== []){
      recipeCard.innerHTML = "";
      console.log(user.recipes);
      for (let i = 0; i < user.recipes.length; i++) {
        const currentStory = get('/api/recipes', {_id: user.recipes[i]}, function(currentStory) {
          recipeCard.prepend(storyDOMObject(currentStory));
	            });
	        }
	      }
	  if (currentUser !== user){
	  	(document.getElementById('editprofilebutton')).remove();
	  	(document.getElementById('modal')).remove();
	  } else {
	  	document.getElementById('profilesubmit').addEventListener('click', function(event){
	  		submitNewProfile(user);
	  		}
	  		);
	  	document.getElementById('editdisplayname').innerHTML = user.name;
	  	document.getElementById('editbio').innerHTML = user.bio;
	  }

	  

	});

  	
	} else {

		get('/api/whoami', {}, function(user) {
        console.log("USER'S NAME IS");
		    console.log(user.name);
		    if (user._id !== undefined){
		    	titleDiv.innerHTML = user.name;
		    	descDiv.innerHTML = user.bio;
		    	if (user.recipes !== []){
           			 recipeCard.innerHTML = "";
		    		console.log(user.recipes);
		    		for (let i = 0; i < user.recipes.length; i++) {
     					const currentStory = get('/api/recipes', {_id: user.recipes[i]}, function(currentStory) {
      					recipeCard.prepend(storyDOMObject(currentStory));
      						});
    					}
		    		}
		    	document.getElementById('profilesubmit').addEventListener('click', function(event){
		  			submitNewProfile(user);
		  		});	  	
		  		document.getElementById('editdisplayname').innerHTML = user.name;
	  			document.getElementById('editbio').innerHTML = user.bio;
		    
		    } else {
				window.location.replace('/auth/google');
			}

		   
		 });
		
	} 


}
const profileId = window.location.search.substring(1);
window.onload = function(event){(popProfile(profileId));}