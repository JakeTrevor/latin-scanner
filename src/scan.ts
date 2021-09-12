//scan.ts
import type {
  outputObject,
  scannedLineObject,
  scanSettingsObject,
  meterStrict,
} from "./types";
import { removePunctuation } from "./punctuationFunctions";
import ANALYSIS_FUNCTIONS from "./lineAnalysisFunctions";
import { preScan, postScan } from "./commonFunctions";
import { scannedLine, switchElegaicMeter } from "./utils";

export let scanParagraph = (
  text: string,
  settings: scanSettingsObject
): scannedLineObject[] => {
  let lines = text.split("\n");
  let finishedLines: scannedLineObject[] = [];

  if (settings.meter === "Elegaic") {
    let currentMeter = settings.firstMeter;

    for (let line of lines) {
      if (line !== "") {
        finishedLines.push(scanLine(currentMeter, line));
        currentMeter = switchElegaicMeter(currentMeter);
      }
    }

    //if meter is not elegaic
  } else {
    for (let line of lines) {
      if (line !== "") {
        finishedLines.push(scanLine(settings.meter, line));
      }
    }
  }

  return finishedLines;
};

export let scanLine = (meter: meterStrict, line: string): scannedLineObject => {
  let output: scannedLineObject = new scannedLine(meter, line);
  //start by stripping the line of punctuation and performin a first pass
  let [punctuation, strippedLine] = removePunctuation(line);

  let firstPass = preScan(strippedLine);

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
    output.status = meter + "OK";
    output.statusMessage = "This line has been scanned in " + meter;
  } else if (output.numberOfSolutions > 1) {
    output.status = meter + "+";
    output.statusMessage = "This line has multiple scans in " + meter;
  }
  return output;
};

export default scanParagraph;
