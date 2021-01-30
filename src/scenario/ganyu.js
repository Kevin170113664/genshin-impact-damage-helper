import {WEAPON_AMOS_BOW, WEAPON_PROTOTYPE_CRESCENT} from '../constant/weapon';
import {round0, round2} from '../calculator/rounding';
import {E} from '../constant/element';

export class Scenario {
  constructor(characterStats, weaponStats) {
    this.characterStats = {...characterStats};
    delete this.characterStats.basicAttack;
    delete this.characterStats.additionalAttack;
    delete this.characterStats.constellation;
    this.basicAttack = characterStats.basicAttack;
    this.additionalAttack = characterStats.additionalAttack;
    this.constellation = characterStats.constellation;
    this.weaponStats = weaponStats;
  }

  generate() {
    if (this.weaponStats.name === WEAPON_AMOS_BOW.name) {
      return this.generateAmosScenarios()
    }

    return this.generateCrescentScenarios();
  }

  generateAmosScenarios() {
    return [
      {
        description: '贴脸二段蓄力射，霜华矢不足0.1秒即击中敌人',
        characterStats: {
          attack: 2358,
          criticalRatio: 0.25,
          criticalDamage: 2.4,
          level: 90,
          mastery: 0,
          talentLevels: [11, 13, 13],
          damageBoost: {
            [E.CRYO]: 0.616,
            other: 0.12
          }
        }
      },
      {
        description: '和怪的距离为一个冰雨半径，霜华矢吃2段加成，霜华绽放吃满5段加成',
        characterStats: {
          attack: 2358,
          criticalRatio: 0.25,
          criticalDamage: 2.4,
          level: 90,
          mastery: 0,
          talentLevels: [11, 13, 13],
          damageBoost: {
            [E.CRYO]: 0.616,
            other: 0.28
          }
        }
      },
      {
        description: '和怪的距离超过一个冰雨直径，二段蓄力射均吃满加成',
        characterStats: {
          attack: 2358,
          criticalRatio: 0.25,
          criticalDamage: 2.4,
          level: 90,
          mastery: 0,
          talentLevels: [11, 13, 13],
          damageBoost: {
            [E.CRYO]: 0.616,
            other: 0.52
          }
        }
      },
      {
        description: '阿莫斯之弓对元素战技和元素爆发没有加成',
        characterStats: {
          attack: 2358,
          criticalRatio: 0.25,
          criticalDamage: 2.4,
          level: 90,
          mastery: 0,
          talentLevels: [11, 13, 13],
          damageBoost: {
            [E.CRYO]: 0.616
          }
        }
      }
    ]
  }

  generateCrescentScenarios() {
    const attackIncreaseRatio = WEAPON_PROTOTYPE_CRESCENT.refine[this.weaponStats.refineRank]
    const shatteringIceBonus = 0.15
    const undividedHeartBonus = this.characterStats.level > 20 ? 0.2 : 0
    const blizzardStrayerBonus = 0.2
    const PassiveTalentBonus = this.characterStats.level > 70 ? 0.2 : 0;
    const targetResistanceReduction = this.constellation >= 1 ? 0.15 : 0;

    const scenario1 = {
      description: '发动试做澹月特效前',
      characterStats: {
        ...this.characterStats,
        attack: this.basicAttack + this.additionalAttack,
      }
    };

    const scenario2 = {
      description: '发动试做澹月特效后(双冰共鸣，20突破天赋，冰套4)',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack * (1 + attackIncreaseRatio) + this.additionalAttack),
        criticalRatio: round2(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
      },
      targetStats: {
        resistRatio: round2(0.1 - targetResistanceReduction)
      }
    };

    const scenario3 = {
      description: '发动试做澹月特效后站在冰雨内(双冰共鸣，20突破天赋，冰套4)',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack * (1 + attackIncreaseRatio) + this.additionalAttack),
        criticalRatio: round2(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
        damageBoost: {
          ...this.characterStats.damageBoost,
          other: round2((this.characterStats.damageBoost.other || 0) + PassiveTalentBonus)
        }
      },
      targetStats: {
        resistRatio: round2(0.1 - targetResistanceReduction)
      }
    };

    if (this.constellation >= 4) {
      const forthConstellationMaxBonus = 0.25;
      const scenario4 = {
        description: '发动试做澹月特效后站在冰雨内吃满4命增伤(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          ...this.characterStats,
          attack: round0(this.basicAttack * (1 + attackIncreaseRatio) + this.additionalAttack),
          criticalRatio: round2(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
          damageBoost: {
            ...this.characterStats.damageBoost,
            other: round2((this.characterStats.damageBoost.other || 0) + PassiveTalentBonus + forthConstellationMaxBonus)
          }
        },
        targetStats: {
          resistRatio: round2(0.1 - targetResistanceReduction)
        }
      }
      return [scenario1, scenario2, scenario3, scenario4]
    }

    return [scenario1, scenario2, scenario3]
  }
}