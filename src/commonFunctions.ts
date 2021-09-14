import type { quantity, breakObject } from "./types";
import expressions, { findAllMatches, nBitCombos } from "./utils";
import { insertPunctuation } from "./punctuationFunctions";
import { insertBreaks, insertQuantities } from "./commonSubFunctions";

//TODO *try* to reduce clutter in this function.
export let preScan = (line: string): Record<number, quantity>[] => {
  line = line.toLowerCase();

  //pull out all the forced vowels and normalise the string.
  let forcedSpondees = findAllMatches(line, expressions.spondeeVowels);
  let forcedDactyls = findAllMatches(line, expressions.dactylVowels);
  line = line.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  //remove fake/silent vowels, replace with placeholder.
  line = line.replace(expressions["silent1"], " @y");
  line = line.replace(expressions["silent2"], "q@");

  //get a list of vowel positions
  let vowelPositions = findAllMatches(line, expressions["vowels"]);

  let ellisionsOnFirstWord = findAllMatches(
    line,
    expressions["ellisionOnFirstChar"]
  );
  let ellisionsOnSecondWord = findAllMatches(
    line,
    expressions["ellisionOnLastChar"]
  ).map(
    //this line changes the pos. so they refer to the first letter of the second word.
    (x) => vowelPositions[vowelPositions.indexOf(x) + 1]
  );

  //now we look for known quantity.
  let longByPos = findAllMatches(line, expressions["twoConsonants"]);
  let diphs = findAllMatches(line, expressions["diphthongs"]);
  let diphthongSecondVowels = diphs.map((x) => x + 1);
  //look for "eu" formations. these are weird and are handled later.
  let possibleDiphs = findAllMatches(line, expressions["maybeDiphthong"]);
  //find cases of vowel adjacency where no diphthong is formed.
  let adjacentVowels = findAllMatches(line, expressions["doubleVowel"]).filter(
    (pos) => !(diphs.includes(pos) || possibleDiphs.includes(pos))
  );

  //clean up into three variables:
  let spondees: number[] = [];
  let dactyls: number[] = [];
  let fakes: number[] = [];

  spondees = spondees.concat(longByPos, diphs);
  dactyls = dactyls.concat(adjacentVowels);
  fakes = fakes.concat(
    diphthongSecondVowels,
    ellisionsOnFirstWord,
    ellisionsOnSecondWord
  );

  //remove fakes
  vowelPositions = vowelPositions.filter((x) => !fakes.includes(x));
  spondees = spondees.filter((x) => !fakes.includes(x));
  dactyls = dactyls.filter((x) => !fakes.includes(x));

  //now we add in the forced quantities
  //dactyls first
  vowelPositions = vowelPositions.concat(forcedDactyls);
  spondees = spondees.filter((x) => !forcedDactyls.includes(x));
  dactyls = dactyls.concat(forcedDactyls);

  //and now spondees
  vowelPositions = vowelPositions.concat(forcedSpondees);
  dactyls = dactyls.filter((x) => !forcedSpondees.includes(x));
  spondees = spondees.concat(forcedSpondees);

  //remove duplicates
  vowelPositions = vowelPositions.filter((item, pos) => {
    return vowelPositions.indexOf(item) === pos;
  });
  dactyls = dactyls.filter((item, pos) => {
    return dactyls.indexOf(item) === pos;
  });
  spondees = spondees.filter((item, pos) => {
    return spondees.indexOf(item) === pos;
  });

  //setup the quants dict. mapping position to a default value of 0
  let quants: Record<number, quantity> = {};
  for (let position of vowelPositions) {
    quants[position] = "Undefined";
  }

  //write in the spondees and dactyls
  for (let each of spondees) {
    quants[each] = "Long";
  }
  for (let each of dactyls) {
    quants[each] = "Short";
  }

  //now to handle the maybe Dipthongs
  let outputArr: Record<number, quantity>[];
  if (possibleDiphs.length !== 0) {
    //there is an instance of "eu"
    let combos = nBitCombos(possibleDiphs.length);
    outputArr = [];
    for (let i = 0; i < combos.length; i++) {
      for (let j = 0; j < possibleDiphs.length; j++) {
        delete quants[possibleDiphs[j]];
        delete quants[possibleDiphs[j] + 1];
        if (combos[i][j] === 0) {
          quants[possibleDiphs[j]] = "Long";
        } else {
          quants[possibleDiphs[j]] = "Short";
          quants[possibleDiphs[j] + 1] = "Undefined";
        }
      }
      outputArr.push({ ...quants }); //deepcopy
    }
  } else {
    //there is no instance of "eu"
    outputArr = [quants];
  }

  return outputArr;
};

export let postScan = (
  lineString: string,
  punctuation: IterableIterator<RegExpMatchArray>,
  quantities: Record<number, quantity>,
  breaks: breakObject[]
): string => {
  let lineArray: string[] = Array.from(lineString);

  //set the line for each break; if this not done, will throw error.
  for (let each of breaks) {
    each.line = lineString;
  }

  //insert acented letters
  lineArray = insertQuantities(lineArray, quantities);

  // add in breaks
  lineArray = insertBreaks(lineArray, breaks);

  //add the punctuation back in
  lineArray = insertPunctuation(lineArray, punctuation, breaks);

  return lineArray.join("");
};
