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
  	});
}

let subscribeButton = document.getElementById("subscribe-button");
subscribeButton.addEventListener("click", subscribe);
let unsubscribeButton = document.getElementById("unsubscribe-button");
unsubscribeButton.addEventListener("clicke", unsubscribe);