export class Pokemon {
  constructor(id, name) {
    this.name = name;
    this.hp = 100;
    this.maxHp = 100;
    this.elementHP = document.getElementById(`health-${id}`);
    this.elementBar = document.getElementById(`progressbar-${id}`);
    this.updateHp();
  }

  updateHp() {
    const percent = (this.hp / this.maxHp) * 100;
    this.elementBar.style.width = percent + "%";
    this.elementHP.textContent = `${this.hp} / ${this.maxHp}`;
    this.elementBar.style.background =
      this.hp > 75 ? "lime" :
      this.hp > 50 ? "yellow" :
      this.hp > 20 ? "orange" : "red";
  }

  attack(defender, minDamage = 2, maxDamage = 15) {
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    defender.hp = Math.max(0, defender.hp - damage);
    defender.updateHp();

    const logText = `${this.name} атакує ${defender.name} на ${damage} урона! ${defender.name} має ${defender.hp} HP.`;
    const type = this.isHero ? "hero" : "enemy";
    addLog(logText, type);
  }
}
