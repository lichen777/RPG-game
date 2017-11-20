var game = {
    character : [
      ["Bulbasaur", 200, 30, 20, "assets/images/001.png"],
      ["Charmander", 200, 30, 20, "assets/images/004.png"],
      ["Squirtle", 200, 30, 20, "assets/images/007.png"],
      ["Pikachu", 200, 30, 20, "assets/images/025.png"]
      ],

    characterItem : ["Name", "HP", "AP", "counterAP", "Img"],

    fighter: [],
    enemy: [],
    defender : [],
    attackRound : 0,
    APIncrease : 6,
    fighterSelect : function(fighterIndex) {
        this.fighter = this.character.splice(fighterIndex, 1);
        this.enemy = this.character;
        $("#first").hide();
    },
    defenderSelect : function(defenderIndex) {
        this.defender = this.enemy[defenderIndex];
        $("#enemy").empty();
        this.status();
    },
    attack : function() {
        $("#info").empty();
        var HPdamage = (this.fighter[0][2] + (this.APIncrease * this.attackRound))
    	this.defender[1] -= HPdamage;
    	this.attackRound ++;
    	if (this.defender[1] <= 0) {
    		$("#defender").empty();
    		this.enemy.splice(this.enemy.indexOf(this.defender),1);
    		if (typeof this.enemy[0] === "undefined") {
    			$("button").prop("disabled",true);
    			$("#display").html("<p>You won! Click to restart!</p>");
    			$("#display").click(function() {
    				location.reload();
				});
    		}
            $("#info").html("<p>" + this.defender[0] + " has been defeated</p>")
    		this.defender = undefined;
    		game.lineup(game.enemy, "#enemy");
    		$(".Img").on("click", function() {
        		var index = ($(this).attr("data-playerIndex"));
        		console.log(index);
        		game.defenderSelect(index);
       	 	})
    		//this.attackRound = 0;   // this is a real RPG should have
    		//this.fighter[0][1] += 50;   // this is a real RPG should have
    	}else {
    		this.fighter[0][1] -= this.defender[3];
    		if (this.fighter[0][1] <= 0){
    			this.gameover();
    		}
            $("#info").html("<p>You attacked " + this.defender[0] + " for " + HPdamage + " HP damage.</p><p>" + this.defender[0] + " counter attacked you for " + this.defender[3] + " HP damage.</p>")
    	}
    	this.status();
    },
    gameover : function() {
    	$("button").prop("disabled",true);
    	$("#display").html("<p>You lose! Game Over! Click to restart!</p>");
    	$("#display").click(function() {
    		location.reload();
		});
    },
    lineup : function(group, place) {
    	for (var i = 0; i < group.length; i++) {
    		var imgChar = $("<img>").addClass("Img").attr("src", group[i][4]).attr("data-playerIndex", i) .css("width", "25%");
    		$(place).append(imgChar);
    	}
    },
    status : function() {
    	$("#fighter").html($("<img>").attr("src", game.fighter[0][4]).css("width", "25%"));
        $("#fighter").append("<p>" + game.fighter[0][0] + "</p>");
        $("#fighter").append("<p>HP: " + game.fighter[0][1] + "</p>");
        $("#defender").html($("<img>").attr("src", game.defender[4]).css("width", "25%"));
        $("#defender").append("<p>" + game.defender[0] + "</p>");
        $("#defender").append("<p>HP: " + game.defender[1] + "</p>");
    }
}

$(document).ready(function() {

    game.lineup(game.character, "#lineup");

    $(".Img").on("click", function() {
        var index = ($(this).attr("data-playerIndex"));
        //console.log(index);
        game.fighterSelect(index);
        $("#fighter").html($("<img>").attr("src", game.fighter[0][4]).css("width", "25%"));
        $("#fighter").append("<p>" + game.fighter[0][0] + "</p>");
        $("#fighter").append("<p>HP: " + game.fighter[0][1] + "</p>");
        $("#lineup").empty();

        game.lineup(game.enemy, "#enemy");

		$(".Img").on("click", function() {
        	var index = ($(this).attr("data-playerIndex"));
        	//console.log(index);
        	game.defenderSelect(index);
    	})
    })

    $("button").on("click", function() {
        if(typeof game.defender === "undefined"){
            $("#info").html("<p>Select an enemy</p>");
        }else {
            game.attack();
        }
    })

});




