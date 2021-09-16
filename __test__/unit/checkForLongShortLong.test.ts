import { checkForLongShortLong } from "../../src/lineAnalysisSubFunctions";
import { quantity } from "../../src/types";

describe("Testing long-short-long pattern detector ", () => {
  test("basic funtionality", () => {
    let input: quantity[] = ["Long", "Short", "Long"];
    let result = checkForLongShortLong(input);
    expect(result).toBe(true);
  });

  test("empty array returns false", () => {
    let input: quantity[] = [];
    let result = checkForLongShortLong(input);
    expect(result).toBe(false);
  });

  test("array without pattern returns false", () => {
    let input: quantity[] = ["Long", "Short", "Short", "Long", "Long"];
    let result = checkForLongShortLong(input);
    expect(result).toBe(false);
  });

  test("array with pattern returns true", () => {
    let input: quantity[] = ["Long", "Short", "Long", "Long", "Long"];
    let result = checkForLongShortLong(input);
    expect(result).toBe(true);
  });

  test("array with pattern at end is detected", () => {
    let input: quantity[] = ["Long", "Long", "Long", "Short", "Long"];
    let result = checkForLongShortLong(input);
    expect(result).toBe(true);
  });
});
