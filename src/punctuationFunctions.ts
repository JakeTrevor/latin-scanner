import { breakObject, regexMatch } from "./types";
import expressions from "./utils";

//*tested
export let insertPunctuation = (
  lineArray: string[],
  punctuation: regexMatch[],
  breaks: breakObject[]
): string[] => {
  let breakPositions: number[] = breaks.map((el) => el.position);

  for (let each of punctuation) {
    let positionOfMatch = each.index as number;
    let matchLiteral = each.value;

    let offset = breakPositions.reduce((acc, val) => {
      if (val <= positionOfMatch) {
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
export let removePunctuation = (line: string): [regexMatch[], string] => {
  let markup = line.matchAll(expressions["punctuation"]);
  let output: regexMatch[] = [];
  for (let each of markup) {
    let temp: regexMatch = { index: each.index as number, value: each[0] };
    output.push(temp);
  }

  line = line.replace(expressions["punctuation"], "");
  return [output, line];
};
