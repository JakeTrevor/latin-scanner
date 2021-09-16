import { validateRhythm } from "../../src/lineAnalysisSubFunctions";
import { quantity, quantityStrict } from "../../src/types";

describe("Testing rhythm validator", () => {
  test("testing long matches correctly", () => {
    let input: quantityStrict[] = ["Long", "Long"];
    let knownQuants: quantity[] = ["Long", "Undefined"];
    let expected = true;
    let result = validateRhythm(knownQuants, input, 0);
    expect(result).toBe(expected);
  });

  test("testing short matches correctly", () => {
    let input: quantityStrict[] = ["Short", "Short"];
    let knownQuants: quantity[] = ["Short", "Undefined"];
    let expected = true;
    let result = validateRhythm(knownQuants, input, 0);
    expect(result).toBe(expected);
  });

  test("testing long does not match short", () => {
    let input: quantityStrict[] = ["Long"];
    let knownQuants: quantity[] = ["Short"];
    let expected = false;
    let result = validateRhythm(knownQuants, input, 0);
    expect(result).toBe(expected);
  });

  test("testing short does not match long", () => {
    let input: quantityStrict[] = ["Short"];
    let knownQuants: quantity[] = ["Long"];
    let expected = false;
    let result = validateRhythm(knownQuants, input, 0);
    expect(result).toBe(expected);
  });

  test("testing a longer example", () => {
    let input: quantityStrict[] = ["Long", "Short", "Short", "Long", "Long"];
    let knownQuants: quantity[] = [
      "Long",
      "Undefined",
      "Short",
      "Undefined",
      "Undefined",
    ];
    let expected = true;
    let result = validateRhythm(knownQuants, input, 0);
    expect(result).toBe(expected);
  });

  test("testing that a known quants can be shorter than input", () => {
    let input: quantityStrict[] = ["Long", "Short", "Short", "Long", "Long"];
    let knownQuants: quantity[] = [
      "Long",
      "Short",
      "Short",
      "Undefined",
      "Short",
    ];
    let expected = true;
    let result = validateRhythm(knownQuants, input, 4);
    expect(result).toBe(expected);
  });
});
