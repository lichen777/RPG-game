var game = {
    character : [
      ["Bulbasaur", 200, 30, 20, "assets/images/001.png"],
      ["Charmander", 200, 30, 20, "assets/images/004.png"],
      ["Squirtle", 200, 30, 20, "assets/images/007.png"],
      ["Pikachu", 200, 30, 20, "assets/images/025.png"]
      ],

    characterItem : ["Name", "HP", "AP", "counterAP", "Img"],

    fighter: undefined,
    enemy: undefined,
    defender : undefined,
    attackRound : 0,
    fighterSelect : function(fighterIndex) {
        this.fighter = this.character.splice(fighterIndex, 1);
        this.enemy = this.character;
    },
    defenderSelect : function(defenderIndex) {
        this.defender = this.enemy[defenderIndex];
        this.status();
    },
    attack : function() {
    	this.defender[1] -= (this.fighter[0][2] + (6 * this.attackRound));
    	this.attackRound ++;
    	if (this.defender[1] <= 0) {
    		
    		$("#defender").empty();
    		this.enemy.splice(this.enemy.indexOf(this.defender),1);
    		if (typeof this.enemy[0] === "undefined") {
    			$("button").prop("disabled",true);
    			$("#display").text("You won! Click to restart!");
    			$("#display").click(function() {
    				location.reload();
				});
    		}
    		this.defender = undefined;

    		game.lineup(game.enemy, "#enemy");
    		$(".Img").on("click", function() {
        		var index = ($(this).attr("data-playerIndex"));
        		console.log(index);
        		game.defenderSelect(index);
        		$("#enemy").empty();
       	 	})
    		this.attackRound = 0;
    		this.fighter[0][1] += 50;
    	}else {
    		this.fighter[0][1] -= this.defender[3];
    		if (this.fighter[0][1] <= 0){
    			this.gameover();
    		}
    	}
    	this.status();
    },
    gameover : function() {
    	$("button").prop("disabled",true);
    	$("#display").text("You lose! Game Over! Click to restart!");
    	$("#display").click(function() {
    		location.reload();
		});
    },
    lineup : function(group, place) {
    	for (var i = 0; i < group.length; i++) {
    		var imgChar = $("<img>").addClass("Img").attr("src", group[i][4]).attr("data-playerIndex", i) .css("width", "200px");
    		$(place).append(imgChar);
    	}
    },
    status : function() {
    	$("#fighter").html($("<img>").attr("src", game.fighter[0][4]).css("width", "200px"));
        $("#fighter").append("<p>" + game.fighter[0][0] + "</p>");
        $("#fighter").append("<p>HP: " + game.fighter[0][1] + "</p>");
        $("#defender").html($("<img>").attr("src", game.defender[4]).css("width", "200px"));
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
        $("#fighter").html($("<img>").attr("src", game.fighter[0][4]).css("width", "200px"));
        $("#fighter").append("<p>" + game.fighter[0][0] + "</p>");
        $("#fighter").append("<p>HP: " + game.fighter[0][1] + "</p>");
        $("#lineup").empty();

        //console.log(game.enemy);

        game.lineup(game.enemy, "#enemy");

		$(".Img").on("click", function() {
        	var index = ($(this).attr("data-playerIndex"));
        	//console.log(index);
        	game.defenderSelect(index);
        	
        	$("#enemy").empty();

    	})
    })

    $("button").on("click", function() {
    	game.attack();
    })

});




