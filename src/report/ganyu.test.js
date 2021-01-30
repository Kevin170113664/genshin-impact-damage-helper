import {E} from '../constant/element';
import {Report} from './ganyu';

describe('report', () => {
  test('should be able to generate 甘雨 damage report', () => {
    const ganyuStats = {
      attack: 2038,
      criticalRatio: 0.19,
      criticalDamage: 2.198,
      level: 81,
      mastery: 0,
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
          criticalDamage: 19360.39,
          damageExpectation: 8582.14,
          normalDamage: 6053.9
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
})
