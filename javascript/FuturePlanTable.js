var spanToUnreal;	//Unreal Engine 2023 교육 사이트로 이동하기 위한 span 변수
var spanToBaekjoon;	//baekjoon 사이트로 이동하기 위한 span 변수
var spanToHackers;	//해커스 영어 토익 사이트로 이동하기 위한 span 변수
var spanToToeic;	//토익 공식 사이트로 이동하기 위한 span 변수

//윈도우가 로드되면 각 변수의 요소 정의 및 이벤트리스너 추가하는 익명 함수 실행
window.onload = function() {
	spanToUnreal = document.getElementsByName('gotoUNREALENGINE');
	for(var i=0; i<spanToUnreal.length; i++){
		spanToUnreal[i].addEventListener("mouseover", popupTitle(spanToUnreal[i]));
		spanToUnreal[i].addEventListener("dblclick", openUnrealPage);				
	}

	spanToBaekjoon = document.getElementsByName('gotoBAEKJOON');
	for(var i=0; i<spanToBaekjoon.length; i++){
		spanToBaekjoon[i].addEventListener("mouseover", popupTitle(spanToBaekjoon[i]));
		spanToBaekjoon[i].addEventListener("dblclick", openBaekjoonPage);
	}

	spanToHackers = document.getElementsByName('gotoHACKERS');
	for(var i=0; i<spanToHackers.length; i++){
		spanToHackers[i].addEventListener("mouseover", popupTitle(spanToHackers[i]));
		spanToHackers[i].addEventListener("dblclick", openHackersPage);
	}

	spanToToeic = document.getElementsByName('goToTOEIC');
	for(var i=0; i<spanToToeic.length; i++){
		spanToToeic[i].addEventListener("mouseover", popupTitle(spanToToeic[i]));
		spanToToeic[i].addEventListener("dblclick", openToeicPage);
	}

};

//해당 태그에 title툴팁 띄워주는 함수
function popupTitle(span){
	span.title = "문장을 더블클릭 시 웹페이지로 이동합니다.";
}

//언리얼 교육 홈페이지 창 띄우는 함수 (윈도우 고유이름은 'futurePlanWindow')
function openUnrealPage(){
	window.open('https://epiclounge.co.kr/start23/index.php', 'futurePlanWindow');
}

//백준 온라인 저지 홈페이지 창 띄우는 함수 (윈도우 고유이름은 'futurePlanWindow')
function openBaekjoonPage(){
	window.open('https://www.acmicpc.net/', 'futurePlanWindow');
}

//해커스 영어 토익 홈페이지 창 띄우는 함수 (윈도우 고유이름은 'futurePlanWindow')
function openHackersPage(){
	window.open('https://www.hackers.co.kr/?c=s_toeic&keywd=haceng_main_gnb_toeic&logger_kw=haceng_main_gnb_toeic', 'futurePlanWindow');
}

//토익 공식 홈페이지 창 띄우는 함수 (윈도우 고유이름은 'futurePlanWindow')
function openToeicPage(){
	window.open('https://exam.toeic.co.kr/receipt/receiptStep1.php', 'futurePlanWindow');
}