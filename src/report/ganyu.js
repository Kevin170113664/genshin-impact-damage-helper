import min from 'lodash/min';
import {Calculator} from '../calculator/real-damage';
import {TALENT_GANYU} from '../constant/talent';
import {ATTACK_TYPE} from '../constant/attack-type';
import {round2} from '../calculator/rounding';
import {WEAPON_AMOS_BOW} from '../constant/weapon';

export class Report {
  constructor(ganyuStats, targetStats, weaponStats) {
    this.ganyuStats = this.initCharacterStats(ganyuStats);
    this.targetStats = this.initTargetStats(targetStats);
    this.weaponStats = this.initWeaponStats(weaponStats);
  }

  initCharacterStats(ganyuStats) {
    return {
      attack: 0,
      attackType: ATTACK_TYPE.CRYO,
      criticalRatio: 0.05,
      criticalDamage: 0.50,
      ratio: 0,
      level: 1,
      mastery: 0,
      constellation: 0,
      talentLevels: [1, 1, 1],
      damageBoost: {},
      ...ganyuStats
    };
  }

  initTargetStats(targetStats) {
    return {
      level: 85,
      resistRatio: 0.1,
      ...targetStats
    }
  }

  initWeaponStats(weaponStats) {
    return {
      refineRank: 1,
      ...weaponStats
    }
  }

  generate() {
    if (this.weaponStats.name === WEAPON_AMOS_BOW.name) {
      if (this.weaponStats.isChargedAttack) {
        return {
          chargeLevel2: this.buildAmosChargeLevel2Report()
        }
      }
      return {
        elementalSkill: this.buildElementalSkillReport(),
        elementalBurst: this.buildElementalBurstReport(),
      }
    }
    return {
      chargeLevel2: this.buildChargeLevel2Report(),
      elementalSkill: this.buildElementalSkillReport(),
      elementalBurst: this.buildElementalBurstReport(),
    }
  }

  buildAmosChargeLevel2Report() {
    const [normalTalentLevel] = this.ganyuStats.talentLevels;
    const stats = {
      ...this.ganyuStats,
      ratio: TALENT_GANYU.normal[normalTalentLevel].frostflakeArrow,
    }
    const frostflakeArrow = new Calculator(stats, this.targetStats).calculate()

    const [, amosChargeAttackAdditionalBonus] = WEAPON_AMOS_BOW.refine[this.weaponStats.refineRank]
    const targetResistanceReduction = this.ganyuStats.constellation >= 1 ? 0.15 : 0;
    const amosArrowFlyBounsMaxTimes = 5;
    const frostflakeFlyBonusTimes = parseInt(this.weaponStats.arrowFlyElapsed / 0.1);
    const frostflakeBloomFlyBonusTimes = min([3, amosArrowFlyBounsMaxTimes - frostflakeFlyBonusTimes])
    const amosArrowFlyElapsedBonus = frostflakeBloomFlyBonusTimes * amosChargeAttackAdditionalBonus;
    const bloomStats = {
      ...this.ganyuStats,
      ratio: TALENT_GANYU.normal[normalTalentLevel].frostflakeArrowBloom,
      damageBoost: {
        ...this.ganyuStats.damageBoost,
        other: round2(this.ganyuStats.damageBoost.other + amosArrowFlyElapsedBonus)
      }
    }
    const targetStats = {
      ...this.targetStats,
      resistRatio: round2(0.1 - targetResistanceReduction)
    }

    const frostflakeArrowBloom = new Calculator(bloomStats, targetStats).calculate()

    return {
      frostflakeArrow: {
        damageExpectation: frostflakeArrow[0],
        normalDamage: frostflakeArrow[1],
        criticalDamage: frostflakeArrow[2]
      },
      frostflakeArrowBloom: {
        damageExpectation: frostflakeArrowBloom[0],
        normalDamage: frostflakeArrowBloom[1],
        criticalDamage: frostflakeArrowBloom[2]
      }
    }
  }

  buildChargeLevel2Report() {
    const [normalTalentLevel] = this.ganyuStats.talentLevels;
    const stats = {
      ...this.ganyuStats,
      ratio: TALENT_GANYU.normal[normalTalentLevel].frostflakeArrow,
    }
    const bloomStats = {
      ...this.ganyuStats,
      ratio: TALENT_GANYU.normal[normalTalentLevel].frostflakeArrowBloom,
    }
    const frostflakeArrow = new Calculator(stats, this.targetStats).calculate()
    const frostflakeArrowBloom = new Calculator(bloomStats, this.targetStats).calculate()

    return {
      frostflakeArrow: {
        damageExpectation: frostflakeArrow[0],
        normalDamage: frostflakeArrow[1],
        criticalDamage: frostflakeArrow[2]
      },
      frostflakeArrowBloom: {
        damageExpectation: frostflakeArrowBloom[0],
        normalDamage: frostflakeArrowBloom[1],
        criticalDamage: frostflakeArrowBloom[2]
      }
    }
  }

  buildElementalSkillReport() {
    const [, skillTalentLevel] = this.ganyuStats.talentLevels;
    const stats = {
      ...this.ganyuStats,
      ratio: TALENT_GANYU.skill[skillTalentLevel],
    }
    const elementalSkill = new Calculator(stats, this.targetStats).calculate()

    return {
      '1-hit': {
        damageExpectation: elementalSkill[0],
        normalDamage: elementalSkill[1],
        criticalDamage: elementalSkill[2]
      },
      '2-hit': {
        damageExpectation: elementalSkill[0],
        normalDamage: elementalSkill[1],
        criticalDamage: elementalSkill[2]
      }
    }
  }

  buildElementalBurstReport() {
    const burstMaxHits = 51;
    const [, , burstTalentLevel] = this.ganyuStats.talentLevels;
    const stats = {
      ...this.ganyuStats,
      ratio: TALENT_GANYU.burst[burstTalentLevel],
    }
    const elementalBurst = new Calculator(stats, this.targetStats).calculate()

    return {
      singleIceShard: {
        damageExpectation: elementalBurst[0],
        normalDamage: elementalBurst[1],
        criticalDamage: elementalBurst[2]
      },
      allIceShard: {
        damageExpectation: round2(elementalBurst[0] * burstMaxHits),
        normalDamage: round2(elementalBurst[1] * burstMaxHits),
        criticalDamage: round2(elementalBurst[2] * burstMaxHits)
      }
    }
  }
}