import { removePunctuation } from "../../src/punctuationFunctions";

let cleanTestSentence = "arma virumque cano troiae qui primus ab oris";
let testSentence = "arma, virumque. :cano; troi-ae() qui! primus? ab oris..";
let punctuationPositions = {
  4: ",",
  14: ".",
  16: ":",
  21: ";",
  27: "-",
  30: "(",
  31: ")",
  36: "!",
  44: "?",
  53: ".",
  54: ".",
};

function regexToObj(matchArray: IterableIterator<RegExpMatchArray>) {
  let temp: Record<number, string> = {};
  for (let each of matchArray) {
    let positionOfMatch = each.index as number;
    let matchLiteral = each[0];
    temp[positionOfMatch] = matchLiteral;
  }
  return temp;
}
describe("Testing removePunctuation funcion", () => {
  () => {
    //no test dependencies.
  };
  test("removes punctuation from a string", () => {
    let [result, cleanLine] = removePunctuation(testSentence);
    let resultObj = regexToObj(result);
    expect(resultObj).toEqual(punctuationPositions);
    expect(cleanLine).toEqual(cleanTestSentence);
  });
});
