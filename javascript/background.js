var value;

window.onload = function() {
	changeBackground(value);
}


function changeBackground(e) {
	if (e == null) {
		value = "background1";
	}
	else{
		value = e;
	}
	document.body.style.backgroundImage = "url('../images/" + value + ".jpg')";
}