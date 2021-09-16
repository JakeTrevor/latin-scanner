import { meter } from "../../src/types";
import { switchElegaicMeter } from "../../src/utils";

describe("Testing meter switcher", () => {
  test("tetsing hexameter input", () => {
    let input: meter = "Hexameter";
    let expected: meter = "Pentameter";
    let result = switchElegaicMeter(input);
    expect(result).toEqual(expected);
  });

  test("tetsing pentameter input", () => {
    let input: meter = "Pentameter";
    let expected: meter = "Hexameter";
    let result = switchElegaicMeter(input);
    expect(result).toEqual(expected);
  });
});
