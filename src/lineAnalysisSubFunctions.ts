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

//*tested
export function convertToQuantityArray(
  rhythm: footType[]
): [quantityStrict[], number[]] {
  //init variables
  let output: [quantityStrict[], number[]];
  let rhythmInSyllables: quantityStrict[];
  let breaks: number[];

  //loop over each rhythm
  rhythmInSyllables = [];
  breaks = [];

  //loop over rhythm syllable in the rhytm
  for (let foot of rhythm) {
    rhythmInSyllables = addFoot(rhythmInSyllables, foot);
    breaks.push(rhythmInSyllables.length - 1);
  }
  output = [rhythmInSyllables, breaks];

  return output;
}

//*tested
export function addFoot(
  quantities: quantityStrict[],
  foot: footType
): quantityStrict[] {
  let footTypeToLiteral: Record<footType, quantityStrict[]> = {
    0: ["Long", "Long"] as quantityStrict[],
    1: ["Long", "Short", "Short"] as quantityStrict[],
    2: ["Long"] as quantityStrict[],
  };

  let footLiteral = footTypeToLiteral[foot];
  quantities = quantities.concat(footLiteral);

  return quantities;
}

//*tested
export function validateRhythm(
  knownQuantValues: quantity[],
  rhythmToValidate: quantityStrict[],
  dontCheck: number
): boolean {
  let curQuant: quantity;
  let index: number;
  let max = knownQuantValues.length - dontCheck;
  for ([index, curQuant] of knownQuantValues.entries()) {
    if (index === max) {
      break;
    }
    if (curQuant !== "Undefined") {
      let checkQuant = rhythmToValidate[index];
      if (curQuant !== checkQuant) {
        return false;
      }
    }
  }
  return true;
}

export function convertRhythmsToScanObjectArray(
  validRhythms: [quantityStrict[], number[]][],
  vowelPositions: number[]
): [Record<number, quantity>, breakObject[]][] {
  let outputList = validRhythms.map((el) => {
    return convertRhythmToScanObject(el, vowelPositions);
  });

  return outputList;
}

//?test being written
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
