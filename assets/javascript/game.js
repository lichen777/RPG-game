var game = {
    character : [
      ["Bulbasaur", 200, 30, 20, "assets/images/001.png"],
      ["Charmander", 200, 30, "assets/images/004.png"],
      ["Squirtle", 200, 30, "assets/images/007.png"],
      ["Pikachu", 200, 30, "assets/images/025.png"]
      ],

    characterItem : ["Name", "HP", "AP", "counterAP", "Img"],

    fighter: undefined,
    enemy: undefined,
    defender : undefined,
    startGame : function(fighterIndex, defenderIndex) {
        this.defender = this.character[defenderIndex];
        this.fighter = this.character.splice(fighterIndex, 1);
        this.enemy = this.character;
    }
}

