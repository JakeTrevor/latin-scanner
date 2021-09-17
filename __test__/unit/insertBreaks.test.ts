import { insertBreaks } from "../../src/commonSubFunctions";
import { breakObject } from "../../src/types";

describe("Testing insertBreaks function", () => {
  test("testing will null input", () => {
    let inputString = "arma virumque cano troiae qui primus ab oris".split("");
    let inputBreaks: breakObject[] = [];
    let result = insertBreaks(inputString, inputBreaks);
    expect(result).toEqual(inputString);
  });

  test("testing will breaks", () => {
    let inputString = "arma virumque cano troiae qui primus ab oris".split("");
    let inputBreaks: breakObject[] = [
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 7 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 16 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 23 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 29 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 39 },
    ];

    let expected = "arma vi|rumque ca|no troi|ae qui| primus ab| oris".split(
      ""
    );

    let result = insertBreaks(inputString, inputBreaks);
    expect(result).toEqual(expected);
  });
});
