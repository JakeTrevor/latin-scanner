//scan.ts
import type {
  outputObject,
  scannedLineObject,
  scanSettingsObject,
} from "./types";
import ANALYSIS_FUNCTIONS from "./lineAnalysisFunctions";
import { preScan, postScan } from "./commonFunctions";
import { switchElegaicMeter } from "./utils";
import { scannedLine } from "./classes";

//?tests being written
export let scanParagraph = (
  text: string,
  settings: scanSettingsObject
): scannedLineObject[] => {
  let lines = text.split("\n");
  let finishedLines: scannedLineObject[] = [];

  if (settings.elegaic) {
    for (let line of lines) {
      if (line !== "") {
        finishedLines.push(scanLine(settings, line));
        settings.meter = switchElegaicMeter(settings.meter);
      }
    }

    //if meter is not elegaic
  } else {
    for (let line of lines) {
      if (line !== "") {
        finishedLines.push(scanLine(settings, line));
      }
    }
  }

  return finishedLines;
};

//?partial testing
export let scanLine = (
  { meter }: scanSettingsObject,
  line: string
): scannedLineObject => {
  let output: scannedLineObject = new scannedLine(meter, line);

  let [firstPass, strippedLine, punctuation] = preScan(line);

  for (let each of firstPass) {
    let temp: outputObject = { raw: "", full: [], error: "" };
    temp.raw = postScan(strippedLine, punctuation, each, []);

    let { scans, error } = ANALYSIS_FUNCTIONS[meter](each);
    temp.error = error;

    temp.full = scans.map((each) => {
      let [sylables, breaks] = each;
      return postScan(strippedLine, punctuation, sylables, breaks);
    });

    output.output.push(temp);
  }

  if (output.numberOfSolutions === 1) {
    output.status = "OK";
    output.statusMessage = "This line has been scanned in " + meter;
  } else if (output.numberOfSolutions > 1) {
    output.status = "Plus";
    output.statusMessage = "This line has multiple scans in " + meter;
  }
  return output;
};

export let defaultSettings: scanSettingsObject = {
  meter: "Hexameter",
  elegaic: false,
};
