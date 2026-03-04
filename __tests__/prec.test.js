const parse = require("../src/parser.js").parse;

describe('Parser Failing Tests', () => {
  test('should handle multiplication and division before addition and subtraction', () => {
    expect(parse("2 + 3 * 4")).toBe(14); // 2 + (3 * 4) = 14
    expect(parse("10 - 6 / 2")).toBe(7);  // 10 - (6 / 2) = 7
    expect(parse("5 * 2 + 3")).toBe(13); // (5 * 2) + 3 = 13
    expect(parse("20 / 4 - 2")).toBe(3);  // (20 / 4) - 2 = 3
  });

  test('should handle exponentiation with highest precedence', () => {
    expect(parse("2 + 3 ** 2")).toBe(11); // 2 + (3 ** 2) = 11
    expect(parse("2 * 3 ** 2")).toBe(18); // 2 * (3 ** 2) = 18
    expect(parse("10 - 2 ** 3")).toBe(2);  // 10 - (2 ** 3) = 2
  });

  test('should handle right associativity for exponentiation', () => {
    expect(parse("2 ** 3 ** 2")).toBe(512); // 2 ** (3 ** 2) = 2 ** 9 = 512
    expect(parse("3 ** 2 ** 2")).toBe(81);  // 3 ** (2 ** 2) = 3 ** 4 = 81
  });

  test('should handle mixed operations with correct precedence', () => {
    expect(parse("1 + 2 * 3 - 4")).toBe(3);   // 1 + (2 * 3) - 4 = 3
    expect(parse("15 / 3 + 2 * 4")).toBe(13); // (15 / 3) + (2 * 4) = 13
    expect(parse("10 - 3 * 2 + 1")).toBe(5);  // 10 - (3 * 2) + 1 = 5
  });

  test('should handle expressions with exponentiation precedence', () => {
    expect(parse("2 ** 3 + 1")).toBe(9);      // (2 ** 3) + 1 = 9 
    expect(parse("3 + 2 ** 4")).toBe(19);     // 3 + (2 ** 4) = 19
    expect(parse("2 * 3 ** 2 + 1")).toBe(19); // 2 * (3 ** 2) + 1 = 19
  });

  test('should handle various realistic calculations with correct precedence', () => {
    expect(parse("1 + 2 * 3")).toBe(7);    // 1 + (2 * 3) = 7
    expect(parse("6 / 2 + 4")).toBe(7);    // (6 / 2) + 4 = 7
    expect(parse("2 ** 2 + 1")).toBe(5);   // (2 ** 2) + 1 = 5
    expect(parse("10 / 2 / 5")).toBe(1);   // (10 / 2) / 5 = 1
    expect(parse("100 - 50 + 25")).toBe(75); // (100 - 50) + 25 = 75
    expect(parse("2 * 3 + 4 * 5")).toBe(26); // (2 * 3) + (4 * 5) = 26
  });

  describe('Test práctica 5', () => {
    test('should handle multiplication and division before addition and subtraction with floats', () => {
      expect(parse("1.5 + 2.5 * 2.0")).toBe(6.5); // 1.5 + (2.5 * 2.0) = 6.5
      expect(parse("10.0 - 3.0 / 1.5")).toBe(8.0); // 10.0 - (3.0 / 1.5) = 8.0
    });

    test('should handle exponentiation precedence with floats', () => {
      expect(parse("2.0 * 1.5 ** 2.0")).toBe(4.5); // 2.0 * (1.5 ** 2.0) = 4.5
      expect(parse("1.5 ** 2.0 + 1.25")).toBe(3.5); // (1.5 ** 2.0) + 1.25 = 3.5
    });

    test('should handle associativity for same precedence operations with floats', () => {
      expect(parse("10.5 - 2.5 - 1.0")).toBe(7.0); // (10.5 - 2.5) - 1.0 = 7.0
      expect(parse("12.5 / 2.0 / 2.5")).toBe(2.5); // (12.5 / 2.0) / 2.5 = 2.5
    });
    
    test('should handle scientific notation mixed with precedence', () => {
      expect(parse("2e1 + 3e1 * 2")).toBe(80); // 20 + (30 * 2) = 80
      expect(parse("1.5e2 / 2 - 10")).toBe(65); // (150 / 2) - 10 = 65
    });
  });
});
