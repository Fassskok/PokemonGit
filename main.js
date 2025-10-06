const character = {
    name: "Pikachu",
    hp: 100,
    maxHp: 100,
    elementHP: document.getElementById("health-character"),
    elementBar: document.getElementById("progressbar-character"),

    updateHp() {
        this.elementBar.style.width = (this.hp / this.maxHp * 100) + "%";
        this.elementHP.textContent = `${this.hp} / 100`;

        if (this.hp > 75) {
            this.elementBar.style.background = "lime";
        } else if(this.hp > 50){
            this.elementBar.style.background = "yellow";
        } else if(this.hp >20){
            this.elementBar.style.background = "orange";
        } else{
            this.elementBar.style.background = "red";
        }
    },

    attack(defender, minDamage=2, maxDamage=15) {
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    defender.hp = Math.max(0, defender.hp - damage);
    defender.updateHp();
    console.log(`${this.name} атакує ${defender.name} на ${damage} урона!`);
    },
};

const enemy = {
    name: "Charmander",
    hp: 100,
    maxHp: 100,
    elementHP: document.getElementById("health-enemy"),
    elementBar: document.getElementById("progressbar-enemy"),
    updateHp: character.updateHp,
    attack: character.attack
};

const enemy2 = {
    name: "Mewtwo",
    hp: 100,
    maxHp: 100,
    elementHP: document.getElementById("health-enemy2"),
    elementBar: document.getElementById("progressbar-enemy2"),
    updateHp: character.updateHp,
    attack: character.attack
};

document.getElementById("dbtn-kick").addEventListener("click", function () {
    character.attack(enemy);
    enemy.attack(character);
    if (Winner()) return;
});

document.getElementById("kbtn-kick").addEventListener("click", function () {
    character.attack(enemy, 10, 25);
    enemy.attack(character, 5, 15);
    if (Winner()) return;
});

function showResult(message) {
    const screen = document.getElementById("Result_Window");
    const text = document.getElementById("Result_Text");
    text.textContent = message;
    screen.style.display = "flex"; 
}

function Winner() {
    if (character.hp === 0 && enemy.hp ===0) {
        showResult("Нічия!");
        return true;     
    } 
    if(character.hp ===0){   
        showResult(`🎉${enemy.name} Переміг! 🎉`)
        return true;
    }
    if(enemy.hp ===0){
        showResult(`🎉${character.name} Переміг! 🎉`)
        return true
    }
    return false;
}

document.getElementById("Restart_Button").addEventListener("click", function () {
    location.reload(); 
});
