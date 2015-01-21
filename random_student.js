var  allStudents=[
"Arejian, Alexa	",
"Babikian, Vana	",
"Dermendjian, Lily	",
"Gevoglanian, Angelica	",
"Hamzoian, Hrach	",
"Kalbakian, Armine	",
"Kazanchyan, Shawn	",
"Kazazian, Tamar	",
"Keosseian, Sevag	",
"Koseyan, Sarkis	",
"Markarian, Brittany	",
"Ohanian, Talar	",
"Ourfalian, Talar"
];
var studentNums=[];
var x;
var a;
var b;
var counter=0;



$(function() {
	$('#studentsContainer').html('');
	// Fill in the #studentsContainer div with a button for each student. 
	// I feel like this might be taking up too much space 
	for (var i = 0; i < allStudents.length; i++) {
		var old = $('#studentsContainer').html();
		var add=old+'<button class="student" id="'+i+'">'+allStudents[i]+'</button>';
		$('#studentsContainer').html(add);
		studentNums[i]=0;
	};
	odds();
	// This will take care of registering all of our event listeners
	initEventListeners();
});

/**
//removed this function, i rewrote it below without using the toggleClass
var clickStudent = function() {
	$(this).toggleClass('picked');
	a= $(this).attr('id');
	studentNums[a]=(studentNums[a]+1)%2;
	printChosenOne(allStudents[a]);
	addCounter();
}
**/
// When you click on a student, they are either picked or unpicked
var clickStudent = function() {
	a = $(this).attr('id');
	if($(this).hasClass('picked')){
		$(this).removeClass('picked');
		studentNums[a]=0;
		subractCounter();
		printChosenOne('')
	}
	else{
		$(this).addClass('picked');
		studentNums[a]=1;
		printChosenOne(allStudents[a])
		addCounter();
	}
}
// &&count()<13
// ^goes in while loop
//randomly chooses a student and prints them as chosenOne
var randomize = function() {
	if(counter==allStudents.length){
		
		odds();
	}
	else{
		x=parseInt(Math.random()*allStudents.length);
		while(studentNums[x]&&counter<allStudents.length) {
			x=parseInt(Math.random()*allStudents.length);
		}
		studentNums[x]=1;
		addCounter();
		$('#'+x).addClass('picked');
		printChosenOne(allStudents[x])
	}
}

//resets the board, removes chosenOne, unpicks all students
var reset = function() {
	$('.student').removeClass('picked');
	for (var i = 0; i < allStudents.length; i++) {
		studentNums[i]=0;
	};
	printChosenOne('');
	counter=0;
}

var addCounter = function(){
	if (counter<allStudents.length) {
		counter++;
	};
	odds();
}

var subractCounter = function() {
	if (counter>0){
		counter--;
	}
	odds();
}

var odds = function () {
	var p=100/(allStudents.length-counter);
	p = p.toPrecision(3); 
	if (counter==allStudents.length) {
		p=0;
	}
	$('#chances').html(p+'%');
}


var printChosenOne=function(name) {
	$('#chosen').html(name);
}


var initEventListeners = function() {
	$('.student').click(clickStudent);
	$('#reset').click(reset);
	$('#randomize').click(randomize);
}