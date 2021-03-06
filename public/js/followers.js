function followerDOM(userJSON) {
	const card = document.createElement('div');
	card.setAttribute('id', userJSON._id);
	card.className = 'follower';
  
	const follower = document.createElement('a');
	follower.innerHTML = userJSON.name;
	follower.setAttribute('href', '/u/profile?' + userJSON._id);
	card.appendChild(follower);

	return card;
}

function renderFollowers(user) {
	console.log('calling renderFollowers');
	const followersDiv = document.getElementById('followers');
	const currentPage = window.location.search.substring(1);
	get('/api/followers', {_id: currentPage}, function(followersArr) {
		console.log('successful get following request');
		if (followersArr.length  !== 0) {
			for (let i=0; i<followersArr.length; i++) {
				const currentFollower = followersArr[i];
				followersDiv.prepend(followerDOM(currentFollower));
			}
		}
	});
}

function main() {
  get('/api/whoami', {}, function(user) {
    renderFollowers(user);
  });
}

main();

