import sum from 'lodash/sum';
import values from 'lodash/values';
import {round2} from './rounding';
import {E} from '../constant/element';

export class Calculator {
  constructor({attack, attackType, criticalRatio, criticalDamage, ratio, level, damageBoost}, targetStatistics) {
    this.attack = attack;
    this.attackType = attackType;
    this.criticalRatio = criticalRatio;
    this.criticalDamage = criticalDamage;
    this.ratio = ratio;
    this.level = level;
    this.damageBoost = this.initDamageBoost(damageBoost);

    this.target = targetStatistics
  }

  calculate() {
    const attack = this.attack * this.levelMultiplier;
    const resistantMultiplier = 1 - this.target.resistRatio;

    const normalDamage = attack * this.ratio * resistantMultiplier * this.damageBoostMultiplier * this.elementReactionMultiplier;
    const criticalDamage = attack * this.ratio * resistantMultiplier * (1 + this.criticalDamage) * this.damageBoostMultiplier * this.elementReactionMultiplier;
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
