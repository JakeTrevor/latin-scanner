import { vowel } from "./types";
import { findAllMatches, getLetterWithMarking } from "./utils";

const FORCED_SPONDEE_REGEX = /_[aeiouy]/g;
const FORCED_DACTYL_REGEX = /@[aeiouy]/g;
const FOUND_FORCED_VOWEL = /[@_][aeiouy]/;

export function replaceForcedQuantities(text: string): string {
  if (FOUND_FORCED_VOWEL.test(text.toLocaleLowerCase())) {
    text = catchForcedSpondees(text);
    text = catchForcedDactyls(text);
  }
  return text;
}

function catchForcedDactyls(text: string) {
  if (FORCED_DACTYL_REGEX.test(text.toLocaleLowerCase())) {
    let forcedDactyls = findAllMatches(
      text.toLocaleLowerCase(),
      FORCED_DACTYL_REGEX
    );
    for (let each of forcedDactyls) {
      let letter = text.charAt(each + 1) as vowel;
      let replacement = getLetterWithMarking("Short", letter);
      text = replaceLetter(text, each, replacement);
    }
  }
  return text;
}

function catchForcedSpondees(text: string) {
  if (FORCED_SPONDEE_REGEX.test(text.toLowerCase())) {
    let forcedSpondees = findAllMatches(
      text.toLocaleLowerCase(),
      FORCED_SPONDEE_REGEX
    );
    for (let each of forcedSpondees) {
      let letter = text.charAt(each + 1) as vowel;
      let replacement = getLetterWithMarking("Long", letter);
      text = replaceLetter(text, each, replacement);
    }
  }
  return text;
}

function replaceLetter(text: string, position: number, replacement: string) {
  return (
    text.substring(0, position) + replacement + text.substring(position + 2)
  );
}
