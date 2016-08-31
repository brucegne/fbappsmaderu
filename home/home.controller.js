app.controller('HomeCtrl', ['$scope', '$firebaseArray',
	function($scope, $firebaseArray){
		var ref = firebase.database().ref();
	  blogref = ref.child('blog/posts');
	var postsArr = $firebaseArray(blogref);
	$scope.posts = postsArr;
}]);

app.controller('PostCtrl', ['$scope', function($scope){
	var ref = firebase.database().ref();
  blogref = ref.child('blog/posts');
	var query = blogref.orderByChild('postID').equalTo($scope.$stateParams.postID);
	query.once('value', function(snapshot){
		snapshot.forEach(function(child){
			$scope.post = child.val();
			$scope.$apply();
		})
	})
}])
