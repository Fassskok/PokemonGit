import { Pokemon } from "./pokemon.js";

const logsDiv = document.createElement("div");
logsDiv.id = "logs";
document.body.appendChild(logsDiv);

function addLog(message, type = "neutral") {
  const logs = document.getElementById("logs");
  const p = document.createElement("p");
  p.textContent = message;

  if (type === "hero") p.style.color = "lime";
  else if (type === "enemy") p.style.color = "red";
  else p.style.color = "white";

  logs.prepend(p);
}
window.addLog = addLog;

const character = new Pokemon("character", "Pikachu");
const enemy = new Pokemon("enemy", "Charmander");
character.isHero = true;

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

const clickCounter = (limit = 6) => {
  let count = 0;
  return (btn) => {
    if (count < limit) {
      count++;
      const remaining = limit - count;
      btn.textContent = `Клік ${count} (залишилось ${remaining})`;
    } else {
      btn.textContent = `Ліміт ${limit} вичерпано`;
      btn.disabled = true;
    }
  };
};

document.querySelectorAll("button").forEach(btn => {
  const handleClick = clickCounter(6);
  btn.addEventListener("click", () => handleClick(btn));
});

document.getElementById("dbtn-kick").addEventListener("click", () => {
  character.attack(enemy);
  enemy.attack(character);
  Winner();
});

document.getElementById("kbtn-kick").addEventListener("click", () => {
  character.attack(enemy, 10, 25);
  enemy.attack(character, 5, 15);
  Winner();
});

document.getElementById("Restart_Button").addEventListener("click", () => {
  location.reload();
});
