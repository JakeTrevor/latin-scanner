import { nBitCombos } from "../../src/utils";

describe("Testing combinatorial generator", () => {
  test("testing with 2 bits", () => {
    let input = 2;
    let expected = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ].sort() as (0 | 1)[][];
    let result = nBitCombos(input).sort();
    expect(result).toEqual(expected);
  });

  test("testing with 2 bits", () => {
    let input = 4;
    let expected = [
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
      [0, 1, 0, 0],
      [0, 1, 0, 1],
      [0, 1, 1, 0],
      [0, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 1],
      [1, 0, 1, 0],
      [1, 0, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 0, 1],
      [1, 1, 1, 0],
      [1, 1, 1, 1],
    ].sort() as (0 | 1)[][];
    let result = nBitCombos(input).sort();
    expect(result).toEqual(expected);
  });
});
