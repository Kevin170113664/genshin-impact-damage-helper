import {WEAPON_AMOS_BOW, WEAPON_PROTOTYPE_CRESCENT, WEAPON_SKYWARD_HARP} from '../constant/weapon';
import {round0, round2, round3} from '../calculator/rounding';

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
    if (this.weaponStats.name === WEAPON_SKYWARD_HARP.name) {
      return this.generateSkywardScenarios()
    }

    if (this.weaponStats.name === WEAPON_AMOS_BOW.name) {
      return this.generateAmosScenarios()
    }

    return this.generateCrescentScenarios();
  }

  generateSkywardScenarios() {
    const shatteringIceBonus = 0.15
    const blizzardStrayerBonus = 0.2
    const undividedHeartBonus = this.characterStats.level > 20 ? 0.2 : 0
    const PassiveTalentBonus = this.characterStats.level > 70 ? 0.2 : 0;
    const targetResistanceReduction = this.constellation >= 1 ? 0.15 : 0;

    const scenario1 = {
      description: '怪没有冰附着',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack + this.additionalAttack),
      },
    };
    const scenario2 = {
      description: '怪被冰元素附着(双冰共鸣，20突破天赋，冰套4)',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack + this.additionalAttack),
        criticalRatio: round3(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus)
      },
      targetStats: {
        resistRatio: round2(0.1 - targetResistanceReduction)
      }
    };

    if (this.constellation >= 4) {
      const forthConstellationMaxBonus = 0.25;
      const scenario3 = {
        description: '怪物被冰附着，站冰雨内吃满4命增伤(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          ...this.characterStats,
          attack: round0(this.basicAttack + this.additionalAttack),
          criticalRatio: round3(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
          damageBoost: {
            ...this.characterStats.damageBoost,
            other: round2((this.characterStats.damageBoost.other || 0) + PassiveTalentBonus + forthConstellationMaxBonus)
          }
        },
        targetStats: {
          resistRatio: round2(0.1 - targetResistanceReduction)
        },
      };
      return [scenario1, scenario2, scenario3]
    }
    return [scenario1, scenario2]
  }

  generateAmosScenarios() {
    const [amosChargeAttackBonus, amosChargeAttackAdditionalBonus] = WEAPON_AMOS_BOW.refine[this.weaponStats.refineRank]
    const shatteringIceBonus = 0.15
    const blizzardStrayerBonus = 0.2
    const undividedHeartBonus = this.characterStats.level > 20 ? 0.2 : 0
    const PassiveTalentBonus = this.characterStats.level > 70 ? 0.2 : 0;
    const targetResistanceReduction = this.constellation >= 1 ? 0.15 : 0;

    const scenario1 = {
      description: '贴脸二段蓄力射，霜华矢不足0.1秒即击中敌人',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack + this.additionalAttack),
        damageBoost: {
          ...this.characterStats.damageBoost,
          other: round2((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus)
        }
      },
      weaponStats: {
        name: WEAPON_AMOS_BOW.name,
        refineRank: this.weaponStats.refineRank,
        isChargedAttack: true,
        arrowFlyElapsed: 0
      }
    };
    const scenario2 = {
      description: '和怪的距离为一个冰雨半径，霜华矢吃2段加成，霜华绽放吃满5段加成',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack + this.additionalAttack),
        damageBoost: {
          ...this.characterStats.damageBoost,
          other: round2((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus + amosChargeAttackAdditionalBonus * 2)
        }
      },
      weaponStats: {
        name: WEAPON_AMOS_BOW.name,
        refineRank: this.weaponStats.refineRank,
        isChargedAttack: true,
        arrowFlyElapsed: 0.2
      }
    };
    const scenario3 = {
      description: '和怪的距离超过一个冰雨直径，二段蓄力射均吃满加成',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack + this.additionalAttack),
        damageBoost: {
          ...this.characterStats.damageBoost,
          other: round2((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus + amosChargeAttackAdditionalBonus * 5)
        }
      },
      weaponStats: {
        name: WEAPON_AMOS_BOW.name,
        refineRank: this.weaponStats.refineRank,
        isChargedAttack: true,
        arrowFlyElapsed: 0.5
      }
    };
    const scenario4 = {
      description: '蓄力二段吃满阿莫斯加成，怪物为冰附着(双冰共鸣，20突破天赋，冰套4)',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack + this.additionalAttack),
        criticalRatio: round3(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
        damageBoost: {
          ...this.characterStats.damageBoost,
          other: round2((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus + amosChargeAttackAdditionalBonus * 5)
        }
      },
      targetStats: {
        resistRatio: round2(0.1 - targetResistanceReduction)
      },
      weaponStats: {
        name: WEAPON_AMOS_BOW.name,
        refineRank: this.weaponStats.refineRank,
        isChargedAttack: true,
        arrowFlyElapsed: 0.5
      }
    };
    const scenario6 = {
      description: '阿莫斯之弓对元素战技和元素爆发没有加成',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack + this.additionalAttack),
      },
      weaponStats: {
        name: WEAPON_AMOS_BOW.name,
        refineRank: this.weaponStats.refineRank
      }
    };

    if (this.constellation >= 4) {
      const forthConstellationMaxBonus = 0.25;
      const scenario5 = {
        description: '蓄力二段吃满阿莫斯加成，怪物为冰附着，站冰雨内吃满4命增伤(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          ...this.characterStats,
          attack: round0(this.basicAttack + this.additionalAttack),
          criticalRatio: round3(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
          damageBoost: {
            ...this.characterStats.damageBoost,
            other: round2((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus + amosChargeAttackAdditionalBonus * 5 + PassiveTalentBonus + forthConstellationMaxBonus)
          }
        },
        targetStats: {
          resistRatio: round2(0.1 - targetResistanceReduction)
        },
        weaponStats: {
          name: WEAPON_AMOS_BOW.name,
          refineRank: this.weaponStats.refineRank,
          isChargedAttack: true,
          arrowFlyElapsed: 0.5
        }
      };
      return [scenario1, scenario2, scenario3, scenario4, scenario5, scenario6]
    }

    return [scenario1, scenario2, scenario3, scenario4, scenario6]
  }

  generateCrescentScenarios() {
    const attackIncreaseRatio = WEAPON_PROTOTYPE_CRESCENT.refine[this.weaponStats.refineRank]
    const shatteringIceBonus = 0.15
    const blizzardStrayerBonus = 0.2
    const undividedHeartBonus = this.characterStats.level > 20 ? 0.2 : 0
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
        criticalRatio: round3(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
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