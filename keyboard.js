var Keyboard = function() {
	var self = this;

	window.addEventListener('keydown', function(evt) { self.onKeyDown(evt); }, false);
	window.addEventListener('keyup', function(evt) { self.onKeyDown(evt); }, false);

	this.keyListeners = new Array();
	this.keys = new Array();

	this.KEY_LEFT = 65;
	this.KEY_UP = 87;
	this.KEY_RIGHT = 68;
	this.KEY_DOWN = 83;
};

Keyboard.prototype.onKeyDown = function(evt)
{
	this.keys[evt.keyCode] = true;
};

Keyboard.prototype.onKeyUp = function(evt)
{
	this.keys[evt.keyCode] = false;
};

Keyboard.prototype.isKeyDown = function(keyCode)
{
	return this.keys[keyCode];
};