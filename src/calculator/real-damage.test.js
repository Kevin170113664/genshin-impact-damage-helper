import {Calculator} from './real-damage';
import {E} from '../constant/element';

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

  test('should be able to calculate first normal attack damage for 甘雨 with physical damage goblet', () => {
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

  test('should be able to calculate first charge attack for 甘雨 with melt reaction', () => {
    const GanyuStatistics = {
      attack: 1000,
      criticalRatio: 0.05,
      criticalDamage: 0.5,
      ratio: 1.24,
      level: 90,
      attackType: E.CRYO,
      damageBoost: {cryo: 0.466}
    };
    const targetStatistics = {
      level: 85,
      resistRatio: 0.1,
      attachedElement: E.PYRO
    }

    const [damageExpectation, normalDamage, criticalDamage] = new Calculator(GanyuStatistics, targetStatistics).calculate();

    expect(damageExpectation).toEqual(1274.49);
    expect(normalDamage).toEqual(1243.40);
    expect(criticalDamage).toEqual(1865.10);
  })

  test('should be able to calculate first charge attack for 甘雨 with target defence 15% lower', () => {
    const GanyuStatistics = {
      attack: 1000,
      criticalRatio: 0.05,
      criticalDamage: 0.5,
      ratio: 1.24,
      level: 90,
      attackType: E.CRYO,
      damageBoost: {cryo: 0.466}
    };
    const targetStatistics = {
      level: 85,
      resistRatio: 0.1,
      defence: 0.85
    }

    const [damageExpectation, normalDamage, criticalDamage] = new Calculator(GanyuStatistics, targetStatistics).calculate();

    expect(damageExpectation).toEqual(917.56);
    expect(normalDamage).toEqual(895.18);
    expect(criticalDamage).toEqual(1342.77);
  })
})
