import { preScan } from "../../src/commonFunctions";
import { quantity } from "../../src/types";

describe("Testing preScan function", () => {
  //for test 1
  let aeneidLineOne = "Arma virumque cano Troiae qui primus ab oris";
  let aeneidLineOneKnownQuantities: Record<number, quantity> = {
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

  //for test 2
  let aeneidLineOneWithForcedFirst =
    "Ărma virumque cano Troiae qui primus ab oris";
  let aeneidLineOneKnownQuantitiesWithForcedFirst = {
    ...aeneidLineOneKnownQuantities,
  };
  aeneidLineOneKnownQuantitiesWithForcedFirst[0] = "Short";

  test("test basic functionality", () => {
    let result = preScan(aeneidLineOne);
    expect(result).toEqual([aeneidLineOneKnownQuantities]);
  });

  test("test handing of forced vowels", () => {
    let result = preScan(aeneidLineOneWithForcedFirst);
    expect(result).toEqual([aeneidLineOneKnownQuantitiesWithForcedFirst]);
  });

  test.todo("testing handling of EU");
});
