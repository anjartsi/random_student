// Replace these with student names. 
// I plan on getting this info through PHP from a spreadsheet
var allStudents=[
"Student 1	",
"Student 2	",
"Student 3	",
"Student 4	",
"Student 5	",
"Student 6	",
"Student 7	",
"Student 8	",
"Student 9	",
"Student 10	",
"Student 11	",
"Student 12	",
"Student 13	",
"Student 14	",
"Student 15	",
"Student 16	",
"Student 17	",
"Student 18	",
"Student 19	",
"Student 20	"
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
	printOdds();
	// This will take care of registering all of our event listeners
	initEventListeners();
});

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

//randomly chooses a student and prints them as chosenOne
var randomize = function() {
	if(counter==allStudents.length){
		
		printOdds();
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
	printOdds();
}

// adds 1 to the count of how many students were selected
var addCounter = function(){
	if (counter<allStudents.length) {
		counter++;
	};
	printOdds();
}

// subtracts 1 from the count of how many students were selected
var subractCounter = function() {
	if (counter>0){
		counter--;
	}
	printOdds();
}

// prints the odds of a single person getting picked next
var printOdds = function () {
	var p=100/(allStudents.length-counter);
	p = p.toPrecision(3); 
	if (counter==allStudents.length) {
		p=0;
	}
	$('#chances').html(p+'%');
}

// prints the name of the latest picked student in the #chosen div
var printChosenOne=function(name) {
	$('#chosen').html(name);
}


var initEventListeners = function() {
	$('.student').click(clickStudent);
	$('#reset').click(reset);
	$('#randomize').click(randomize);
}