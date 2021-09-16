import { sum } from "../../src/utils";

describe("testing sum function", () => {
  test("testing with ones and zeros", () => {
    let input = [1, 1, 1, 0, 0, 1, 0];
    let expected = 4;
    let result = sum(input);
    expect(result).toEqual(expected);
  });

  test("testing with larger numbers", () => {
    let input = [11, 3, 5, 0, 0, 1, 0];
    let expected = 20;
    let result = sum(input);
    expect(result).toEqual(expected);
  });
});
