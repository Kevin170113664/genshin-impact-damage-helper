import {WEAPON_PROTOTYPE_CRESCENT} from '../constant/weapon';
import {round0} from '../calculator/rounding';

export class Scenario {
  constructor(characterStats, weaponStats) {
    this.characterStats = {...characterStats};
    delete this.characterStats.basicAttack;
    delete this.characterStats.additionalAttack;
    this.basicAttack = characterStats.basicAttack;
    this.additionalAttack = characterStats.additionalAttack;
    this.weaponStats = weaponStats;
  }

  generate() {
    const attackIncreaseRatio = WEAPON_PROTOTYPE_CRESCENT.refine[this.weaponStats.refineRank]
    const undividedHeartBonus = this.characterStats.level > 20 ? 0.2 : 0

    return [
      {
        description: '发动试做澹月特效前',
        characterStats: {
          ...this.characterStats,
          attack: this.basicAttack + this.additionalAttack,
        }
      },
      {
        description: '发动试做澹月特效后',
        characterStats: {
          ...this.characterStats,
          attack: round0(this.basicAttack * (1 + attackIncreaseRatio) + this.additionalAttack),
          criticalRatio: this.characterStats.criticalRatio + undividedHeartBonus
        }
      }
    ]
  }
}