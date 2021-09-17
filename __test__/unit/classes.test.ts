//Miscannelaenous testing for classes defined in classes.ts

import { scannedLine, syllableBreak } from "../../src/classes";
import { outputObject } from "../../src/types";

describe("Testing syllableBreak Class", () => {
  test("testing position function throws error when line not set", () => {
    let testObj = new syllableBreak(0, 4);
    let testFunction = () => {
      testObj.position;
    };
    expect(testFunction).toThrowError("Line not set");
  });

  test("testing position function", () => {
    let testObj = new syllableBreak(0, 4);
    testObj.line = "Is is a line";
    expect(testObj.position).toEqual(2);
  });
});

describe("Testing scannedLine class", () => {
  test("Testing constructor", () => {
    let testObj = new scannedLine("Hexameter", "input");
    let expected = "This line cannot be scanned in Hexameter";
    expect(testObj.statusMessage).toEqual(expected);
    expect(testObj.status).toEqual("Warning");
    expect(testObj.flat).toEqual(["input"]);
    expect(testObj.solutions).toEqual([]);
    expect(testObj.numberOfSolutions).toEqual(0);
  });

  test("Testing getter functions", () => {
    let testObj = new scannedLine("Hexameter", "input");
    let output: outputObject[] = [
      { raw: "rawA", full: ["fullA1", "fullA2"], error: "" },
      { raw: "rawB", full: ["fullB1", "fullB2"], error: "" },
    ];
    testObj.output = output;

    expect(testObj.flat).toEqual([
      "fullA1",
      "fullA2",
      "rawA",
      "fullB1",
      "fullB2",
      "rawB",
      "input",
    ]);
    expect(testObj.solutions).toEqual(["fullA1", "fullA2", "fullB1", "fullB2"]);
    expect(testObj.numberOfSolutions).toEqual(4);
  });
});
