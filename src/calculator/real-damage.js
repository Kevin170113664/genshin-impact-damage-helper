import sum from 'lodash/sum';
import values from 'lodash/values';
import {round2} from './rounding';

export class Calculator {
  constructor({attack, criticalRatio, criticalDamage, ratio, level, damageBoost}, targetStatistics) {
    this.attack = attack;
    this.criticalRatio = criticalRatio;
    this.criticalDamage = criticalDamage;
    this.ratio = ratio;
    this.level = level;
    this.damageBoost = this.initDamageBoost(damageBoost);

    this.target = targetStatistics
  }

  calculate() {
    const attack = this.attack * this.levelMultiplier;

    const normalDamage = attack * this.ratio * (1 - this.target.resistRatio) * this.damageBoostMultiplier;
    const criticalDamage = attack * this.ratio * (1 - this.target.resistRatio) * (1 + this.criticalDamage) * this.damageBoostMultiplier;
    const damageExpectation = this.criticalRatio * criticalDamage + (1 - this.criticalRatio) * normalDamage;

    return [round2(damageExpectation), round2(normalDamage), round2(criticalDamage)]
  }

  get levelMultiplier() {
    if (this.target.level - this.level >= 70 && this.level <= 10) {
      return (this.level + 100) / (this.level + this.target.level + 200) * 0.5
    }

    return (this.level + 100) / (this.level + this.target.level + 200)
  }

  get damageBoostMultiplier() {
    return 1 + sum(values(this.damageBoost))
  }

  initDamageBoost(damageBoost) {
    return {
      pyro: 0,
      hydro: 0,
      dendro: 0,
      electro: 0,
      anemo: 0,
      cryo: 0,
      geo: 0,
      physical: 0,
      other: 0,
      ...damageBoost
    }
  }
}
