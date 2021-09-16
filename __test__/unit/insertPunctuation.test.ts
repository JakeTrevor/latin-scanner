import {
  insertPunctuation,
  removePunctuation,
} from "../../src/punctuationFunctions";

describe("Testing insertPunctuation function", () => {
  test("inserting punctuation back into a line", () => {
    let input = "arma virumque cano troiae qui primus ab oris";
    let expected = "arma, virumque. :cano; troi-ae() qui! primus? ab oris..";
    let [punctuation, clean] = removePunctuation(expected);
    expect(insertPunctuation(input.split(""), punctuation, [])).toEqual(
      expected.split("")
    );
  });

  test.todo("testing inserting punctuation when breaks are present");
  () => {
    let input = "arma| virumque| cano| troiae qui primus ab oris";
    let expected = "arma|, virumque|. :cano|; troi-ae() qui! primus? ab oris..";
    let breaks = [4, 14, 20];
    let [punctuation, clean] = removePunctuation(expected);
    expect(insertPunctuation(input.split(""), punctuation, [])).toEqual(
      expected.split("")
    );
  };
});
