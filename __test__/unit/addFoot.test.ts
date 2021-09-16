import { addFoot } from "../../src/lineAnalysisSubFunctions";
import { footType, quantityStrict } from "../../src/types";

describe("Testing add foot function", () => {
  test("testing spondee", () => {
    let input: footType = 0;
    let expected: quantityStrict[] = ["Long", "Long"];
    let result = addFoot([], input);
    expect(result).toEqual(expected);
  });
  test("testing dactyl", () => {
    let input: footType = 1;
    let expected: quantityStrict[] = ["Long", "Short", "Short"];
    let result = addFoot([], input);
    expect(result).toEqual(expected);
  });
  test("testing half", () => {
    let input: footType = 2;
    let expected: quantityStrict[] = ["Long"];
    let result = addFoot([], input);
    expect(result).toEqual(expected);
  });

  test("testing addition feature", () => {
    let input: footType = 2;
    let pasthroughArray: quantityStrict[] = ["Long", "Short", "Long"];
    let expected: quantityStrict[] = ["Long", "Short", "Long", "Long"];
    let result = addFoot(pasthroughArray, input);
    expect(result).toEqual(expected);
  });
});
