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

// FROM INPUT BOX TO MEM
    $("div#Button button#Button_btnToMem").click(function () {
        $(Button_Mem).val($(Button_UserInput).val());
        $(Button_UserInput).val(strEmpty);
        $(Button_UserInput).focus();
    });

    // FROM MEM TO INPUT BOX 
    $("div#Button button#Button_btnFromMem").click(function () {
        $(Button_UserInput).val($(Button_UserInput).val() + $(Button_Mem).val());
        $(Button_Mem).val(strEmpty);
        $(Button_UserInput).focus();
    });



// FUNCTION KEYS' EVENT HANDLER
    $("button.Button_btnCommand").click(function () {
        var inputBox = $(Button_UserInput);
        var x = parseFloat(inputBox.val());
        var retVal = "ERROR";

        switch (this.id) {
            case 'Button_btnInverseSign': retVal = -x; break;       // +/-
            case 'Button_btnInverse': retVal = 1 / x; break;        // 1/X
            case 'Button_btnSquare': retVal = x * x; break;         // X^2
            case 'Button_btnSquareRoot': retVal = Math.sqrt(x); break;  // SQRT(X)
            case 'Button^': retVal = x * x * x; break;       // X^3
        
            case 'Buttonln': retVal = Math.log(x); break;      // LOG (N) - NATURAL
            case 'Button_btnExp': retVal = Math.exp(x); break;      // E^(X)
            case 'Buttonsin': retVal = Math.sin(x); break;      // SIN(X)
            case 'Buttoncos': retVal = Math.cos(x); break;    // COS(X) 
            case 'Button.tan': retVal = Math.tan(x); break;       // TAN(X)
            default: break;
        }
        inputBox.val(retVal);
        inputBox.focus();
    });

})(jQuery);
