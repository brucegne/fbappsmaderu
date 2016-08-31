app.controller('AdminCtrl', ['$scope', '$firebaseArray',
	function($scope, $firebaseArray){
		var ref = firebase.database().ref();
	  blogref = ref.child('blog/posts');
	var adminPostsArr = $firebaseArray(blogref);
	$scope.posts = adminPostsArr;

	$scope.createPost = function(){
		if($scope.data.newPostID){
			var ref = firebase.database().ref();
		  blogref = ref.child('blog/posts');
			var adminPostsArr = $firebaseArray(blogref);
			adminPostsArr.$add({
				postID: $scope.data.newPostID,
				createDate: Math.floor(Date.now()) }).then(function(newPost){
					$scope.$state.go('edit', {postKey: newPost.key()})
			});
		}
	}
    $scope.deletePost = function(post){
    	adminPostsArr.$remove(post)
    }
}])

app.controller('EditCtrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject){
//	var ref = new Firebase('https://brucegne.firebaseio.com/blog/posts/');
var ref = firebase.database().ref();
blogref = ref.child('blog/posts');
    var postObj = $firebaseObject(blogref.child($scope.$stateParams.postKey));
    postObj.$bindTo($scope, 'post');
}])
