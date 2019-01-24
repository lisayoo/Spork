function storyDOMObject(storyJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', storyJSON._id);
  card.className = 'story card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  const contentSpan = document.createElement('p');
  contentSpan.className = 'story-content card-text';
  contentSpan.innerHTML = storyJSON.content;
  cardBody.appendChild(contentSpan);

  // const creatorSpan = document.createElement('a');
  // creatorSpan.className = 'story-creator card-title';
  // creatorSpan.innerHTML = storyJSON.creator_name;
  // creatorSpan.setAttribute('href', '/u/profile?' + storyJSON.creator_id);
  // cardBody.appendChild(creatorSpan);

  // const cardFooter = document.createElement('div');
  // cardFooter.className = 'card-footer';
  // card.appendChild(cardFooter);

  return card;
}


function renderStories() {
  console.log('calling renderStories');
  const storiesDiv = document.getElementById('stories');
  console.log('made storiesDiv');
  get('/api/stories', {}, function(storiesArr) {
    console.log('successful get request');
    for (let i = 0; i < storiesArr.length; i++) {
      const currentStory = storiesArr[i];
      storiesDiv.prepend(storyDOMObject(currentStory));
    }
  });
}

renderStories();


