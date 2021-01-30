import {round2} from './rounding';
import {E} from '../constant/element';
import {ATTACK_TYPE} from '../constant/attack-type';

export class Calculator {
  constructor({
                attack,
                attackType,
                criticalRatio,
                criticalDamage,
                ratio,
                level,
                mastery,
                damageBoost
              }, targetStatistics) {
    this.attack = attack;
    this.attackType = attackType;
    this.criticalRatio = criticalRatio;
    this.criticalDamage = criticalDamage;
    this.ratio = ratio;
    this.level = level;
    this.mastery = mastery || 0;

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
    // SP = 1 + MR + RE + AE
    // MR = k * 25EM / 9 * (EM + 1400)
    // 其中k为类型系数，融化，蒸发为1，聚变为2.4。
    // EM(Element Ratio)为元素精通数值，受到角色突破，角色天赋，武器副词缀，圣遗物主词条，圣遗物副词条，圣遗物套装效果影响。
    // AE(Amplification Enhance)为增幅强度 魔女4蒸发融化增强15%
    // RE(Reaction Enhancement)为反应增强 莫娜命之座1增强与水相关的反应15%
    const typeMultiplier = {
      vaporize: 1,
      melt: 1,
      overloaded: 2.4,
      superconduct: 2.4,
      electroCharged: 2.4,
      shattered: 2.4,
      swirl: 2.4
    }
    const reactionMultiplier = {
      cryoPyroMelt: 1.5,
      pyroCryoMelt: 2,
      pyroHydroVaporize: 1.5,
      hydroPyroVaporize: 2,
    }
    const masteryBoost = (typeMultiplier.melt * 25 * this.mastery) / (9 * (this.mastery + 1400))
    if (this.attackType === E.CRYO && this.target.attachedElement === E.PYRO) {
      return (1 + masteryBoost) * reactionMultiplier.cryoPyroMelt
    }
    if (this.attackType === E.PYRO && this.target.attachedElement === E.CRYO) {
      return (1 + masteryBoost) * reactionMultiplier.pyroCryoMelt
    }
    if (this.attackType === E.PYRO && this.target.attachedElement === E.HYDRO) {
      return (1 + masteryBoost) * reactionMultiplier.pyroHydroVaporize
    }
    if (this.attackType === E.HYDRO && this.target.attachedElement === E.PYRO) {
      return (1 + masteryBoost) * reactionMultiplier.hydroPyroVaporize
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
