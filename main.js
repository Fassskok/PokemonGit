const character = {
    name: "Pikachu",
    hp: 100,
    maxHp: 100,
    elementHP: document.getElementById("health-character"),
    elementBar: document.getElementById("progressbar-character"),
};

const enemy = {
    name: "Charmander",
    hp: 100,
    maxHp: 100,
    elementHP: document.getElementById("health-enemy"),
    elementBar: document.getElementById("progressbar-enemy"),
};

const enemy2 = {
    name: "Mewtwo",
    hp: 100,
    maxHp: 100,
    elementHP: document.getElementById("health-enemy2"),
    elementBar: document.getElementById("progressbar-enemy2"),
};

function updateHp(pokemon) {
    pokemon.elementBar.style.width = (pokemon.hp / pokemon.maxHp * 100) + "%";
    pokemon.elementHP.textContent = `${pokemon.hp} / 100`;

    if (pokemon.hp > 75) {
        pokemon.elementBar.style.background = "lime";
    } else if(pokemon.hp > 50){
        pokemon.elementBar.style.background = "yellow";
    } else if(pokemon.hp >20){
        pokemon.elementBar.style.background = "orange";
    } else{
        pokemon.elementBar.style.background = "red";
    }
}

function attack(attacker, defender, minDamage=2, maxDamage=15) {
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    defender.hp = Math.max(0, defender.hp - damage);
    updateHp(defender);
    console.log(`${attacker.name} атакує ${defender.name} на ${damage} урона!`);
}

document.getElementById("dbtn-kick").addEventListener("click", function () { //дефолт
    attack(character, enemy);
    attack(enemy, character);
    if (Winner()) return; 
});

document.getElementById("kbtn-kick").addEventListener("click", function () { //крит
    attack(character, enemy, 10, 25);  
    attack(enemy, character, 5, 15);  
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