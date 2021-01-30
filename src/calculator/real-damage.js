import {round2} from './rounding';

export class Calculator {
  constructor({attack, criticalRatio, criticalDamage, ratio, level}, targetStatistics) {
    this.attack = attack;
    this.criticalRatio = criticalRatio;
    this.criticalDamage = criticalDamage;
    this.ratio = ratio;
    this.level = level;

    this.target = targetStatistics
  }

  calculate() {
    const attack = this.attack * this.levelMultiplier;

    const normalDamage = attack * this.ratio * (1 - this.target.resistRatio);
    const criticalDamage = attack * this.ratio * (1 - this.target.resistRatio) * (1 + this.criticalDamage);
    const damageExpectation = this.criticalRatio * criticalDamage + (1 - this.criticalRatio) * normalDamage;

    return [round2(damageExpectation), round2(normalDamage), round2(criticalDamage)]
  }

  get levelMultiplier() {
    if (this.target.level - this.level >= 70 && this.level <= 10) {
      return (this.level + 100) / (this.level + this.target.level + 200) * 0.5
    }

    return (this.level + 100) / (this.level + this.target.level + 200)
  }
}
