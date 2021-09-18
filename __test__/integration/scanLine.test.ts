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

  test("testing with line that is too long (hexameter)", () => {
    let input =
      "Arma virumque canō, Trōiae quī prīmus ab ōrīs, Ītaliam, fātō profugus, Lāvīniaque vēnit "; //aeneid bk1 lns 1 & 2
    let settings = defaultSettings;
    let result = scanLine(settings, input);
    expect(result.numberOfSolutions).toEqual(0);
    expect(result.output[0].error).toEqual("This line has too many vowels");
  });

  test("testing with line that is too short (hexameter)", () => {
    let input = "Arma virumque canō,"; //half of aeneid 1.1
    let settings = defaultSettings;

    let result = scanLine(settings, input);
    expect(result.numberOfSolutions).toEqual(0);
    expect(result.output[0].error).toEqual("This line has too few vowels");
  });

  test("testing with line that is too long (pentameter)", () => {
    let input =
      "Arma virumque canō, Trōiae quī prīmus ab ōrīs, Ītaliam, fātō profugus, Lāvīniaque vēnit "; //aeneid bk1 lns 1 & 2
    let settings = defaultSettings;
    settings.meter = "Pentameter";

    let result = scanLine(settings, input);
    expect(result.numberOfSolutions).toEqual(0);
    expect(result.output[0].error).toEqual("This line has too many vowels");
  });

  test("testing with line that is too short (pentameter)", () => {
    let input = "Arma virumque canō,"; //half of aeneid 1.1
    let settings = defaultSettings;
    settings.meter = "Pentameter";

    let result = scanLine(settings, input);
    expect(result.numberOfSolutions).toEqual(0);
    expect(result.output[0].error).toEqual("This line has too few vowels");
  });

  test("testing with a line that has no scans.", () => {
    let input = "Ītaliam, fātō profugus, Lāvīniaque vēnit,"; //aeneid 1.2
    let settings = defaultSettings;
    let result = scanLine(settings, input);
    expect(result.numberOfSolutions).toEqual(0);
  });

  test.todo("testing with a line that has multiple scans");
  () => {
    let input = "quidve dolens, regina deum tot volvere casus,"; //aeneid 1.9
    let settings = defaultSettings;
    let result = scanLine(settings, input);

    expect(result.status).toEqual("Plus");
    expect(result.statusMessage).toEqual(
      "This line has multiple scans in Hexameter"
    );
    expect(result.numberOfSolutions).toEqual(2);
  };
  test.todo("testing with ellision on second word.");
  test.todo("testing with line including a long short long pattern ");
});
