import {
  insertPunctuation,
  removePunctuation,
} from "../../src/punctuationFunctions";

let testSentence = "arma, virumque. :cano; troi-ae() qui! primus? ab oris..";
let cleanTestSentence = "arma virumque cano troiae qui primus ab oris";
let [punctuation, clean] = removePunctuation(testSentence);

describe("Testing insertPunctuation function", () => {
  //declaring test dependencies:
  //"./removePunctuation.test.ts"
  test("inserting punctuation back into a line", () => {
    let cleanSentenceArray = cleanTestSentence.split("");
    let testSentenceArray = testSentence.split("");
    expect(insertPunctuation(cleanSentenceArray, punctuation)).toEqual(
      testSentenceArray
    );
  });
});
