import {Calculator} from './real-damage';

describe('real damage calculator', () => {
  test('should be able to calculate first normal attack damage for 甘雨', () => {
    const GanyuStatistics = {
      attack: 100,
      criticalRatio: 0.05,
      criticalDamage: 0.5,
      ratio: 0.317,
      level: 1
    };
    const targetStatistics = {
      level: 1,
      resistRatio: 0.1
    }

    const [damageExpectation, normalDamage, criticalDamage] = new Calculator(GanyuStatistics, targetStatistics).calculate();

    expect(damageExpectation).toEqual(14.62);
    expect(normalDamage).toEqual(14.27);
    expect(criticalDamage).toEqual(21.40);
  })

  test('should be able to calculate first normal attack damage for 甘雨 with target has a high level', () => {
    const GanyuStatistics = {
      attack: 100,
      criticalRatio: 0.05,
      criticalDamage: 0.5,
      ratio: 0.317,
      level: 1
    };
    const targetStatistics = {
      level: 90,
      resistRatio: 0.1
    }

    const [damageExpectation, normalDamage, criticalDamage] = new Calculator(GanyuStatistics, targetStatistics).calculate();

    expect(damageExpectation).toEqual(5.07);
    expect(normalDamage).toEqual(4.95);
    expect(criticalDamage).toEqual(7.43);
  })

  test('should be able to calculate first normal attack damage for 甘雨 with physical damage cup', () => {
    const GanyuStatistics = {
      attack: 1000,
      criticalRatio: 0.05,
      criticalDamage: 0.5,
      ratio: 0.317,
      level: 90,
      damageBoost: {physical: 0.583}
    };
    const targetStatistics = {
      level: 90,
      resistRatio: 0.1
    }

    const [damageExpectation, normalDamage, criticalDamage] = new Calculator(GanyuStatistics, targetStatistics).calculate();

    expect(damageExpectation).toEqual(231.46);
    expect(normalDamage).toEqual(225.81);
    expect(criticalDamage).toEqual(338.72);
  })
})
