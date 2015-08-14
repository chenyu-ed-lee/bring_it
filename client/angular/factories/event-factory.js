myApp.factory('eventFactory', function($http){
	var events = [];
	var factory = {};

	factory.getEvents = function(callback){
		$http.get('/events').success(function(output){
			events = output;
			callback(events);
		})
	}

	factory.addEvent = function(info, callback){
		$http.post('/addEvent', info).success(function(result){
			events.push({
				host_name: result.host_name,
				title: result.title,
				description: result.description, 
				date: result.date, 
				time: result.time,
				items: result.items
			});
			callback(events);
		})
	}

	factory.updateEvent = function(info, callback){
		$http.post('/updateEvent', info).success(function(result){
			$http.get('/events').success(function(output){
			events = output;
			})
			callback(events);
		})
	}

	factory.claimItem = function(id, array){
		var post = {};
		post.id = id;
		post.array = array;
		$http.post('/claimItem', post).success(function(result){
			
		})
	}

	return factory;
})