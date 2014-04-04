var app = app || {};
(function(){
	app.AppView = Backbone.View.extend({
		el: document.getElementById('calculator'),
		events: {
			'click .pad': 'addInput',
			'click #clear': 'clearInput',
			'click #equals': 'solveEquation'
		},
		initialize: function(){
			this.$input = document.getElementById('input');
		},
		addInput: function(e){
			this.$input.value += e.currentTarget.value;
		},
		clearInput: function(){
			this.$input.value = "";
		},
		solveEquation: function() {
			console.log("here");
		}
	});
})(jQuery);
