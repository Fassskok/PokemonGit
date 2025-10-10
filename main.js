class Pokemon {
    constructor(name, hp, healthId, barId) {
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.elementHP = document.getElementById(healthId);
        this.elementBar = document.getElementById(barId);
    }

    updateHp() {
        this.elementBar.style.width = (this.hp / this.maxHp * 100) + "%";
        this.elementHP.textContent = `${this.hp} / ${this.maxHp}`;

        if (this.hp > 75) {
            this.elementBar.style.background = "lime";
        } else if (this.hp > 50) {
            this.elementBar.style.background = "yellow";
        } else if (this.hp > 20) {
            this.elementBar.style.background = "orange";
        } else {
            this.elementBar.style.background = "red";
        }
    }

    attack(defender, minDamage = 2, maxDamage = 15) {
        const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
        defender.hp = Math.max(0, defender.hp - damage);
        defender.updateHp();
        console.log(`${this.name} атакує ${defender.name} на ${damage} урона!`);
    }
}

const character = new Pokemon("Pikachu", 100, "health-character", "progressbar-character");
const enemy = new Pokemon("Charmander", 100, "health-enemy", "progressbar-enemy");
const enemy2 = new Pokemon("Mewtwo", 100, "health-enemy2", "progressbar-enemy2");

function showResult(message) {
    const screen = document.getElementById("Result_Window");
    const text = document.getElementById("Result_Text");
    text.textContent = message;
    screen.style.display = "flex";
}

function Winner() {
    if (character.hp === 0 && enemy.hp === 0) {
        showResult("Нічия!");
        return true;
    }
    if (character.hp === 0) {
        showResult(`🎉 ${enemy.name} Переміг! 🎉`);
        return true;
    }
    if (enemy.hp === 0) {
        showResult(`🎉 ${character.name} Переміг! 🎉`);
        return true;
    }
    return false;
}

document.getElementById("dbtn-kick").addEventListener("click", () => {
    character.attack(enemy);
    enemy.attack(character);
    if (Winner()) return;
});

document.getElementById("kbtn-kick").addEventListener("click", () => {
    character.attack(enemy, 10, 25);
    enemy.attack(character, 5, 15);
    if (Winner()) return;
});

document.getElementById("Restart_Button").addEventListener("click", () => location.reload());
