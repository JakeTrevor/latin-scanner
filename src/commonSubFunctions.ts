import { vowel, quantity, breakObject } from "./types";
import { getLetterWithMarking } from "./utils";

export function insertQuantities(
  lineArray: string[],
  quantities: Record<number, quantity>
) {
  let vowelPositions = Object.keys(quantities).map((el) => parseInt(el));
  for (let each of vowelPositions) {
    lineArray.splice(
      each,
      1,
      getLetterWithMarking(quantities[each], lineArray[each] as vowel)
    );
  }
  return lineArray;
}

export function insertBreaks(
  lineArray: string[],
  breaks: breakObject[]
  //vowelPositions: number[],
  //punctuation: IterableIterator<RegExpMatchArray>,
) {
  //if there are breaks for this line
  if (breaks) {
    for (let each of breaks.reverse()) {
      let position = each.position;
      lineArray.splice(position, 0, "|");
    }
  }
  return lineArray;
}
