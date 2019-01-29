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


function renderStories(user) {
  console.log('calling renderStories');
  const storiesDiv = document.getElementById('stories');
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
  get('/api/whoami', {}, function(user) {
    renderStories(user);
  });
}

main();