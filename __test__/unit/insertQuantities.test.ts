import { insertQuantities } from "../../src/commonSubFunctions";
import { quantity } from "../../src/types";

describe("Testing insertQuantities function", () => {
  let aeneidLineOneArray = "Arma virumque cano Troiae qui primus ab oris".split(
    ""
  );
  let aeneidLineOneMarkings =
    "Ārma virūmque canō Trōiāe quī primus ab oris".split("");
  let AeneidLineOneKnownQuantities: Record<number, quantity> = {
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

  test("testing insert function", () => {
    let result = insertQuantities(
      aeneidLineOneArray,
      AeneidLineOneKnownQuantities
    );
    expect(result).toEqual(aeneidLineOneMarkings);
  });
});
