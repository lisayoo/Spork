var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

function recipeDOMObject(recipeJSON, user) {
  const card = document.createElement('div');
  card.setAttribute('id', recipeJSON._id);
  card.className = 'container';

  const cardBody = document.createElement('div');
  cardBody.className = 'card';
  card.appendChild(cardBody);

  const recipename = document.createElement('h3');
  authorname.innerHTML = recipeJSON.recipe.title;
  cardBody.appendChild(recipename);

  const authorname = document.createElement('p');
  authorname.innerHTML = recipeJSON.author;
  cardBody.appendChild(authorname);

  const contentSpan = document.createElement('p');
  contentSpan.className = 'story-content card-text';
  contentSpan.innerHTML = recipeJSON.recipe.steps;
  cardBody.appendChild(contentSpan);

  return card;
}


function newRecipeDOMObject() {
  const newStoryDiv = document.createElement('div');
  newStoryDiv.className = 'input-group my-3';

  // input for creating a new story
  const newStoryContent = document.createElement('input');
  newStoryContent.setAttribute('type', 'text');
  newStoryContent.setAttribute('placeholder', 'New Story');
  newStoryContent.className = 'form-control';
  newStoryContent.setAttribute('id', 'story-content-input')
  newStoryDiv.appendChild(newStoryContent);

  const newStoryButtonDiv = document.createElement('div');
  newStoryButtonDiv.className = 'input-group-append';
  newStoryDiv.appendChild(newStoryButtonDiv);

  const newStorySubmit = document.createElement('button');
  newStorySubmit.innerHTML = 'Submit';
  newStorySubmit.className = 'btn btn-outline-primary';
  // here: handler for when we submit the story
  newStorySubmit.addEventListener('click', submitStoryHandler);
  newStoryButtonDiv.appendChild(newStorySubmit);

  return newStoryDiv;
}

function submitStoryHandler() {
  // TO BE IMPLEMENTED:
  // submit the story to our newly implemented database
  const newStoryInput = document.getElementById('story-content-input');

  const data = {
    /* what are the parameters needed by our server for stories? */
  };

  post('add api endpoint here', data);
  // what is this next line doing?
  newStoryInput.value = '';
}

function renderStories(user) {
  // allows to post new stories!
  document.getElementById('new-story').appendChild(newStoryDOMObject());

  const storiesDiv = document.getElementById('stories');
  get('/api/stories', {}, function(storiesArr) {
    for (let i = 0; i < storiesArr.length; i++) {
      const currentStory = storiesArr[i];
      storiesDiv.prepend(storyDOMObject(currentStory, user));

      get('/api/comment', { 'parent': currentStory._id }, function(commentsArr) {
        for (let j = 0; j < commentsArr.length; j++) {
          const currentComment = commentsArr[j];
          const commentDiv = document.getElementById(currentComment.parent + '-comments');
          commentDiv.appendChild(commentDOMObject(currentComment));
        }
      });
    }
  });
}
