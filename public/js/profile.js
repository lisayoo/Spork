
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

function newProPic(){

  const photograph = document.getElementById('image');
  console.log("PHOTOGRAPH INFO");
  console.log(photograph.files);
  console.log(photograph.value);

  const data = {
    'pic' : photograph.value
  };
  // cloudinary.uploader.upload(req.body.pic.name, function(result){
  //   User.findById(req.user._id, function(err, user) {
  //     user.set({image_url: result.url});
  //     user.save();
  //     console.log(result.url);
  //   });
  // });
  window.location = '/u/profile';
  //post('/api/imagetest', data);
}

// let submit = document.getElementById("profile-image")
// submit.addEventListener("click", submitNewProfile);


function popProfile(u) {
  console.log("populating");
  const titleDiv = document.getElementById('name');
  const descDiv = document.getElementById('bio');
  const recipeCard =document.getElementById('recipes');
  const profileDiv = document.getElementById('profile-image');
  const profilePic = document.createElement("img");
  console.log(profilePic);

  const following = document.getElementById('following');
  const followers = document.getElementById('followers');

  if (u !== ""){
  	let currentUser = "";
  	get('/api/whoami', {}, function(user) {
  		currentUser = user;
  	});
    get('/api/user', {_id: u}, function(user) {
    console.log("getting specific user from url");
    titleDiv.innerHTML = user.name;
    descDiv.innerHTML = user.bio;
    following.setAttribute('href', '/following?' + user._id);
    followers.setAttribute('href', '/followers?' + user._id);
    if (user.image_url !== ''){
      // console.log('hihihihihihihihi');

      // profilePic.setAttribute('src', user.image_url);
      //test
      profilePic.setAttribute('src', user.image_url);
      profilePic.className = "profile-image"
      profileDiv.appendChild(profilePic);
    }
      //default profile imageboop
    else{
      const defaultDiv = document.createElement('div');
      profileDiv.appendChild(defaultDiv);
    }
    if (user.recipes !== []){
      recipeCard.innerHTML = "";
      console.log(user.recipes);
      for (let i = 0; i < user.recipes.length; i++) {
        const currentStory = get('/api/recipes', {_id: user.recipes[i]}, function(currentStory) {
          recipeCard.prepend(storyDOMObject(currentStory));
	            });
	        }
	      }
// <<<<<<< HEAD
// 	  if (currentUser._id !== user._id){
//       console.log('not same user');
// 	  	document.getElementById('editprofilebutton').remove();
// 	  	document.getElementById('modal').remove();
//       if (user._id in currentUser.following) {
//         document.getElementById('subscribe-button').remove();
//       }
//       else {
//         document.getElementById('unsubscribe-button').remove();
// =======
	  if (currentUser !== user){
	  	(document.getElementById('editprofilebutton')).remove();
	  	(document.getElementById('modal')).remove();
      (document.getElementById('picmodal')).remove();


      
      const profileContainer = document.getElementById('profile-container');
      const subscribe = document.createElement('a');
// <<<<<<< HEAD


// 	  } else {
//       document.getElementById('subscribe-button').remove();
//       document.getElementById('unsubscribe-button').remove();
// 	  	// document.getElementById('profilesubmit').addEventListener('click', function(event){
// 	  	// 	submitNewProfile(user);
// 	  	// 	}
// 	  	// );
// =======

	  } else {
	  	document.getElementById('profilesubmit').addEventListener('click', function(event){
	  		submitNewProfile(user);
	  		}
	  	);
// >>>>>>> 0c0082735d4a23d5fe7253d0af34ffabe55f8d41
	  	document.getElementById('editdisplayname').innerHTML = user.name;
	  	document.getElementById('editbio').innerHTML = user.bio;
	  }

	  

	});

  	
	} else {

		get('/api/whoami', {}, function(user) {
		    if (user._id !== undefined){
          // following.setAttribute('href', '/u/following?' + user._id);
          // followers.setAttribute('href', '/u/followers?' + user._id);
          // console.log(following.href);
          // console.log(followers.href);
              following.setAttribute('href', '/following?' + user._id);
    followers.setAttribute('href', '/followers?' + user._id);
		    	titleDiv.innerHTML = user.name;
		    	descDiv.innerHTML = user.bio;
          console.log('i am outside');
          document.getElementById('profilesubmit').addEventListener('click', function(event){
            submitNewProfile(user);
          });     
          document.getElementById('editdisplayname').value = user.name;
          document.getElementById('editbio').value= user.bio;
          if (user.image_url !== ''){
            console.log('hihihihihihihihi');
            profilePic.setAttribute('src', user.image_url);
            profilePic.className = "profile-image";
            //test

            profileDiv.appendChild(profilePic);
          }
          //default profile image
          else{
            console.log('this is logical i should be here');
            const defaultDiv = document.createElement('div');
            defaultDiv.className = 'face';
            profileDiv.appendChild(defaultDiv);
          }

          // document.getElementById('profile-image').appendChild(profilePic);
		    	if (user.recipes !== []){
           			 recipeCard.innerHTML = "";
		    		console.log('hi'+user.recipes);
		    		for (let i = 0; i < user.recipes.length; i++) {
     					const currentStory = get('/api/recipes', {_id: user.recipes[i]}, function(currentStory) {
      					recipeCard.prepend(storyDOMObject(currentStory));
      						});
    					}
		    		}

		    
		    } else {
				window.location.replace('/auth/google');
			}

		   
		 });
		
	} 


}

const profileId = window.location.search.substring(1);
profilePic = document.getElementById('photo-submit');
      document.getElementById('photo-submit').addEventListener('click', function(event){
        document.getElementById('picmodal').style.display = "none";
   }
  );
// window.onload = function(event){(popProfile(profileId));}