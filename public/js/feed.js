function storyDOMObject(storyJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', storyJSON._id);
  card.className = 'story';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  const contentSpan = document.createElement('a');
  contentSpan.className = 'story-content card-title';
  contentSpan.innerHTML = storyJSON.name;
  contentSpan.setAttribute('href', '/view?' + storyJSON._id);
  cardBody.appendChild(contentSpan);

  const creatorSpan = document.createElement('a');
  creatorSpan.className = 'story-creator card-title';
  creatorSpan.innerHTML = storyJSON.authorname;
  creatorSpan.setAttribute('href', '/u/profile?' + storyJSON.author);
  cardBody.appendChild(creatorSpan);

  return card;
}


function renderStories() {
  console.log('calling renderStories');
  const storiesDiv = document.getElementById('explore');
  console.log('made storiesDiv');
  get('/api/feed', {}, function(storiesArr) {
    console.log('successful get request');
    for (let i = 0; i < storiesArr.length; i++) {
      const currentStory = storiesArr[i];
      storiesDiv.prepend(storyDOMObject(currentStory));
    }
  });
}


function renderSubStories(user) {
  console.log('calling renderStories');
  const storiesDiv = document.getElementById('subscriptions');
  console.log('made storiesDiv');
  get('/api/following', {_id: user._id}, function(followsArr) {
    for (let i = 0; i < followsArr.length; i++) {
      const currentUserId = followsArr[i];
      get('/api/user', {_id: currentUserId}, function(user) {
        const currentUser = user;
        for (let j = 0; j < currentUser.recipes.length; j++) {
          const currentRecipe = get('/api/recipes', {_id: currentUser.recipes[i]}, function(recipe) {
            storiesDiv.prepend(storyDOMObject(recipe));
              });
            }
          });
      }
  });
}


function main() {
  renderStories();
  get('/api/whoami', {}, function(user) {
    renderSubStories(user);
  });
}

main();


function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}