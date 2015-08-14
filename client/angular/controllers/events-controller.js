myApp.controller('eventsController', function($scope, eventFactory, $routeParams){
	$scope.events = []; 
	$scope.items = [];
	$scope.id = $routeParams.id;
	updateEvents();

	function updateEvents(){
		eventFactory.getEvents(function(output){
			$scope.events = output;
			var pagesShown = 1;
			var pageSize = 2;
			$scope.paginationLimit = function() {
				return pageSize * pagesShown;
			};
			$scope.hasMoreToShow = function() {
				return pagesShown < ($scope.events.length / pageSize);
			};
			$scope.showMore = function() {
				pagesShown = pagesShown + 1;
			};
		})
	}
	
	$scope.addItem = function(){
		$scope.items.push({
			name: $scope.newItem.name,
			quantity: $scope.newItem.quantity
		});
		$scope.newItem.quantity = "";
		$scope.newItem.name = "";
	}

	$scope.addItem2 = function(id){
		$scope.events[id].items.push({
			name: $scope.newItem.name,
			quantity: $scope.newItem.quantity
		});
		$scope.newItem.quantity = "";
		$scope.newItem.name = "";
	}

	$scope.addEvent = function(items){
		$scope.newEvent.items = items;
		eventFactory.addEvent($scope.newEvent, function(output){
			updateEvents();
			$scope.newEvent = {};
		})
	}

	$scope.updateEvent = function(id){
		var newEvent = {
			title: $scope.events[id].title,
			description: $scope.events[id].description,
			date: $scope.events[id].date,
			time: $scope.events[id].time,
			_id: $scope.events[id]._id,
			items: $scope.events[id].items
		}
		eventFactory.updateEvent(newEvent, function(output){
			updateEvents();
			newEvent = {};
		})
	}

	$scope.removeNewItem = function(id){
		$scope.items.splice(id,1);
	}

	$scope.removeItem = function(id){
		$scope.events[$scope.id].items.splice(id,1);
	}
})