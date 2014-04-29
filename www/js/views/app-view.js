var app = app || {};
var decimal = false,
	pararen = 0;
(function(){
	app.AppView = Backbone.View.extend({
		el: document.getElementById('calculator'),
		events: {
			'click .pad': 'addInput',
			'click #clear': 'clearInput',
			'click #equals': 'solveEquation',
			'keypress #input': 'cancel'
		},
		initialize: function(){
			this.$input = document.getElementById('input');
			Hammer(document.getElementById("buttons")).on("dragleft dragright swiperight swipeleft", function (ev){
				switch(ev.type)
				{
					case "dragleft":
					case "swipeleft":
						document.getElementById("complex").style.display="block";
						document.getElementById("simple").style.display="none";
						break;
					case "dragright":
					case "swiperight":
						document.getElementById("complex").style.display="none";
						document.getElementById("simple").style.display="block";
						break;
				}
			});
		},
		addInput: function(e){
			var array = ['*', '/', '+'],
				functions = ['sin', 'cos', 'tan', 'ln', 'log'],
				value = e.currentTarget.value,
				lastchar = this.$input.value.charAt(this.$input.value.length - 1);
			if(this.$input.value === "" && array.indexOf(value) === -1)
			{
				if(value !== ')')
				{
					this.$input.value += value;
					if(functions.indexOf(value) !== -1)
					{
						this.$input.value += "(";
						pararen += 1;
					}
					if(value === "(")
					{
						pararen += 1;
					}
				}
			}
			else if(this.$input.value !== "")
			{
				if(value !== '.' || lastchar !== '.')
				{
					if((array.indexOf(value) === -1 || array.indexOf(lastchar) === -1))
					{
						if(value === '.')
						{
							if(!decimal)
							{
								this.$input.value += value;
								decimal = true;
							}
						}
						else
						{
							if(value === ")" && pararen === 0)
							{
								return;
							}
							else if(value === ")")
							{
								pararen += -1;
							}
							this.$input.value += value;
							if(functions.indexOf(value) !== -1)
							{
								this.$input.value += "(";
								pararen += 1;
							}
							if(value === "(")
							{
								pararen += 1;
							}
							if(array.indexOf(value) !== -1 || value === '-')
							{
								decimal = false;
							}
						}
					}
				}
			}
		},
		clearInput: function(){
			this.$input.value = "";
			decimal = false;
		},
		solveEquation: function() {
			if(pararen === 0)
			{
				if(navigator.notification !== undefined)
				{
					navigator.notification.vibrate(500);
				}
				this.$input.value = eval(this.$input.value);
			}
		},
		cancel: function(e) {
			e.preventDefault();
			console.log("here");
		}
	});
})(jQuery);
