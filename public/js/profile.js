

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
  get('/api/user', {_id: u}, function(userLoad) {
  	console.log(userLoad);
    titleDiv.innerHTML = userLoad.name;
    descDiv.innerHTML = userLoad.bio;
  });
}

const profileId = window.location.search.substring(1);
popProfile(profileId);