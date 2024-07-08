import { describe, expect, it } from 'vitest';
import { getZodiacSign, ZodiacSign } from './zodiac';

describe('getZodiacSign', () => {
  const testCases: { month: number; day: number; expected: ZodiacSign }[] = [
    { month: 1, day: 15, expected: 'Capricorn' },
    { month: 1, day: 20, expected: 'Aquarius' },
    { month: 2, day: 19, expected: 'Pisces' },
    { month: 3, day: 21, expected: 'Aries' },
    { month: 4, day: 20, expected: 'Taurus' },
    { month: 5, day: 21, expected: 'Gemini' },
    { month: 6, day: 21, expected: 'Cancer' },
    { month: 7, day: 23, expected: 'Leo' },
    { month: 8, day: 23, expected: 'Virgo' },
    { month: 9, day: 23, expected: 'Libra' },
    { month: 10, day: 23, expected: 'Scorpio' },
    { month: 11, day: 22, expected: 'Sagittarius' },
    { month: 12, day: 22, expected: 'Capricorn' },
    // testing invalid dates
    { month: 0, day: 0, expected: '' },
    { month: 13, day: 32, expected: '' },
  ];

  testCases.forEach(({ month, day, expected }) => {
    it(`should return ${expected} for ${month}/${day}`, () => {
      expect(getZodiacSign(month, day)).toEqual(expected);
    });
  });
});
