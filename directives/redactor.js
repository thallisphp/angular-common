/*
// http://stackoverflow.com/a/16428909/1069899

HTML View:
<div ng-controller="PostCtrl">
    <form ng-submit="addPost()">
        <textarea ng-model="newPost.content" redactor required></textarea>
        <br />
        <input type="submit" value="add post">
    </form>

    {{newPost.content}} <!-- This outputs the raw html with tags -->
    <br />
    <div ng-bind-html-unsafe="newPost.content"></div> <!-- This outputs the html -->
</div>

Controller function:
$scope.addPost = function() {
  var post;
  post = Post.save($scope.newPost);
  console.log(post);
  $scope.posts.unshift(post);
  return $scope.newPost.content = "<p>Add a new post...</p>";
};
*/
directives.directive("redactor", function() {
  return {
    require: "?ngModel",
    link: function($scope, elem, attrs, controller) {
      return controller.$render = function() {
        elem.redactor({
          keyupCallback: function() {
            return $scope.$apply(controller.$setViewValue(elem.getCode()));
          },
          execCommandCallback: function() {
            return $scope.$apply(controller.$setViewValue(elem.getCode()));
          },
        });
        return elem.setCode(controller.$viewValue);
      };
    }
  };
});
