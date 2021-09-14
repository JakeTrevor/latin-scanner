import {
  convertToQuantityArray,
  validateRhytms,
  convertRhythmsToScanObjectArray,
  checkForLongShortLong,
} from "./lineAnalysisSubFunctions";
import type { analysedLine, footType, quantity } from "./types";
import { nBitCombos, sum } from "./utils";

export function analyseHex(map: Record<number, quantity>): analysedLine {
  let vowels = Object.keys(map)
    .map((el) => parseInt(el))
    .sort();
  let numberOfVowels = vowels.length;
  let numberOfDactyls = numberOfVowels - 13;

  if (numberOfDactyls > 4) {
    return { scans: [], error: "This line has too many vowels" };
  } else if (numberOfDactyls < 0) {
    return { scans: [], error: "This line has too few vowels" };
  }

  let rhythmsOfCorrectLength = nBitCombos(4).filter((el) => {
    return sum(el) === numberOfDactyls;
  });

  let rhythmsWithEndings = rhythmsOfCorrectLength.map(
    (rhythm: (0 | 1 | 2)[]) => {
      return rhythm.concat([1, 0]);
    }
  );

  //we dont need to analyse the last 5 vowels for hex
  //since they are gauranteed.
  let last5Vowels = vowels.slice(-5);
  let mapTrimmedForAnalysis = { ...map };
  for (let each of last5Vowels) {
    delete mapTrimmedForAnalysis[each];
  }
  let lineContainsLSL = checkForLongShortLong(Object.values(map));

  let result = analyse(
    rhythmsWithEndings,
    mapTrimmedForAnalysis,
    lineContainsLSL
  );
  return result;
}

export function analysePen(map: Record<number, quantity>): analysedLine {
  let vowels = Object.keys(map)
    .map((el) => parseInt(el))
    .sort();
  let numberOfVowels = vowels.length;
  let numberOfDactyls = numberOfVowels - 12;

  if (numberOfDactyls > 2) {
    return { scans: [], error: "This line has too many vowels" };
  } else if (numberOfDactyls < 0) {
    return { scans: [], error: "This line has too few vowels" };
  }

  let rhythmsOfCorrectLength = nBitCombos(4).filter((el) => {
    return sum(el) === numberOfDactyls;
  });

  let rhythmsWithEndings = rhythmsOfCorrectLength.map(
    (rhythm: (0 | 1 | 2)[]) => {
      return rhythm.concat([2, 0, 0, 2]);
    }
  );

  //we dont need to analyse the last 8 vowels for pent.
  //since they are gauranteed.
  let last8Vowels = vowels.slice(-8);
  let mapTrimmedForAnalysis = { ...map };
  for (let each of last8Vowels) {
    delete mapTrimmedForAnalysis[each];
  }
  let lineContainsLSL = checkForLongShortLong(Object.values(map));

  let result = analyse(
    rhythmsWithEndings,
    mapTrimmedForAnalysis,
    lineContainsLSL
  );
  return result;
}

function analyse(
  rhythmsOfCorrectLength: footType[][],
  map: Record<number, quantity>,
  containsLSL: boolean
) {
  let knownQuantValues = Object.values(map);
  let vowelPositions = Object.keys(map).map((each) => {
    return parseInt(each);
  });

  let rhythmsAsQuantities = convertToQuantityArray(rhythmsOfCorrectLength);
  let validRhythms = validateRhytms(knownQuantValues, rhythmsAsQuantities);

  let scans = convertRhythmsToScanObjectArray(validRhythms, vowelPositions);

  //check for bad patterns
  let returnedObject: analysedLine = { scans: scans, error: "" };
  if (returnedObject.error) {
    //do nothing
  } else if (containsLSL) {
    returnedObject.error = "A long short long pattern is in this line.";
  } else if (validRhythms.length === 0) {
    returnedObject.error = "We have found no valid scans for this vowel set";
  }
  return returnedObject;
}

const ANALYSIS_FUNCTIONS = {
  Hexameter: analyseHex,
  Pentameter: analysePen,
};

export default ANALYSIS_FUNCTIONS;
