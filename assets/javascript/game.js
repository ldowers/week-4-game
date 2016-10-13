$(document).ready(function(){

// Variables
var characters = {
	c1: ["Luke Skywalker", "assets/images/luke-skywalker.jpg", 120, 8],
	c2: ["Rey", "assets/images/rey.jpg", 100, 5],
	c3: ["Darth Vader", "assets/images/darth-vader.jpg", 180, 25],
	c4: ["Kylo Ren", "assets/images/kylo-ren.jpg", 150, 20]
};
var isAttacker = false;
var isDefender = false;
var attackerHealth = 0;
var defenderHealth = 0;
var attackerDamage = 0;
var defenderDamage = 0;
var attackerDamageIncrease = 0;

// Functions
function setupCharacters () {
	for (var x in characters) {
		var optionBox = $('<div>');
		var optionImage = $('<img>');
		var optionName = $('<div>');
		var optionHealth = $('<div>');

		optionBox.addClass('characterBox');
		optionBox.attr('data-state', "allCharacters");
		optionBox.attr('data-health', characters[x][2]);
		optionBox.attr('data-damage', characters[x][3]);

		optionImage.addClass('characterImage');
		optionImage.attr('src', characters[x][1]);
		optionImage.attr('alt', characters[x][0]);

		optionName.addClass('characterName');
		optionName.html(characters[x][0]);

		optionHealth.addClass('characterHealth');
		optionHealth.html(characters[x][2]);

		$("#allCharacters").append(optionBox.append(optionImage, optionName, optionHealth));
	};
}

function chooseCharacter () {
	$("#allCharacters > .characterBox").on('click', function(){

		if ($(this).data('state') == "allCharacters") {
			$(this).hide();
			$(this).attr('data-state', "attacker");
			$("#attacker").append($(this).show());
			isAttacker = true;
			attackerHealth = parseInt($(this).data('health'));
			attackerDamage = parseInt($(this).data('damage'));
			attackerDamageIncrease = attackerDamage;

			$("#allCharacters > .characterBox").hide();
			$("#allCharacters > .characterBox").attr('data-state', "allEnemies");
			$("#allCharacters > .characterBox .characterImage").css({"background-color": "red", "border-color": "black"});
			$("#allEnemies").append($("#allCharacters > .characterBox").show());
		}
		else if ($(this).data('state') == "allEnemies" && isDefender == false) {
			$(this).hide();
			$(this).attr('data-state', "defender");
			$("#defender").empty();
			$("#defender").append($(this).show());
			$("#defender .characterBox .characterImage").css({"background-color": "black", "border-color": "green"});
			$("#defender .characterBox .characterName").css("color", "white");
			$("#defender .characterBox .characterHealth").css("color", "white");
			$("#defender").show();
			isDefender = true;
			defenderHealth = parseInt($(this).data('health'));
			defenderDamage = parseInt($(this).data('damage'));
			$("#fightResult").html("<p></p>");
		}
	});
}

function resetGame () {
	isAttacker = false;
	isDefender = false;
	attackerHealth = 0;
	defenderHealth = 0;
	attackerDamage = 0;
	defenderDamage = 0;
	attackerDamageIncrease = 0;

	$("#attacker").empty();
	$("#allEnemies").empty();
	$("#defender").empty();
	$("#fightResult").html("");
	$("#restartButton").hide();
}

// Play Game

$("#restartButton").hide();
setupCharacters();
chooseCharacter();

$("#attackButton").on('click', function(){
	if (isAttacker && isDefender){
		attackerHealth -= defenderDamage;
		defenderHealth -= attackerDamage;

		$("#attacker .characterBox .characterHealth").html(attackerHealth);
		$("#defender .characterBox .characterHealth").html(defenderHealth);

		if (attackerHealth > 0 && defenderHealth > 0){
			$("#fightResult").html("<p>You attacked " + $("#defender .characterBox .characterName").text() +
				" for " + attackerDamage + " damage." + "<br>" + $("#defender .characterBox .characterName").text() +
				" attacked you back for " + defenderDamage + " damage.</p>");	
			attackerDamage += attackerDamageIncrease;
		}
		else if (attackerHealth <= 0) {
			isAttacker = false;
			$("#fightResult").html("<p>You've been defeated...GAME OVER!!!</p>");
			$("#restartButton").show();
		}
		else if (defenderHealth <= 0) {
			$("#defender").hide();
			isDefender = false;

			if ($("#allEnemies").html() == "") {
				isAttacker = false;
				$("#fightResult").html("<p>You Won!!!! GAME OVER!!!</p>");
				$("#restartButton").show();
			}
			else {
				$("#fightResult").html("<p>You have defeated " + $("#defender .characterBox .characterName").text() +
					", you can choose to fight another enemy.</p>");
			}			
		}
	}
	else if (isAttacker && !isDefender){
		$("#fightResult").html("<p>No enemy here.</p>");
	}
});

$('#restartButton').on('click', function() {
	resetGame();
	setupCharacters();
	chooseCharacter();
});
});