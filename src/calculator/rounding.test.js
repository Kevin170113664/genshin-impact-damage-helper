import {round2} from './rounding';

describe('rounding', () => {
  test('should be able to round to 2 decimal', () => {
    expect(round2(7.994)).toEqual(7.99)
    expect(round2(12.715)).toEqual(12.72)
    expect(round2(4.499)).toEqual(4.50)
    expect(round2(3.550)).toEqual(3.55)
  })
})
