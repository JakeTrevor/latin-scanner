import { postScan } from "../../src/commonFunctions";
import { regexMatch, breakObject, quantity } from "../../src/types";

describe("Testing postScan function", () => {
  test("testing a line no args", () => {
    let line = "arma virumque cano troiae qui primus ab oris";
    let punc: regexMatch[] = [];
    let quants = {};
    let breaks: breakObject[] = [];
    let result = postScan(line, punc, quants, breaks);
    expect(result).toEqual(line);
  });

  test("testing a line only quants", () => {
    let line = "arma virumque cano troiae qui primus ab oris";
    let punc: regexMatch[] = [];
    let quants: Record<number, quantity> = {
      0: "Long",
      3: "Undefined",
      6: "Undefined",
      8: "Long",
      12: "Undefined",
      15: "Undefined",
      17: "Long",
      21: "Long",
      23: "Long",
      28: "Long",
      32: "Undefined",
      34: "Undefined",
      37: "Undefined",
      40: "Undefined",
      42: "Undefined",
    };
    let breaks: breakObject[] = [];
    let expected = "ārma virūmque canō trōiāe quī primus ab oris";
    let result = postScan(line, punc, quants, breaks);
    expect(result).toEqual(expected);
  });

  test("testing a line only punctuation", () => {
    let line = "arma virumque cano troiae qui primus ab oris";
    let punc: regexMatch[] = [
      { index: 4, value: ";" },
      { index: 19, value: "," },
      { index: 46, value: "." },
    ];
    let quants: Record<number, quantity> = {};
    let breaks: breakObject[] = [];
    let expected = "arma; virumque cano, troiae qui primus ab oris.";
    let result = postScan(line, punc, quants, breaks);
    expect(result).toEqual(expected);
  });

  test("testing a line only breaks", () => {
    let line = "arma virumque cano troiae qui primus ab oris";
    let punc: regexMatch[] = [];
    let quants: Record<number, quantity> = {};
    let breaks: breakObject[] = [
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 7 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 16 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 23 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 29 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 39 },
    ];
    let expected = "arma vi|rumque ca|no troi|ae qui| primus ab| oris";
    let result = postScan(line, punc, quants, breaks);
    expect(result).toEqual(expected);
  });

  test("testing a line breaks and punctuation", () => {
    let line = "arma virumque cano troiae qui primus ab oris";
    let punc: regexMatch[] = [
      { index: 4, value: ";" },
      { index: 19, value: "," },
      { index: 46, value: "." },
    ];
    let quants: Record<number, quantity> = {};
    let breaks: breakObject[] = [
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 7 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 16 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 23 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 29 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 39 },
    ];
    let expected = "arma; vi|rumque ca|no, troi|ae qui| primus ab| oris.";
    let result = postScan(line, punc, quants, breaks);
    expect(result).toEqual(expected);
  });

  test("testing a line with all args", () => {
    let line = "arma virumque cano troiae qui primus ab oris";
    let punc: regexMatch[] = [
      { index: 4, value: ";" },
      { index: 19, value: "," },
      { index: 46, value: "." },
    ];
    let quants: Record<number, quantity> = {
      0: "Long",
      3: "Undefined",
      6: "Undefined",
      8: "Long",
      12: "Undefined",
      15: "Undefined",
      17: "Long",
      21: "Long",
      23: "Long",
      28: "Long",
      32: "Undefined",
      34: "Undefined",
      37: "Undefined",
      40: "Undefined",
      42: "Undefined",
    };
    let breaks: breakObject[] = [
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 7 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 16 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 23 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 29 },
      { line: "", preceedingVowel: 0, succeedingVowel: 0, position: 39 },
    ];
    let expected = "ārma; vi|rūmque ca|nō, trōi|āe quī| primus ab| oris.";
    let result = postScan(line, punc, quants, breaks);
    expect(result).toEqual(expected);
  });
});
