export class Pokemon {
  constructor(id, data) {
    this.name = data.name;
    this.hp = data.hp;
    this.maxHp = data.hp;
    this.attacks = data.attacks;
    this.img = data.img;
    this.type = data.type;

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
    window.addLog(logText, type); 
  }
}
