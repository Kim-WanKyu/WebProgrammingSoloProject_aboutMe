window.onload = function() {
	changeBackground();
}

//body태그의 배경이미지 바꾸는 함수
function changeBackground(e) {
	if (e == null) { value = "background1"; }
	else{ value = e; }
	document.body.style.backgroundImage = "url('../images/" + value + ".jpg')";
}