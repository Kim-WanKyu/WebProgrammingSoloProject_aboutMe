var canvas, ctx; //전공 학점 비율 차트 그리는 캔버스 관련 변수
var canvasMajor, ctxMajor; //전공 학점 비율 차트 그리는 캔버스 관련 변수

var scoreTable;

//전체 학점
var myScore = {
	Ap : 0,
	Az : 0,
	Bp : 0,
	Bz : 0,
	Cp : 0,
	Cz : 0,
	Dp : 0,
	Dz : 0,
	F : 0
};

//학점 전공만
var myMajorScore = {
	Ap : 0,
	Az : 0,
	Bp : 0,
	Bz : 0,
	Cp : 0,
	Cz : 0,
	Dp : 0,
	Dz : 0,
	F : 0
};

//학점 문자열
var scoreStr = ['A+', 'A0', 'B+', 'B0',
				'C+', 'C0', 'D+', 'D0', 'F'];

//A+,A,B+,B,C+,C,D+,D,F 색상
var color = ['blue', 'deepskyblue', 'green', 'greenyellow', 
			 'gold', 'orange', 'coral', 'red', 'gray'];

var sumTotalRatio = 0;	//전체 학점의 총 비율 합계
var sumMajorRatio = 0;	//전공 학점의 총 비율 합계

var scoreTotalCount = new Array();	//전체 학점 A+,A,B+,B,C+,C,D+,D,F 개수
var scoreTotalRatio = new Array();	//전체 학점 A+,A,B+,B,C+,C,D+,D,F 비율

var scoreMajorCount = new Array();	//전공 학점 A+,A,B+,B,C+,C,D+,D,F 개수
var scoreMajorRatio = new Array();	//전공 학점 A+,A,B+,B,C+,C,D+,D,F 비율


//윈도우 로딩 완료 후 초기화하는 init함수 실행되도록 window객체에 eventListener연결
window.addEventListener('load', init);

//초기화 함수
function init() {
	canvas = document.getElementById("myTotalScoreCanvas");
	ctx = canvas.getContext("2d");
	canvas.width = 400;
	canvas.height = 250;

	canvasMajor = document.getElementById("myMajorcoreCanvas");
	ctxMajor = canvasMajor.getContext("2d");
	canvasMajor.width = 400;
	canvasMajor.height = 250;

	scoreTable = document.getElementById("scoreTable");

	initScores();

	drawTotalScoreChart();
	drawMajorScoreChart();

	makeScoreTable();
}

//내 학점관련 테이블
var myScoreTable = [
	/*[힉년, 학기, is전공, "과목명", "학점", "등급"]*/
	[1, 1, "교양필수", "원어민실용영어Ⅰ", 2, 'A+'],
	[1, 1, "교양필수", "대학글쓰기", 2, 'B0'],
	[1, 1, "교양선택", "확률통계", 3, 'B+'],
	[1, 1, "교양선택", "컴퓨터공학기초", 3, 'B+'],
	[1, 1, "교양선택", "C프로그래밍", 3, 'A+'],
	[1, 1, "교양선택", "창의적프로그램코딩기초", 3, 'A0'],

	[1, 2, "교양필수", "원어민실용영어Ⅱ", 2, 'A0'],
	[1, 2, "교양필수", "발표와토론", 2, 'B0'],
	[1, 2, "교양선택", "이산수학", 3, 'C+'],
	[1, 2, "교양선택", "C프로그래밍실습", 3, 'A+'],
	[1, 2, "교양선택", "자료처리", 3, 'A0'],
	[1, 2, "교양선택", "컴퓨터의활용", 3, 'A+'],
	[1, 2, "전공선택", "디지털논리회로", 3, 'A+'],

	[2, 1, "전공필수", "자바프로그래밍Ⅰ", 3, 'A+'],
	[2, 1, "전공필수", "객체지향프로그래밍및실습", 3, 'A+'],
	[2, 1, "전공선택", "창의적공학설계", 3, 'A+'],
	[2, 1, "전공선택", "자료구조", 3, 'A+'],
	[2, 1, "전공선택", "컴퓨터구조론", 3, 'B+'],
	[2, 1, "전공선택", "데이터통신", 3, 'D0'],
	[2, 1, "전공선택", "선형대수", 3, 'A+'],

	[2, 2, "전공필수", "자바프로그래밍Ⅱ", 3, 'B+'],
	[2, 2, "전공선택", "컴퓨터네트워크", 3, 'A0'],
	[2, 2, "전공선택", "컴퓨터운영체제", 3, 'F'],
	[2, 2, "전공선택", "알고리즘", 3, 'B+'],
	[2, 2, "전공선택", "미래사회와컴퓨터기술", 1, 'A+'],
	[2, 2, "전공선택", "미래사회와지능", 1, 'A+'],
	[2, 2, "전공선택", "미래사회와융합기술", 1, 'A+'],
	[2, 2, "일반선택", "(타)영화로배우는자연재해", 3, 'B+']
];

//학점 초기화하는 함수
function initScores() {
	initMyScore();
	initMyMajorScore();
}

//myScore 초기화
function initMyScore() {
	for(var i=0; i<myScoreTable.length; i++) {
		switch(myScoreTable[i][5]) {
		case 'A+':
			myScore.Ap += myScoreTable[i][4];
			break;
		case 'A0':
			myScore.Az += myScoreTable[i][4];
			break;
		case 'B+':
			myScore.Bp += myScoreTable[i][4];
			break;
		case 'B0':
			myScore.Bz += myScoreTable[i][4];
			break;
		case 'C+':
			myScore.Cp += myScoreTable[i][4];
			break;
		case 'C0':
			myScore.Cz += myScoreTable[i][4];
			break;
		case 'D+':
			myScore.Dp += myScoreTable[i][4];
			break;
		case 'D0':
			myScore.Dz += myScoreTable[i][4];
			break;
		case 'F':
			myScore.F  += myScoreTable[i][4];
			break;
		}
	}
}

//myMajorScore 초기화
function initMyMajorScore() {
	for(var i=0; i<myScoreTable.length; i++) {
		if(myScoreTable[i][2] == "전공필수" || myScoreTable[i][2] == "전공선택"){
			switch(myScoreTable[i][5]) {
			case 'A+':
				myMajorScore.Ap += myScoreTable[i][4];
				break;
			case 'A0':
				myMajorScore.Az += myScoreTable[i][4];
				break;
			case 'B+':
				myMajorScore.Bp += myScoreTable[i][4];
				break;
			case 'B0':
				myMajorScore.Bz += myScoreTable[i][4];
				break;
			case 'C+':
				myMajorScore.Cp += myScoreTable[i][4];
				break;
			case 'C0':
				myMajorScore.Cz += myScoreTable[i][4];
				break;
			case 'D+':
				myMajorScore.Dp += myScoreTable[i][4];
				break;
			case 'D0':
				myMajorScore.Dz += myScoreTable[i][4];
				break;
			case 'F':
				myMajorScore.F  += myScoreTable[i][4];
				break;
			}
		}
	}
}

//학점 테이블 작성하는 함수
function makeScoreTable() {
	//table의 ID로 myScoreTable 지정
	var tableInnerHTML = "<table id='myScoreTable'><thead><tr><th>학년</th><th>학기</th><th>전공</th><th>과목명</th><th>학점</th><th>등급</th></tr></thead><tbody>";
	for (var i = 0; i < myScoreTable.length; i++) {
		tableInnerHTML +=  "<tr><td>"+myScoreTable[i][0]+"</td><td>"+myScoreTable[i][1]+"</td><td>"+myScoreTable[i][2]+"</td><td>"+myScoreTable[i][3]+"</td><td>"+myScoreTable[i][4]+"</td><td>"+myScoreTable[i][5]+"</td></tr>"
	}
	tableInnerHTML +=  "</tbody></table><br>";

	scoreTable.innerHTML = tableInnerHTML;
}

//전체 학점 비율 차트 그리는 함수
function drawTotalScoreChart() {
	calcTotalScoreRatio();
	drawTotalScoreCircularChart();
	drawTotalScoreChartInfo();
}

//전체 학점 비율 차트의 비율 계산하는 함수
function calcTotalScoreRatio() {
	var max = 0;
	
	scoreTotalCount[0] = myScore.Ap;
	scoreTotalCount[1] = myScore.Az;
	scoreTotalCount[2] = myScore.Bp;
	scoreTotalCount[3] = myScore.Bz;
	scoreTotalCount[4] = myScore.Cp;
	scoreTotalCount[5] = myScore.Cz;
	scoreTotalCount[6] = myScore.Dp;
	scoreTotalCount[7] = myScore.Dz;
	scoreTotalCount[8] = myScore.F;

	for(var i = 0; i < scoreTotalCount.length; i++) {
		max += scoreTotalCount[i];
	}

	for(var i = 0; i < scoreTotalCount.length; i++) {
		scoreTotalRatio[i] = eval(Math.round(scoreTotalCount[i]/max * 100));
		sumTotalRatio += scoreTotalRatio[i];
	}
}

//전체 학점 비율 차트의 파이차트 그리는 함수
function drawTotalScoreCircularChart() {
	var startAngle = 1.5 * Math.PI;	//arc의 12시방향에서 시작하도록 설정

	//F를 제외한 A+ ~ D0 까지만 계산하여 그리고 나머지 영역을 F로 채움.
	for (var i = 0; i < scoreTotalRatio.length -1; i++) {
		ctx.fillStyle = color[i];
		ctx.beginPath();
		ctx.moveTo(canvas.width/3*2, canvas.height/2);
		ctx.arc(canvas.width/3*2, canvas.height/2, 100, startAngle, startAngle + Math.PI * 2 * (scoreTotalRatio[i]/100), false);
		ctx.closePath();
		ctx.fill();
		startAngle += (Math.PI * 2 * (scoreTotalRatio[i]/100));
	}

	ctx.fillStyle = color[scoreTotalRatio.length-1];
	ctx.beginPath();
	ctx.moveTo(canvas.width/3*2, canvas.height/2);
	ctx.arc(canvas.width/3*2, canvas.height/2, 100, startAngle, 1.5*Math.PI, false);
	ctx.closePath();
	ctx.fill();
}

//전체 학점 비율 차트의 정보 출력하는 함수
function drawTotalScoreChartInfo() {
	ctx.textAlign = "left"

	ctx.fillStyle = "black";
	ctx.fillText("이전 학기(2-2)까지의 전체 학점 비율", 10, canvas.height/5);

	for(var i=0; i<scoreStr.length; i++){
		ctx.fillStyle = "black";
		ctx.fillText(""+scoreStr[i], 10, canvas.height/7*2 + i*10);
		ctx.fillText(" 학점: "+ scoreTotalRatio[i] + "%", 20, canvas.height/7*2 + i*10);
		ctx.fillStyle = color[i];
		ctx.fillText("■ ("+color[i]+")", 80, canvas.height/7*2 + i*10);
	}

	ctx.fillStyle = "black";
	ctx.fillText("합계 : " + sumTotalRatio + "%", 10, canvas.height/2+55);
}


//전공 학점 비율 차트 그리는 함수
function drawMajorScoreChart() {
	calcMajorScoreRatio();
	drawMajorScoreCircularChart();
	drawMajorScoreChartInfo();
}

//전공 학점 비율 차트의 비율 계산하는 함수
function calcMajorScoreRatio() {
	var max = 0;
	
	scoreMajorCount[0] = myMajorScore.Ap;
	scoreMajorCount[1] = myMajorScore.Az;
	scoreMajorCount[2] = myMajorScore.Bp;
	scoreMajorCount[3] = myMajorScore.Bz;
	scoreMajorCount[4] = myMajorScore.Cp;
	scoreMajorCount[5] = myMajorScore.Cz;
	scoreMajorCount[6] = myMajorScore.Dp;
	scoreMajorCount[7] = myMajorScore.Dz;
	scoreMajorCount[8] = myMajorScore.F;

	for(var i = 0; i < scoreMajorCount.length; i++) {
		max += scoreMajorCount[i];
	}

	for(var i = 0; i < scoreMajorCount.length; i++) {
		scoreMajorRatio[i] = eval(Math.round(scoreMajorCount[i]/max * 100));
		sumMajorRatio += scoreMajorRatio[i];
	}
}

//전공 학점 비율 차트의 파이차트 그리는 함수
function drawMajorScoreCircularChart() {
	var startAngle = 1.5 * Math.PI;	//arc의 12시방향에서 시작하도록 설정

	//F를 제외한 A+ ~ D0 까지만 계산하여 그리고 나머지 영역을 F로 채움.
	for (var i = 0; i < scoreMajorRatio.length -1; i++) {
		ctxMajor.fillStyle = color[i];
		ctxMajor.beginPath();
		ctxMajor.moveTo(canvasMajor.width/3*2, canvasMajor.height/2);
		ctxMajor.arc(canvasMajor.width/3*2, canvasMajor.height/2, 100, startAngle, startAngle + Math.PI * 2 * (scoreMajorRatio[i]/100), false);
		ctxMajor.closePath();
		ctxMajor.fill();
		startAngle += (Math.PI * 2 * (scoreMajorRatio[i]/100));
	}

	ctxMajor.fillStyle = color[scoreMajorRatio.length-1];
	ctxMajor.beginPath();
	ctxMajor.moveTo(canvasMajor.width/3*2, canvasMajor.height/2);
	ctxMajor.arc(canvasMajor.width/3*2, canvasMajor.height/2, 100, startAngle, 1.5*Math.PI, false);
	ctxMajor.closePath();
	ctxMajor.fill();
}

//전공 학점 비율 차트의 정보 출력하는 함수
function drawMajorScoreChartInfo() {
	ctxMajor.textAlign = "left"

	ctxMajor.fillStyle = "black";
	ctxMajor.fillText("이전 학기(2-2)까지의 전공 학점 비율", 10, canvasMajor.height/5);

	for(var i=0; i<scoreStr.length; i++){
		ctxMajor.fillStyle = "black";
		ctxMajor.fillText(""+scoreStr[i], 10, canvasMajor.height/7*2 + i*10);
		ctxMajor.fillText(" 학점: "+ scoreMajorRatio[i] + "%", 20, canvasMajor.height/7*2 + i*10);
		ctxMajor.fillStyle = color[i];
		ctxMajor.fillText("■ ("+color[i]+")", 80, canvasMajor.height/7*2 + i*10);
	}

	ctxMajor.fillStyle = "black";
	ctxMajor.fillText("합계 : " + sumMajorRatio + "%", 10, canvasMajor.height/2+55);
}