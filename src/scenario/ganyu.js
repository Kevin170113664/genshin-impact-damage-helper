import {WEAPON_AMOS_BOW, WEAPON_PROTOTYPE_CRESCENT, WEAPON_SKYWARD_HARP} from '../constant/weapon';
import {round0, round2, round3} from '../calculator/rounding';
import {BLIZZARD_STRAYER, WANDERER_TROUPE} from '../constant/artifact';
import {E} from '../constant/element';

export class Scenario {
  constructor(characterStats, weaponStats) {
    this.characterStats = {...characterStats};
    delete this.characterStats.basicAttack;
    delete this.characterStats.additionalAttack;
    this.basicAttack = characterStats.basicAttack;
    this.additionalAttack = characterStats.additionalAttack;
    this.constellation = characterStats.constellation;
    this.artifact = characterStats.artifact;
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
    const troupeBonus = this.artifact === WANDERER_TROUPE.name ? WANDERER_TROUPE.chargedAttackDamageBoost : 0

    const scenarios = [];

    const scenario1 = {
      description: '怪没有冰附着',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack + this.additionalAttack),
      },
    };
    const scenario2 = {
      description: '怪被冰元素附着(双冰共鸣)',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack + this.additionalAttack),
        criticalRatio: round3(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus)
      },
      targetStats: {
        resistRatio: round2(0.1 - targetResistanceReduction)
      }
    };

    scenarios.push(scenario1)
    scenarios.push(scenario2)

    if (this.artifact === WANDERER_TROUPE.name) {
      const scenario3 = {
        description: '怪物为火附着，每段攻击都融化',
        characterStats: {
          ...this.characterStats,
          attack: round0(this.basicAttack + this.additionalAttack),
          criticalRatio: round2(this.characterStats.criticalRatio + undividedHeartBonus),
          damageBoost: {
            ...this.characterStats.damageBoost,
            other: round3((this.characterStats.damageBoost.other || 0) + troupeBonus),
          }
        },
        targetStats: {
          attachedElement: E.PYRO,
          resistRatio: round2(0.1 - targetResistanceReduction)
        }
      }
      scenarios.push(scenario3)
    }

    if (this.constellation >= 4) {
      const forthConstellationMaxBonus = 0.25;
      const scenario4 = {
        description: '怪物被冰附着，站冰雨内吃满4命增伤(双冰共鸣)',
        characterStats: {
          ...this.characterStats,
          attack: round0(this.basicAttack + this.additionalAttack),
          criticalRatio: round3(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
          damageBoost: {
            ...this.characterStats.damageBoost,
            [E.CRYO]: round3((this.characterStats.damageBoost[E.CRYO] || 0) + PassiveTalentBonus + forthConstellationMaxBonus),
          }
        },
        targetStats: {
          resistRatio: round2(0.1 - targetResistanceReduction)
        },
      };
      scenarios.push(scenario4)
    }

    return scenarios
  }

  generateAmosScenarios() {
    const scenarios = [];

    const [amosChargeAttackBonus, amosChargeAttackAdditionalBonus] = WEAPON_AMOS_BOW.refine[this.weaponStats.refineRank]
    const shatteringIceBonus = 0.15
    const blizzardStrayerBonus = this.artifact === BLIZZARD_STRAYER.name ? 0.2 : 0
    const troupeBonus = this.artifact === WANDERER_TROUPE.name ? WANDERER_TROUPE.chargedAttackDamageBoost : 0
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
          other: round3((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus + troupeBonus)
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
          other: round3((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus + amosChargeAttackAdditionalBonus * 2 + troupeBonus)
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
          other: round3((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus + amosChargeAttackAdditionalBonus * 5 + troupeBonus)
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
      description: '蓄力二段吃满阿莫斯加成，怪物为冰附着(双冰共鸣)',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack + this.additionalAttack),
        criticalRatio: round3(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
        damageBoost: {
          ...this.characterStats.damageBoost,
          other: round3((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus + amosChargeAttackAdditionalBonus * 5 + troupeBonus)
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
    scenarios.push(scenario1);
    scenarios.push(scenario2);
    scenarios.push(scenario3);
    scenarios.push(scenario4);

    if (this.artifact === WANDERER_TROUPE.name) {
      const scenario5 = {
        description: '蓄力二段吃满阿莫斯加成，怪物为火附着，两段融化',
        characterStats: {
          ...this.characterStats,
          attack: round0(this.basicAttack + this.additionalAttack),
          attackType: E.CRYO,
          damageBoost: {
            ...this.characterStats.damageBoost,
            other: round3((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus + amosChargeAttackAdditionalBonus * 5 + troupeBonus)
          }
        },
        targetStats: {
          attachedElement: E.PYRO,
          resistRatio: round2(0.1 - targetResistanceReduction)
        },
        weaponStats: {
          name: WEAPON_AMOS_BOW.name,
          refineRank: this.weaponStats.refineRank,
          isChargedAttack: true,
          arrowFlyElapsed: 0.5
        }
      };
      scenarios.push(scenario5)
    }

    if (this.constellation >= 4) {
      const forthConstellationMaxBonus = 0.25;
      const scenario6 = {
        description: '蓄力二段吃满阿莫斯加成，怪物为冰附着，站冰雨内吃满4命增伤(双冰共鸣)',
        characterStats: {
          ...this.characterStats,
          attack: round0(this.basicAttack + this.additionalAttack),
          criticalRatio: round3(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
          damageBoost: {
            ...this.characterStats.damageBoost,
            [E.CRYO]: round3((this.characterStats.damageBoost[E.CRYO] || 0) + PassiveTalentBonus + forthConstellationMaxBonus),
            other: round3((this.characterStats.damageBoost.other || 0) + amosChargeAttackBonus + amosChargeAttackAdditionalBonus * 5 + troupeBonus)
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
      scenarios.push(scenario6)
    }

    const scenario7 = {
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
    scenarios.push(scenario7);

    return scenarios
  }

  generateCrescentScenarios() {
    const attackIncreaseRatio = WEAPON_PROTOTYPE_CRESCENT.refine[this.weaponStats.refineRank]
    const troupeBonus = this.artifact === WANDERER_TROUPE.name ? WANDERER_TROUPE.chargedAttackDamageBoost : 0
    const shatteringIceBonus = 0.15
    const blizzardStrayerBonus = this.artifact === BLIZZARD_STRAYER.name ? 0.2 : 0
    const undividedHeartBonus = this.characterStats.level > 20 ? 0.2 : 0
    const PassiveTalentBonus = this.characterStats.level > 70 ? 0.2 : 0;
    const targetResistanceReduction = this.constellation >= 1 ? 0.15 : 0;

    const scenarios = [];

    const scenario1 = {
      description: '发动试做澹月特效前',
      characterStats: {
        ...this.characterStats,
        attack: this.basicAttack + this.additionalAttack,
      }
    };

    const scenario2 = {
      description: '发动试做澹月特效后(双冰共鸣)',
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
      description: '发动试做澹月特效后站在冰雨内(双冰共鸣)',
      characterStats: {
        ...this.characterStats,
        attack: round0(this.basicAttack * (1 + attackIncreaseRatio) + this.additionalAttack),
        criticalRatio: round2(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
        damageBoost: {
          ...this.characterStats.damageBoost,
          other: round3((this.characterStats.damageBoost.other || 0) + PassiveTalentBonus)
        }
      },
      targetStats: {
        resistRatio: round2(0.1 - targetResistanceReduction)
      }
    };

    scenarios.push(scenario1);
    scenarios.push(scenario2);
    scenarios.push(scenario3);

    if (this.artifact === WANDERER_TROUPE.name) {
      const scenario4 = {
        description: '发动试做澹月特效后，怪物为火附着，每段攻击都融化',
        characterStats: {
          ...this.characterStats,
          attack: round0(this.basicAttack * (1 + attackIncreaseRatio) + this.additionalAttack),
          criticalRatio: round2(this.characterStats.criticalRatio + undividedHeartBonus),
          damageBoost: {
            ...this.characterStats.damageBoost,
            other: round3((this.characterStats.damageBoost.other || 0) + troupeBonus),
          }
        },
        targetStats: {
          attachedElement: E.PYRO,
          resistRatio: round2(0.1 - targetResistanceReduction)
        }
      }
      scenarios.push(scenario4)
    }

    if (this.constellation >= 4) {
      const forthConstellationMaxBonus = 0.25;
      const scenario5 = {
        description: '发动试做澹月特效后站在冰雨内吃满4命增伤(双冰共鸣)',
        characterStats: {
          ...this.characterStats,
          attack: round0(this.basicAttack * (1 + attackIncreaseRatio) + this.additionalAttack),
          criticalRatio: round2(this.characterStats.criticalRatio + shatteringIceBonus + undividedHeartBonus + blizzardStrayerBonus),
          damageBoost: {
            ...this.characterStats.damageBoost,
            [E.CRYO]: round3((this.characterStats.damageBoost[E.CRYO] || 0) + PassiveTalentBonus + forthConstellationMaxBonus),
          }
        },
        targetStats: {
          resistRatio: round2(0.1 - targetResistanceReduction)
        }
      }
      scenarios.push(scenario5)
    }

    return scenarios
  }
}