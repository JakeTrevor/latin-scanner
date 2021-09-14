import { syllableBreak } from "./classes";
import { quantity, quantityStrict, footType, breakObject } from "./types";

//*tested
export function checkForLongShortLong(line: quantity[]): boolean {
  if (line.length === 0) {
    return false;
  }
  const TARGET: quantity[] = ["Long", "Short", "Long"];
  let val = false;
  for (let i = 0; i < line.length - 2; i++) {
    let subsection = line.slice(i, i + 3);
    val = val || subsection.every((element, i) => element === TARGET[i]);
  }
  return val;
}

export function convertToQuantityArray(
  rhythmArray: footType[][]
): [quantityStrict[], number[]][] {
  //init variables
  let output: [quantityStrict[], number[]][] = [];
  let rhythmInSyllables: quantityStrict[];
  let breaks: number[];

  //loop over each rhythm
  for (let rhythm of rhythmArray) {
    rhythmInSyllables = [];
    breaks = [];

    //loop over rhythm syllable in the rhytm
    for (let foot of rhythm) {
      [rhythmInSyllables, breaks] = addFoot(rhythmInSyllables, breaks, foot);
    }

    output.push([rhythmInSyllables, breaks]); //push this to the list of meters
  }
  return output;
}

function addFoot(
  quantities: quantityStrict[],
  breaks: number[],
  foot: footType
): [quantityStrict[], number[]] {
  let footTypeToLiteral: Record<footType, quantityStrict[]> = {
    0: ["Long", "Long"] as quantityStrict[],
    1: ["Long", "short", "short"] as quantityStrict[],
    2: ["Long"] as quantityStrict[],
  };

  let footLiteral = footTypeToLiteral[foot];
  quantities.concat(footLiteral);

  breaks.push(quantities.length);

  return [quantities, breaks];
}

export function validateRhytms(
  knownQuantValues: quantity[],
  possibleRhythms: [quantityStrict[], number[]][]
) {
  let curQuant: quantity;
  let index: number;
  for ([index, curQuant] of knownQuantValues.entries()) {
    if (curQuant !== "Undefined") {
      for (let counter = 0; counter < possibleRhythms.length; counter++) {
        //check if there is a mismatch between known and proposed quants
        let currentRhythm = possibleRhythms[counter][0];
        if (currentRhythm[index] !== curQuant) {
          //if there is, remove the rhythm
          possibleRhythms.splice(counter, 1);
          counter--;
        }
      }
    }
  }

  return possibleRhythms;
}

export function convertRhythmsToScanObjectArray(
  validRhythms: [quantityStrict[], number[]][],
  vowelPositions: number[]
): [Record<number, quantity>, breakObject[]][] {
  let outputList = [];

  for (let each of validRhythms) {
    outputList.push(convertRhythmToScanObject(each, vowelPositions));
  }
  return outputList;
}

function convertRhythmToScanObject(
  [quantities, breaks]: [quantityStrict[], number[]],
  vowelPositions: number[]
): [Record<number, quantity>, breakObject[]] {
  //first deal with quantities
  let map: Record<number, quantity> = {};
  for (let [index, quantity] of quantities.entries()) {
    map[vowelPositions[index]] = quantity;
  }

  //then deal with breaks
  breaks.pop(); //remove the last break, which is unneccessary
  let breaksList: breakObject[] = [];
  for (let each of breaks) {
    let start = vowelPositions[each];
    let end = vowelPositions[each + 1];
    breaksList.push(new syllableBreak(start, end));
  }
  return [map, breaksList];
}
