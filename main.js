const logsDiv = document.createElement("div");
logsDiv.id = "logs";
document.body.appendChild(logsDiv); 

function createCharacter(id, name) {
  const elementHP = document.getElementById(`health-${id}`);
  const elementBar = document.getElementById(`progressbar-${id}`);
  const maxHp = 100;

  function updateHp() {
    const { hp, elementHP, elementBar } = this;
    elementBar.style.width = (hp / maxHp * 100) + "%";
    elementHP.textContent = `${hp} / ${maxHp}`;
    elementBar.style.background =
      hp > 75 ? "lime" :
      hp > 50 ? "yellow" :
      hp > 20 ? "orange" : "red";
  }

  function attack(defender, minDamage = 2, maxDamage = 15) {
    const { name: attackerName } = this;
    const { name: defenderName } = defender;
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    defender.hp = Math.max(0, defender.hp - damage);
    defender.updateHp();

    const logText = `${attackerName} атакує ${defenderName} на ${damage} урона! ${defenderName} має ${defender.hp} HP.`;

    const type = this === character ? "hero" : "enemy";
    addLog(logText, type);
  }

  return {
    name,
    hp: maxHp,
    maxHp,
    elementHP,
    elementBar,
    updateHp,
    attack,
  };
}

const character = createCharacter("character", "Pikachu");
const enemy = createCharacter("enemy", "Charmander");
const enemy2 = createCharacter("enemy2", "Mewtwo");

function addLog(message, type = "neutral") {
  const logs = document.getElementById("logs");
  const p = document.createElement("p");
  p.textContent = message;

  if (type === "hero") {
    p.style.color = "lime";
  } else if (type === "enemy") {
    p.style.color = "red";
  } else {
    p.style.color = "white";
  }

  logs.prepend(p);
}

function showResult(message) {
  const screen = document.getElementById("Result_Window");
  const text = document.getElementById("Result_Text");
  text.textContent = message;
  screen.style.display = "flex";
}

function Winner() {
  const { hp: chHp, name: chName } = character;
  const { hp: enHp, name: enName } = enemy;

  if (chHp === 0 && enHp === 0) {
    showResult("Нічия!");
    addLog("Нічия!");
    return true;
  }
  if (chHp === 0) {
    showResult(`🎉 ${enName} Переміг! 🎉`);
    addLog(`${enName} виграв бій!`);
    return true;
  }
  if (enHp === 0) {
    showResult(`🎉 ${chName} Переміг! 🎉`);
    addLog(`${chName} виграв бій!`);
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

document.getElementById("Restart_Button").addEventListener("click", () => {
  location.reload();
});
