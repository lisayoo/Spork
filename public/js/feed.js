function storyDOMObject(storyJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', storyJSON._id);
  card.className = 'story card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  // const creatorSpan = document.createElement('a');
  // creatorSpan.className = 'story-creator card-title';
  // creatorSpan.innerHTML = storyJSON.creator_name;
  // creatorSpan.setAttribute('href', '/u/profile?' + storyJSON.creator_id);
  // cardBody.appendChild(creatorSpan);

  // const contentSpan = document.createElement('p');
  // contentSpan.className = 'story-content card-text';
  // contentSpan.innerHTML = storyJSON.content;
  // cardBody.appendChild(contentSpan);

  // const cardFooter = document.createElement('div');
  // cardFooter.className = 'card-footer';
  // card.appendChild(cardFooter);

  // const commentsDiv = document.createElement('div');
  // commentsDiv.setAttribute('id', storyJSON._id + '-comments');
  // commentsDiv.className = 'story-comments';
  // cardFooter.appendChild(commentsDiv);

  return card;
}


function renderStories(user) {
  // if (user._id !== undefined)
  //   document.getElementById('new-story').appendChild(newStoryDOMObject());

  const storiesDiv = document.getElementById('stories');
  get('/api/feed', {}, function(storiesArr) {
    for (let i = 0; i < storiesArr.length; i++) {
      const currentStory = storiesArr[i];
      storiesDiv.prepend(storyDOMObject(currentStory, user));
    }
  });
}
