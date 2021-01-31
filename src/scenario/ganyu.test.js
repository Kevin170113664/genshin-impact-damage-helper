import {E} from '../constant/element';
import {Scenario} from './ganyu';
import {WEAPON_AMOS_BOW, WEAPON_SKYWARD_HARP} from '../constant/weapon';

describe('scenario', () => {
  test('should be able to generate 甘雨 scenario with prototype crescent', () => {
    const ganyuStats = {
      basicAttack: 823,
      additionalAttack: 1215,
      criticalRatio: 0.19,
      criticalDamage: 2.198,
      level: 81,
      mastery: 0,
      constellation: 1,
      talentLevels: [11, 3, 6],
      damageBoost: {
        [E.CRYO]: 0.616
      }
    };
    const weaponStats = {
      name: 'prototype_crescent',
      refineRank: 3
    };
    const scenarios = new Scenario(ganyuStats, weaponStats).generate();

    expect(scenarios).toEqual([
      {
        description: '发动试做澹月特效前',
        characterStats: {
          attack: 2038,
          criticalRatio: 0.19,
          criticalDamage: 2.198,
          level: 81,
          mastery: 0,
          talentLevels: [11, 3, 6],
          damageBoost: {
            [E.CRYO]: 0.616
          }
        }
      },
      {
        description: '发动试做澹月特效后(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          attack: 2482,
          criticalRatio: 0.74,
          criticalDamage: 2.198,
          level: 81,
          mastery: 0,
          talentLevels: [11, 3, 6],
          damageBoost: {
            [E.CRYO]: 0.616
          }
        },
        targetStats: {
          resistRatio: -0.05
        }
      },
      {
        description: '发动试做澹月特效后站在冰雨内(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          attack: 2482,
          criticalRatio: 0.74,
          criticalDamage: 2.198,
          level: 81,
          mastery: 0,
          talentLevels: [11, 3, 6],
          damageBoost: {
            [E.CRYO]: 0.616,
            other: 0.2
          }
        },
        targetStats: {
          resistRatio: -0.05
        }
      }
    ])
  })

  test('should be able to generate 甘雨 scenario with prototype crescent and has forth constellation', () => {
    const ganyuStats = {
      basicAttack: 823,
      additionalAttack: 1215,
      criticalRatio: 0.19,
      criticalDamage: 2.198,
      level: 81,
      mastery: 0,
      constellation: 4,
      talentLevels: [11, 3, 6],
      damageBoost: {
        [E.CRYO]: 0.616
      }
    };
    const weaponStats = {
      name: 'prototype_crescent',
      refineRank: 3
    };
    const scenarios = new Scenario(ganyuStats, weaponStats).generate();

    expect(scenarios).toEqual([
      {
        description: '发动试做澹月特效前',
        characterStats: {
          attack: 2038,
          criticalRatio: 0.19,
          criticalDamage: 2.198,
          level: 81,
          mastery: 0,
          talentLevels: [11, 3, 6],
          damageBoost: {
            [E.CRYO]: 0.616
          }
        }
      },
      {
        description: '发动试做澹月特效后(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          attack: 2482,
          criticalRatio: 0.74,
          criticalDamage: 2.198,
          level: 81,
          mastery: 0,
          talentLevels: [11, 3, 6],
          damageBoost: {
            [E.CRYO]: 0.616
          }
        },
        targetStats: {
          resistRatio: -0.05
        }
      },
      {
        description: '发动试做澹月特效后站在冰雨内(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          attack: 2482,
          criticalRatio: 0.74,
          criticalDamage: 2.198,
          level: 81,
          mastery: 0,
          talentLevels: [11, 3, 6],
          damageBoost: {
            [E.CRYO]: 0.616,
            other: 0.2
          }
        },
        targetStats: {
          resistRatio: -0.05
        }
      },
      {
        description: '发动试做澹月特效后站在冰雨内吃满4命增伤(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          attack: 2482,
          criticalRatio: 0.74,
          criticalDamage: 2.198,
          level: 81,
          mastery: 0,
          talentLevels: [11, 3, 6],
          damageBoost: {
            [E.CRYO]: 0.616,
            other: 0.45
          }
        },
        targetStats: {
          resistRatio: -0.05
        }
      }
    ])
  })

  test('should be able to generate 甘雨 scenario with amos bow', () => {
    const ganyuStats = {
      basicAttack: 943,
      additionalAttack: 1415,
      criticalRatio: 0.25,
      criticalDamage: 2.4,
      level: 90,
      mastery: 0,
      constellation: 6,
      talentLevels: [11, 13, 13],
      damageBoost: {
        [E.CRYO]: 0.616
      }
    };
    const weaponStats = {
      name: WEAPON_AMOS_BOW,
      refineRank: 1
    };
    const scenarios = new Scenario(ganyuStats, weaponStats).generate();

    expect(scenarios).toEqual([
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
        },
        weaponStats: {
          name: WEAPON_AMOS_BOW.name,
          refineRank: 1,
          isChargedAttack: true,
          arrowFlyElapsed: 0
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
        },
        weaponStats: {
          name: WEAPON_AMOS_BOW.name,
          refineRank: 1,
          isChargedAttack: true,
          arrowFlyElapsed: 0.2
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
        },
        weaponStats: {
          name: WEAPON_AMOS_BOW.name,
          refineRank: 1,
          isChargedAttack: true,
          arrowFlyElapsed: 0.5
        }
      },
      {
        description: '蓄力二段吃满阿莫斯加成，怪物为冰附着(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          attack: 2358,
          criticalRatio: 0.8,
          criticalDamage: 2.4,
          level: 90,
          mastery: 0,
          talentLevels: [11, 13, 13],
          damageBoost: {
            [E.CRYO]: 0.616,
            other: 0.52
          }
        },
        targetStats: {
          resistRatio: -0.05
        },
        weaponStats: {
          name: WEAPON_AMOS_BOW.name,
          refineRank: 1,
          isChargedAttack: true,
          arrowFlyElapsed: 0.5
        }
      },
      {
        description: '蓄力二段吃满阿莫斯加成，怪物为冰附着，站冰雨内吃满4命增伤(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          attack: 2358,
          criticalRatio: 0.8,
          criticalDamage: 2.4,
          level: 90,
          mastery: 0,
          talentLevels: [11, 13, 13],
          damageBoost: {
            [E.CRYO]: 0.616,
            other: 0.97
          }
        },
        targetStats: {
          resistRatio: -0.05
        },
        weaponStats: {
          name: WEAPON_AMOS_BOW.name,
          refineRank: 1,
          isChargedAttack: true,
          arrowFlyElapsed: 0.5
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
        },
        weaponStats: {
          name: WEAPON_AMOS_BOW.name,
          refineRank: 1
        }
      }
    ])
  })

  test('should be able to generate 甘雨 scenario with skyward harp', () => {
    const ganyuStats = {
      basicAttack: 1009,
      additionalAttack: 1110,
      criticalRatio: 0.45,
      criticalDamage: 2.6,
      level: 90,
      mastery: 0,
      constellation: 6,
      talentLevels: [11, 13, 13],
      damageBoost: {
        [E.CRYO]: 0.616
      }
    };
    const weaponStats = {
      name: WEAPON_SKYWARD_HARP.name,
      refineRank: 5
    };
    const scenarios = new Scenario(ganyuStats, weaponStats).generate();

    expect(scenarios).toEqual([
      {
        description: '怪没有冰附着',
        characterStats: {
          attack: 2119,
          criticalRatio: 0.45,
          criticalDamage: 2.6,
          level: 90,
          mastery: 0,
          talentLevels: [11, 13, 13],
          damageBoost: {
            [E.CRYO]: 0.616
          }
        }
      },
      {
        description: '怪被冰元素附着(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          attack: 2119,
          criticalRatio: 1.00,
          criticalDamage: 2.6,
          level: 90,
          mastery: 0,
          talentLevels: [11, 13, 13],
          damageBoost: {
            [E.CRYO]: 0.616
          }
        },
        targetStats: {
          resistRatio: -0.05
        }
      },
      {
        description: '怪物被冰附着，站冰雨内吃满4命增伤(双冰共鸣，20突破天赋，冰套4)',
        characterStats: {
          attack: 2119,
          criticalRatio: 1.00,
          criticalDamage: 2.6,
          level: 90,
          mastery: 0,
          talentLevels: [11, 13, 13],
          damageBoost: {
            [E.CRYO]: 0.616,
            other: 0.45
          }
        },
        targetStats: {
          resistRatio: -0.05
        }
      }
    ])
  })
})
