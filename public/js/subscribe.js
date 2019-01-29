function subscribe() {
	console.log('handling a subscription');
	follower = '';
  	get('/api/whoami', {}, function(user) {
  		follower = user._id;
		const subscription = window.location.search.substring(1);
		console.log('person that is getting followed' + subscription);
		console.log('person that is doing the following' + follower);

		const data = {
			'follower' :follower,
			'id' : subscription
		};
		post('/api/subscribe', data);
  	});
}

function unsubscribe() {
	console.log('calling unsubscribe function');
	get('/api/whoami', {}, function(user) {
  		follower = user._id;
		const subscription = window.location.search.substring(1);
		console.log('person that is getting followed' + subscription);
		console.log('person that is doing the following' + follower);

		const data = {
			'follower' :follower,
			'id' : subscription
		};
		post('/api/unsubscribe', data);
		// post('/api/unsubscribe2', data);
  	});
}
function popSubs(u) {
	if (u !== ""){
	 get('/api/whoami', {}, function(currentUser) {
		    get('/api/user', {_id: u}, function(user) {
		    	if (user.name !== undefined && currentUser.name  !== undefined){
		    		console.log('profile of: '+ user.name);
		    		console.log('accessed by: ' + currentUser.name);
		      if (user._id in currentUser.following) {
		        console.log('i am following this person');
		        const unsubButton = document.createElement('a');
		        unsubButton.setAttribute('href', '#');
		        unsubButton.className = 'big-button follow-button';
		        unsubButton.innerHTML = 'unsubscribe';
		        unsubButton.setAttribute('id', 'unsubscribe-button');
		        const subDiv = document.getElementById('buttons');
		        subDiv.appendChild(unsubButton);
		        let unsubscribeButton = document.getElementById("unsubscribe-button");
				unsubscribeButton.addEventListener("click", unsubscribe);
		        
		        // <a id = 'unsubscribe-button' class="big-button follow-button" href='#' onClick="window.location.reload()"> unsubscribe </a>
		      }
		      else {
		        console.log('i am not following this person');
		        const subButton = document.createElement('a');
		        subButton.setAttribute('href', '#');
		        subButton.className = 'big-button follow-button';
		        subButton.innerHTML = 'subscribe';
		        subButton.setAttribute('id', 'subscribe-button');
		        const subDiv = document.getElementById('buttons');
		        subDiv.appendChild(subButton);
				let subscribeButton = document.getElementById("subscribe-button");
				subscribeButton.addEventListener("click", subscribe);
		        // <a id ='subscribe-button' class="big-button follow-button" href='#' onClick="window.location.reload()"> subscribe </a> 

		      }
		  }
		   });
		    });

	}
}



//const profileId = window.location.search.substring(1);
console.log(profileId);
window.onload = function(event){
	(popProfile(profileId));
	(popSubs(profileId));
}
// unsubscribeButton.addEventListener("click", unsubscribe2);;