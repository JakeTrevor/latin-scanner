import {
  convertToQuantityArray,
  validateRhythm,
  convertRhythmsToScanObjectArray,
  checkForLongShortLong,
} from "./lineAnalysisSubFunctions";
import type { analysedLine, footType, quantity } from "./types";
import { nBitCombos, sum } from "./utils";

export function analyseHex(map: Record<number, quantity>): analysedLine {
  let vowels = Object.keys(map).map((el) => parseInt(el));
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

  let result = analyse(rhythmsWithEndings, map, 5);
  return result;
}

export function analysePen(map: Record<number, quantity>): analysedLine {
  let vowels = Object.keys(map).map((el) => parseInt(el));
  let numberOfVowels = vowels.length;
  let numberOfDactyls = numberOfVowels - 12;

  if (numberOfDactyls > 2) {
    return { scans: [], error: "This line has too many vowels" };
  } else if (numberOfDactyls < 0) {
    return { scans: [], error: "This line has too few vowels" };
  }

  let rhythmsOfCorrectLength = nBitCombos(2).filter((el) => {
    return sum(el) === numberOfDactyls;
  });

  let rhythmsWithEndings = rhythmsOfCorrectLength.map(
    (rhythm: (0 | 1 | 2)[]) => {
      return rhythm.concat([2, 1, 1, 2]);
    }
  );

  let result = analyse(rhythmsWithEndings, map, 8);
  return result;
}

function analyse(
  rhythmsOfCorrectLength: footType[][],
  map: Record<number, quantity>,
  dontCheck: number
) {
  let knownQuantValues = Object.values(map);
  let vowelPositions = Object.keys(map).map((each) => {
    return parseInt(each);
  });

  let rhythmsAsQuantities = rhythmsOfCorrectLength.map((el) => {
    return convertToQuantityArray(el);
  });

  let validRhythms = rhythmsAsQuantities.filter((el) => {
    return validateRhythm(knownQuantValues, el[0], dontCheck);
  });

  let scans = convertRhythmsToScanObjectArray(validRhythms, vowelPositions);

  //check for bad patterns
  let containsLSL = checkForLongShortLong(knownQuantValues);
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

export default {
  Hexameter: analyseHex,
  Pentameter: analysePen,
};
