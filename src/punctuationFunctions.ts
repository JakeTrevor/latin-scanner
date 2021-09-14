import { breakObject } from "./types";
import expressions from "./utils";

//*tested
export let insertPunctuation = (
  lineArray: string[],
  punctuation: IterableIterator<RegExpMatchArray>,
  breaks: breakObject[]
): string[] => {
  let breakPositions: number[] = breaks.map((el) => el.position);

  for (let each of punctuation) {
    let positionOfMatch = each.index as number;
    let matchLiteral = each[0];

    let offset = breakPositions.reduce((acc, val) => {
      if (val < positionOfMatch) {
        return acc + 1;
      }
      return acc;
    }, 0);

    let positionAdjustedForBreaks = positionOfMatch + offset;
    lineArray.splice(positionAdjustedForBreaks, 0, matchLiteral);
  }
  return lineArray;
};

//*tested
export let removePunctuation = (
  line: string
): [IterableIterator<RegExpMatchArray>, string] => {
  let markup = line.matchAll(expressions["punctuation"]);
  line = line.replace(expressions["punctuation"], "");
  return [markup, line];
};
