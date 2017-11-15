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
    },
    attack : function() {
    	this.defender[1] -= (this.fighter[0][2] + (6 * this.attackRound));
    	this.attackRound ++;
    	if (this.defender[1] <= 0) {
    		this.nextRound();
    		this.fighter[0][1] += 50;
    	}else {
    		this.fighter[0][1] -= this.defender[3];
    		if (this.fighter[0][1] <= 0){
    			this.gameover();
    		}
    	}
    },
    nextRound : function() {
    	this.enemy.splice(this.enemy.indexOf(this.defender),1);
    	if (typeof this.enemy[0] !== "undefined") {
    		this.defender = this.enemy[0]; //pick defender
    		this.attackRound = 0;
    	}else {
    		$("#display").text("You won! Click to restart!");
    		$("#display").click(function() {
    			location.reload();
			});
    	}
    },
    gameover : function() {
    	$("#display").text("Game Over! Click to restart!");
    	$("#display").click(function() {
    		location.reload();
		});
    }
}

$(document).ready(function() {

    for (var i = 0; i < game.character.length; i++) {
        var imgChar1 = $("<img>").addClass("image").attr("src", game.character[i][4]).attr("data-fighterIndex", i) .css("width", "200px");

        $("#lineup").append(imgChar1);
    }

    $(".image").on("click", function() {
        var index = ($(this).attr("data-fighterIndex"));
        console.log(index);
        game.fighterSelect(index);
        $("#fighter").html($("<img>").attr("src", game.fighter[0][4]).css("width", "200px"));
        $("#fighter").append("<p>" + game.fighter[0][0] + "</p>");
        $("#fighter").append("<p>HP: " + game.fighter[0][1] + "</p>");
        $("#lineup").empty();

        console.log(game.enemy);

        for (var i = 0; i < game.enemy.length; i++) {
            var imgChar2 = $("<img>").addClass("image").attr("src", game.enemy[i][4]).attr("data-defenderIndex", i) .css("width", "200px");

        $("#lineup").append(imgChar2);
        }
    })

    

});




