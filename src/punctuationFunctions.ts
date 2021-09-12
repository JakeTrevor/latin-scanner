import expressions from "./utils";

export let insertPunctuation = (
  lineArray: string[],
  punctuation: IterableIterator<RegExpMatchArray>
): string[] => {
  for (let each of punctuation) {
    let positionOfMatch = each.index as number;
    let matchLiteral = each[0];
    lineArray.splice(positionOfMatch, 0, matchLiteral);
  }
  return lineArray;
};

export let removePunctuation = (
  line: string
): [IterableIterator<RegExpMatchArray>, string] => {
  let markup = line.matchAll(expressions["punctuation"]);
  line = line.replace(expressions["punctuation"], "");
  return [markup, line];
};

export function insertBreaks(
  breaks: number[],
  vowelPositions: number[],
  punctuation: IterableIterator<RegExpMatchArray>,
  line: string[]
) {
  //if there are breaks for this line
  if (breaks) {
    let nextVowelAfterBreak = getVowelsAfterBreaks(vowelPositions, breaks);
    adjustBreakPositionsForSpacesAndDiphthongs(nextVowelAfterBreak);

    for (let i = 0; i < breaks.length; i++) {
      breaks[i] += i;
    }

    //correct for punctuation
    let punctuationPositions = Object.keys(punctuation).map((el) => {
      return parseInt(el);
    });
    for (let i = 0; i < breaks.length; i++) {
      for (let each of punctuationPositions) {
        if (each < breaks[i]) {
          breaks[i] += 1;
        }
      }
    }

    //insert
    for (let each of breaks) {
      line.splice(each, 0, "|");
    }
  }
  return line;

  function adjustBreakPositionsForSpacesAndDiphthongs(
    nextVowelAfterBreak: number[]
  ) {
    let lineString = line.join("");
    for (let i = 0; i < breaks.length; i++) {
      let subsection =
        lineString.substring(breaks[i], nextVowelAfterBreak[i]) || "@"; //! "@" is needed to prevent "" default, which causes an error
      if (/\s/.test(subsection)) {
        breaks[i] += subsection.search(/\s/);
      } else if (/[aeiouy]/.test(subsection[0])) {
        breaks[i] += 1;
      }
    }
  }

  function getVowelsAfterBreaks(vowelPositions: number[], breaks: number[]) {
    let vowelsFollowingBreak: number[] = [];
    let nextVowelIsAfterBreak = false;
    for (let each of vowelPositions) {
      if (nextVowelIsAfterBreak) {
        vowelsFollowingBreak.push(each);
        nextVowelIsAfterBreak = false;
      }
      if (breaks.includes(each + 1)) {
        nextVowelIsAfterBreak = true;
      }
    }
    return vowelsFollowingBreak;
  }
}
