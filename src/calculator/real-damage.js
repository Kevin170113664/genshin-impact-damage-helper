import {round2} from './rounding';
import {E} from '../constant/element';
import {ATTACK_TYPE} from '../constant/attack-type';

export class Calculator {
  constructor({attack, attackType, criticalRatio, criticalDamage, ratio, level, damageBoost}, targetStatistics) {
    this.attack = attack;
    this.attackType = attackType;
    this.criticalRatio = criticalRatio;
    this.criticalDamage = criticalDamage;
    this.ratio = ratio;
    this.level = level;

    this.damageBoost = this.initDamageBoost(damageBoost);
    this.target = this.initTargetStatistics(targetStatistics)
  }

  calculate() {
    const normalDamage = this.attackMultiplier * this.ratioMultiplier * this.resistantMultiplier * this.damageBoostMultiplier * this.elementReactionMultiplier;
    const criticalDamage = this.attackMultiplier * this.ratioMultiplier * this.resistantMultiplier * this.damageBoostMultiplier * this.elementReactionMultiplier * this.criticalMultiplier;
    const damageExpectation = this.criticalRatio * criticalDamage + (1 - this.criticalRatio) * normalDamage;

    return [round2(damageExpectation), round2(normalDamage), round2(criticalDamage)]
  }

  get attackMultiplier() {
    const baseLevelMultiplier = (this.level + 100) / (this.level + 100 + (this.target.level + 100) * this.target.defence);
    if (this.target.level - this.level >= 70 && this.level <= 10) {
      return this.attack * baseLevelMultiplier * 0.5
    }

    return this.attack * baseLevelMultiplier
  }

  get ratioMultiplier() {
    return this.ratio
  }

  get damageBoostMultiplier() {
    return 1 + this.damageBoost.other + (this.damageBoost[this.attackType] || 0)
  }

  get elementReactionMultiplier() {
    if (this.attackType === E.CRYO && this.target.attachedElement === E.PYRO) {
      return 1.5
    }
    if (this.attackType === E.PYRO && this.target.attachedElement === E.CRYO) {
      return 2
    }
    if (this.attackType === E.PYRO && this.target.attachedElement === E.HYDRO) {
      return 1.5
    }
    if (this.attackType === E.HYDRO && this.target.attachedElement === E.PYRO) {
      return 2
    }
    return 1;
  }

  get resistantMultiplier() {
    if (this.target.resistRatio > 0.75) {
      return 1 / (1 + 4 * this.target.resistRatio)
    }
    if (this.target.resistRatio < 0) {
      return 1 - (this.target.resistRatio / 2)
    }
    return 1 - this.target.resistRatio
  }

  get criticalMultiplier() {
    return 1 + this.criticalDamage
  }

  initDamageBoost(damageBoost) {
    return {
      [ATTACK_TYPE.PYRO]: 0,
      [ATTACK_TYPE.HYDRO]: 0,
      [ATTACK_TYPE.DENTRO]: 0,
      [ATTACK_TYPE.ELECTRO]: 0,
      [ATTACK_TYPE.ANEMO]: 0,
      [ATTACK_TYPE.CRYO]: 0,
      [ATTACK_TYPE.GEO]: 0,
      [ATTACK_TYPE.PHYSICAL]: 0,
      other: 0,
      ...damageBoost
    }
  }

  initTargetStatistics(targetStatistics) {
    return {
      level: 100,
      defence: 1,
      resistRatio: 0.1,
      attachedElement: undefined,
      ...targetStatistics
    }
  }
}
