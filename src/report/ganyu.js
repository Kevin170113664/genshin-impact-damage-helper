import {Calculator} from '../calculator/real-damage';
import {TALENT_GANYU} from '../constant/talent';
import {ATTACK_TYPE} from '../constant/attack-type';
import {round2} from '../calculator/rounding';

export class Report {
  constructor(ganyuStats) {
    this.ganyuStats = this.initCharacterStats(ganyuStats);
    this.targetStats = {
      level: 85,
      resistRatio: 0.1
    }
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
      talentLevels: [1, 1, 1],
      damageBoost: {},
      ...ganyuStats
    };
  }

  generate() {
    return {
      chargeLevel2: this.buildChargeLevel2Report(),
      elementalSkill: this.buildElementalSkillReport(),
      elementalBurst: this.buildElementalBurstReport(),
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