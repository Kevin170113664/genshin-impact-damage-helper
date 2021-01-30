import {E} from '../constant/element';
import {Scenario} from './ganyu';

describe('scenario', () => {
  test('should be able to generate 甘雨 scenario with prototype crescent and 20 ascension done', () => {
    const ganyuStats = {
      basicAttack: 823,
      additionalAttack: 1215,
      criticalRatio: 0.19,
      criticalDamage: 2.198,
      level: 81,
      mastery: 0,
      talentLevels: [11, 3, 6],
      damageBoost: {
        [E.CRYO]: 0.616
      }
    };
    const weaponStats = {
      name: 'prototype_crescent',
      level: 90,
      refineRank: 3
    };
    const scenarios = new Scenario(ganyuStats, weaponStats).generate();

    expect(scenarios).toEqual([
      {
        description: '发动试做澹月特效前(双冰共鸣)',
        characterStats: {
          attack: 2038,
          criticalRatio: 0.34,
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
        }
      }
    ])
  })
})
