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
  creatorSpan.innerHTML = storyJSON.author;
  creatorSpan.setAttribute('href', '/u/profile?' + storyJSON.author);
  console.log('this is ok');
  cardBody.appendChild(creatorSpan);

  // const cardFooter = document.createElement('div');
  // cardFooter.className = 'card-footer';
  // card.appendChild(cardFooter);

  return card;
}


function renderResults() {
  console.log('calling renderResults');
  console.log(document.getElementById('search'));
  const keyword = document.getElementById('search');
  console.log('keyword' + keyword);
  const resultsDiv = document.getElementById('results');
  console.log('made resultsDiv');

  get('/api/search', { keyword }, function(resultsArr) {
    console.log('successful get request');

    for (let i = 0; i < resultsArr.length; i++) {
      const currentStory = resultsArr[i];
      resultsDiv.prepend(storyDOMObject(currentStory));
    }
  });
}

renderResults();


