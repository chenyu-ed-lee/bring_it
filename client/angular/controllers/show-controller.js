myApp.controller('showController', function($scope, eventFactory, $routeParams, $timeout){
	$scope.events = []; 
	$scope.items = [];
	$scope.id = $routeParams.id;
	$scope.itemClaim = {};
	updateEvents();

	$scope.turnOn = function(item){
		for (var i in $scope.events[$scope.id].items){
			if ($scope.events[$scope.id].items[i].name == item){
				$scope.events[$scope.id].items[i].truth = true;
			}
		};
	}

	$scope.turnOff = function(item){
		for (var i in $scope.events[$scope.id].items){
			if ($scope.events[$scope.id].items[i].name == item){
				$scope.events[$scope.id].items[i].truth = false;
			}
		};
	}

	$scope.claimItem = function(item,id){
		for (var i in $scope.events[$scope.id].items){
			if ($scope.events[$scope.id].items[i].name == item){
				if (typeof $scope.events[$scope.id].items[i].claims == 'undefined'){
					$scope.events[$scope.id].items[i].claims = [];
				}
				$scope.events[$scope.id].items[i].claims.push($scope.itemClaim);
				// update in database here... REMEMBER
				eventFactory.claimItem($scope.events[$scope.id]._id, $scope.events[$scope.id].items)
				$scope.events[$scope.id].items[i].truth = false;		
				$scope.itemClaim = {};
			}
		}
		updateEvents();
		var length = $scope.events[$scope.id].items[id].claims.length -1;
	}

	function updateEvents(){
		eventFactory.getEvents(function(output){
			$scope.events = output;
			addItemArray()
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
		$scope.newEvent.items = $scope.events[id].items;
		eventFactory.updateEvent($scope.newEvent, function(output){
			updateEvents();
			$scope.newEvent = {};
		})
	}
	$scope.hasMoreItems = function(item){
		var total =0;
		for (var i in $scope.events[$scope.id].items){
			if ($scope.events[$scope.id].items[i].name == item.name){
				if (typeof $scope.events[$scope.id].items[i].claims == 'undefined'){
					return false
				} else {
					for(var j in $scope.events[$scope.id].items[i].claims){
						total+=parseInt($scope.events[$scope.id].items[i].claims[j].quantity);
					}
				}
			}
		}

		if(total>= item.quantity){
			return true;
		} else {
			return false;
		}
	}
})