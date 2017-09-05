var time_out = null;

function startGame() {
	var url = window.location.search;

	var game_difficulty = url.replace("?difficulty=", "");
	var time_to_complete_game = 0;
	
	switch(game_difficulty) {
		case 'Easy':
			time_to_complete_game = 100;
			break;
		case 'Medium':
			time_to_complete_game = 50;
			break;
		case 'Hard':
			time_to_complete_game = 25;
			break;
	}

	document.getElementById('timer').innerHTML = time_to_complete_game

	var number_of_balloons = 90;
	var number_of_balloons_bursted = 0;
	createBalloons(number_of_balloons);

	document.getElementById('number_of_full_balloons').innerHTML = number_of_balloons;
	document.getElementById('number_of_bursted_balloons').innerHTML = number_of_balloons_bursted;

	timerCountdown(time_to_complete_game + 1);
}

function createBalloons(number_of_balloons) {

	for (var i = 0; i < number_of_balloons; i++) {
		var balloon = document.createElement('img');
		balloon.src = 'images/small_blue_balloon.png';
		balloon.style.margin = '10px';

		balloon.onclick = function() { 
			burst(this); 
		}

		balloon.id = 'balloon' + i;

		document.getElementById('scenario').appendChild(balloon);
	}

}

function timerCountdown(time_to_complete_game) {
	time_to_complete_game -= 1;

	if(time_to_complete_game < 0) {
		clearTimeout(time_out);
		gameOver();
		return false;
	}

	document.getElementById('timer').innerHTML = time_to_complete_game;
	time_out = setTimeout('timerCountdown(' + time_to_complete_game + ')', 1000);
}

function gameOver() {
	removeBalloonEvents();
	alert("Game Over! You couldn' burst all the balloons in time!");

}

function burst(balloon) {
	var balloon_id = balloon.id;

	document.getElementById(balloon_id).setAttribute("onclick", "");
	document.getElementById(balloon_id).src = "images/small_blue_balloon_burst.png";
	changeScore();
}

function changeScore() {

	var number_of_full_balloons = document.getElementById('number_of_full_balloons').innerHTML;
	var number_of_burst_balloons = document.getElementById('number_of_bursted_balloons').innerHTML;

	number_of_full_balloons = parseInt(number_of_full_balloons);
	number_of_burst_balloons = parseInt(number_of_burst_balloons);

	number_of_full_balloons -= 1;
	number_of_burst_balloons += 1;

	document.getElementById('number_of_full_balloons').innerHTML = number_of_full_balloons;
	document.getElementById('number_of_bursted_balloons').innerHTML = number_of_burst_balloons;

	isGameCompleted(number_of_full_balloons);
}

function isGameCompleted(number_of_full_balloons) {
	if(number_of_full_balloons == 0) {
		alert('Congratz! You manage to burst all the balloons in time! :)')
		stopGame();
	}
}

function stopGame() {
	clearTimeout(time_out);
}

function removeBalloonEvents() {
	var i = 0;

	while(document.getElementById('balloon' + i)){
		document.getElementById('balloon' + i).onclick = "";
		i++;
	}
}