import { insertPunctuation } from "../../src/punctuationFunctions";
import { breakObject } from "../../src/types";

describe("Testing insertPunctuation function", () => {
  test("inserting punctuation back into a line", () => {
    let input = "arma virumque cano troiae qui primus ab oris";
    let expected = "arma, virumque. :cano; troi-ae() qui! primus? ab oris..";
    let punctuation = [
      { index: 4, value: "," },
      { index: 14, value: "." },
      { index: 16, value: ":" },
      { index: 21, value: ";" },
      { index: 27, value: "-" },
      { index: 30, value: "(" },
      { index: 31, value: ")" },
      { index: 36, value: "!" },
      { index: 44, value: "?" },
      { index: 53, value: "." },
      { index: 54, value: "." },
    ];
    expect(insertPunctuation(input.split(""), punctuation, [])).toEqual(
      expected.split("")
    );
  });

  test("testing inserting punctuation when breaks are present", () => {
    let input = "arma| virumque| cano| troiae qui primus ab oris";
    let expected = "arma|, virumque|. :cano|; troi-ae() qui! primus? ab oris..";
    let breaks: breakObject[] = [
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 4 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 14 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 20 },
    ];
    let punctuation = [
      { index: 4, value: "," },
      { index: 14, value: "." },
      { index: 16, value: ":" },
      { index: 21, value: ";" },
      { index: 27, value: "-" },
      { index: 30, value: "(" },
      { index: 31, value: ")" },
      { index: 36, value: "!" },
      { index: 44, value: "?" },
      { index: 53, value: "." },
      { index: 54, value: "." },
    ];

    expect(
      insertPunctuation(input.split(""), punctuation, breaks).join("")
    ).toEqual(expected);
  });
});
