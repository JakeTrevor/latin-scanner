import { convertToQuantityArray } from "../../src/lineAnalysisSubFunctions";
import { footType, quantity } from "../../src/types";

describe("Testing Quantity array generator function", () => {
  test("testing spondees", () => {
    let input: footType[] = [0]; //spondee
    let expectedQuantities: quantity[] = ["Long", "Long"];
    let expectedBreaks: number[] = [1];
    let result = convertToQuantityArray(input);
    expect(result[0]).toEqual(expectedQuantities);
    expect(result[1]).toEqual(expectedBreaks);
  });

  test("testing dactyls", () => {
    let input: footType[] = [1]; //dactyl
    let expectedQuantities: quantity[] = ["Long", "Short", "Short"];
    let expectedBreaks: number[] = [2];
    let result = convertToQuantityArray(input);
    expect(result[0]).toEqual(expectedQuantities);
    expect(result[1]).toEqual(expectedBreaks);
  });

  test("testing halves", () => {
    let input: footType[] = [2]; //half
    let expectedQuantities: quantity[] = ["Long"];
    let expectedBreaks: number[] = [0];
    let result = convertToQuantityArray(input);
    expect(result[0]).toEqual(expectedQuantities);
    expect(result[1]).toEqual(expectedBreaks);
  });

  test("testing longer rhythm", () => {
    let input: footType[] = [1, 1, 2, 0, 0, 2]; //a typical pentameter rhythm
    let expectedQuantities: quantity[] = [
      "Long",
      "Short",
      "Short",
      "Long",
      "Short",
      "Short",
      "Long",
      "Long",
      "Long",
      "Long",
      "Long",
      "Long",
    ];
    let expectedBreaks: number[] = [2, 5, 6, 8, 10, 11];
    let result = convertToQuantityArray(input);
    expect(result[0]).toEqual(expectedQuantities);
    expect(result[1]).toEqual(expectedBreaks);
  });
});
