import { scanLine } from "../../src/scan";
import { defaultSettings } from "../../src/scan";

describe("Testing scanLine function", () => {
  test("testing with Aeneid ln 1 ", () => {
    let input = "Arma virumque cano, troiae qui primus ab oris;";
    let expected = "Ārmă vĭ|rūmquĕ că|nō, trō|iāe quī| prīmŭs ăb| ōrīs;";
    let result = scanLine(defaultSettings, input);
    expect(result.solutions).toContain(expected);
  });

  test("testing with forced vowel ", () => {
    let input = "Arma virumque cano, troiae qui primus ab orĭs;";
    let expected = "Ārmă vĭ|rūmquĕ că|nō, trō|iāe quī| prīmŭs ăb| ōrĭs;";
    let result = scanLine(defaultSettings, input);
    expect(result.solutions).toContain(expected);
  });
});
