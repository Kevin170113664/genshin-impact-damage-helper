import {Calculator} from './real-damage';

describe('real damage calculator', () => {
  test('should be able to calculate first normal attack damage for 甘雨', () => {
    const GanyuStatics = {
      attack: 100,
      criticalRatio: 0.05,
      criticalDamage: 0.5,
      ratio: 0.317,
      level: 1
    };

    const [damageExpectation, normalDamage, criticalDamage] = new Calculator(GanyuStatics).calculate();

    expect(damageExpectation).toEqual(14.62);
    expect(normalDamage).toEqual(14.27);
    expect(criticalDamage).toEqual(21.40);
  })
})
