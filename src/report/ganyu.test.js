import {E} from '../constant/element';
import {Report} from './ganyu';
import {WEAPON_AMOS_BOW} from '../constant/weapon';

describe('report', () => {
  test('should be able to generate 甘雨 damage report with crescent', () => {
    const ganyuStats = {
      attack: 2038,
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
    const targetStats = {
      level: 85,
      resistRatio: 0.1
    }
    const report = new Report(ganyuStats, targetStats).generate();

    expect(report).toEqual({
      chargeLevel2: {
        frostflakeArrow: {
          criticalDamage: 11391.22,
          damageExpectation: 5049.54,
          normalDamage: 3561.98
        },
        frostflakeArrowBloom: {
          criticalDamage: 22049.33,
          damageExpectation: 9774.1,
          normalDamage: 6894.72
        }
      },
      elementalSkill: {
        '1-hit': {
          criticalDamage: 7125.37,
          damageExpectation: 3158.56,
          normalDamage: 2228.07
        },
        '2-hit': {
          criticalDamage: 7125.37,
          damageExpectation: 3158.56,
          normalDamage: 2228.07
        }
      },
      elementalBurst: {
        allIceShard: {
          criticalDamage: 234293.49,
          damageExpectation: 103858.44,
          normalDamage: 73262.52
        },
        singleIceShard: {
          criticalDamage: 4593.99,
          damageExpectation: 2036.44,
          normalDamage: 1436.52
        },
      }
    })
  })

  test('should be able to generate 甘雨 damage report with amos bow charged attack', () => {
    const ganyuStats = {
      attack: 2463,
      criticalRatio: 0.416,
      criticalDamage: 2.058,
      level: 82,
      mastery: 0,
      talentLevels: [10, 13, 13],
      damageBoost: {
        [E.CRYO]: 0.616,
        other: 0.91
      }
    };
    const targetStats = {
      level: 90,
      resistRatio: -0.05
    }
    const weaponStats = {
      name: WEAPON_AMOS_BOW.name,
      refineRank: 4,
      isChargedAttack: true,
      arrowFlyElapsed: 0.5
    };
    const report = new Report(ganyuStats, targetStats, weaponStats).generate();

    expect(report).toEqual({
      chargeLevel2: {
        frostflakeArrow: {
          criticalDamage: 21943.98,
          damageExpectation: 13319.44,
          normalDamage: 7175.93
        },
        frostflakeArrowBloom: {
          criticalDamage: 32839.18,
          damageExpectation: 19932.54,
          normalDamage: 10738.78
        }
      },
    })
  })

  test('should be able to generate 甘雨 damage report with amos bow charged attack and no frostflake bonus', () => {
    const ganyuStats = {
      attack: 2165,
      criticalRatio: 0.311,
      criticalDamage: 2.353,
      level: 83,
      mastery: 0,
      constellation: 6,
      talentLevels: [8, 9, 9],
      damageBoost: {
        [E.CRYO]: 0.616,
        other: 0.18
      }
    };
    const targetStats = {
      level: 85,
    }
    const weaponStats = {
      name: WEAPON_AMOS_BOW.name,
      refineRank: 3,
      isChargedAttack: true,
      arrowFlyElapsed: 0
    };
    const report = new Report(ganyuStats, targetStats, weaponStats).generate();

    expect(report).toEqual({
      chargeLevel2: {
        frostflakeArrow: {
          criticalDamage: 11961.82,
          damageExpectation: 6178.13,
          normalDamage: 3567.5
        },
        frostflakeArrowBloom: {
          criticalDamage: 27761.73,
          damageExpectation: 14338.59,
          normalDamage: 8279.67
        }
      },
    })
  })

  test('should be able to generate 甘雨 damage report with amos bow elemental skill/burst', () => {
    const ganyuStats = {
      attack: 2500,
      criticalRatio: 0.25,
      criticalDamage: 2.4,
      level: 90,
      mastery: 0,
      talentLevels: [11, 13, 13],
      damageBoost: {
        [E.CRYO]: 0.616,
        other: 0.12
      }
    };
    const targetStats = {
      level: 85,
      resistRatio: 0.1
    }
    const weaponStats = {
      name: WEAPON_AMOS_BOW.name,
      refineRank: 1,
    };
    const report = new Report(ganyuStats, targetStats, weaponStats).generate();

    expect(report).toEqual({
      elementalBurst: {
        allIceShard: {
          criticalDamage: 511316.82,
          damageExpectation: 240619.53,
          normalDamage: 150387.27
        },
        singleIceShard: {
          criticalDamage: 10025.82,
          damageExpectation: 4718.03,
          normalDamage: 2948.77
        }
      },
      elementalSkill: {
        '1-hit': {
          criticalDamage: 18907.75,
          damageExpectation: 8897.76,
          normalDamage: 5561.1
        },
        '2-hit': {
          criticalDamage: 18907.75,
          damageExpectation: 8897.76,
          normalDamage: 5561.1
        }
      }
    })
  })
})
