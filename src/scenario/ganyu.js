import {WEAPON_PROTOTYPE_CRESCENT} from '../constant/weapon';
import {round0, round2} from '../calculator/rounding';

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