import { scanLine } from "../../src/scan";
import { defaultSettings } from "../../src/scan";

describe("Testing scanLine function", () => {
  test("testing with Aeneid ln 1 ", () => {
    let input = "Arma virumque cano, troiae qui primus ab oris;";
    let expected = "Ārmă vĭ|rūmquĕ că|nō, trōi|āe quī| prīmŭs ăb| ōrīs;";
    let result = scanLine(defaultSettings, input);
    expect(result.solutions).toContain(expected);
  });

  test("testing with forced vowel", () => {
    let input = "Arma virumque cano, troiae qui primus ab orĭs;";
    let expected = "Ārmă vĭ|rūmquĕ că|nō, trōi|āe quī| prīmŭs ăb| ōrĭs;";
    let result = scanLine(defaultSettings, input);
    expect(result.solutions).toContain(expected);
  });

  test("testing with pentameter ", () => {
    let input = "edere, materia conveniente modis."; //metamorphoses bk1 sec1 ln2
    let expected = "ēdĕrĕ|, mātĕrĭ|ā| cōnvĕnĭ|ēntĕ mŏ|dīs.";
    let settings = defaultSettings;
    settings.meter = "Pentameter";
    let result = scanLine(settings, input);
    expect(result.solutions).toContain(expected);
  });

  test.todo("testing with ellision on second word.");

  test.todo("testing with line that is too long (hexameter)");
  test.todo("testing with line that is too short (hexameter)");
  test.todo("testing with line that is too long (pentameter)");
  test.todo("testing with line that is too short (pentameter)");
  test.todo("testing with a line that has no scans.");

  test.todo("testing with line including a long short long pattern ");

  test.todo("testing with a line that has multiple scans");
});
