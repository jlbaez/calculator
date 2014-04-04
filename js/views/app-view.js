var app = app || {};
(function(){
	app.AppView = Backbone.View.extend({
		el: document.getElementById('calculator'),
		events: {
			'click .pad': 'addInput',
		},
		initialize: function(){
			this.$input = document.getElementById('input');
			_.bindAll(this, 'render');
			this.render();
		},
		render: function(){
			//$(this.el).append("<ul> <li>hello world</li> </ul>");
		},
		addInput: function(e){
			console.log(e);
			console.log(this);
		}
	});
})(jQuery);
