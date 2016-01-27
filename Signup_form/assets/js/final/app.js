var app = angular.module("signupApp", ['ngAnimate']);
app.controller('signupCtrl', function ($scope, $http, $timeout){

})

app.directive('signup', function($timeout, $document){
	return{
		restrict: 'C',
		templateUrl: 'templates/directives/signup.html',
		link: function (scope, element){

			scope.brand_name = "Chicago Redbacks";
			scope.menuitems = ['FAQ','About', 'Sign Up'];
			scope.InfoMessage = "I need your information";

			scope.menuView = 'Sign Up';
			scope.anim = false;
			scope.loading = false;

			scope.submitted = false;

			//Function to switch the view and also alow the indicator to move to its right position
			scope.setView = function (view, index){

				//change the view name
				scope.menuView = view;

				//Find the width and position of the current clicked menu item
				var width = 10+element.find('li')[index].getBoundingClientRect().width;
				var offsetRight = $document[0].body.clientWidth - element.find('li')[index].getBoundingClientRect().right - 5;

				//grab the indicator
				var indicator = document.querySelector('.indicator');
				var indicatorElem = angular.element(indicator);

				//and reposition
				indicatorElem.css({
					'width' : width + 'px',
					'transform' : 'translateX(-' + offsetRight + 'px)'
				});
			};

			var getFirstWord = function(word){
				var arr = word.split(" ", 2);
				return arr[0];
			};

			scope.setInfo = function (type, text){
				scope.fadeOut = true;

				$timeout(function(){
					if(text){
						if(type == 'name'){
							var name = getFirstWord(text);
							scope.InfoMessage = "Hi " + name + ", nice to meet you.";
						}
						if(type == 'city'){
							scope.InfoMessage = "So " + text + " huh.";
						}
						if(type == 'email'){
							scope.InfoMessage = "Cool. Now just press agree.";
						}
						if(type == 'submit'){
							scope.InfoMessage = "I'm working on it.";
						}
						if(type == 'completed'){
							scope.InfoMessage = "Thanks for the cash, " + text + "!";
						}
					}
					else{
						scope.InfoMessage = "Uhh... Thats not right.";
					}
					scope.fadeOut = false;
				}, 200);
				
			};

			//Submit the form.
			scope.submitForm = function (formData, valid){

				scope.submitted = true;

				//check if the form is valid.
				if(valid){
					//set the top info to something apropriate.
					scope.setInfo('submit', 'thanks');
					scope.loading = true;

					//Send your form trough rest API.
					//using a timeout now to simulate the effect of the loader.
					$timeout(function(){
						scope.loading = false;
						scope.setInfo('completed', 'bozo');
					},2000);

				}
				else{
					//if not valid tell the information to display it.
					scope.setInfo('submit', undefined);
				}
			}

			//wait for the view to full load.
			$timeout(function(){
				//set the current view.
				scope.setView('Sign Up', scope.menuitems.length-1);
				//and alow animation afterwards.
				scope.anim = true;
			},40);
		}
	};	
});