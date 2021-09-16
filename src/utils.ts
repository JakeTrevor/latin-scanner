import { vowel, quantity, quantityStrict, meter } from "./types";

//regex expressions for constants to do with latin lanaguge
export default {
  vowels: /[aeiouy]/g,
  diphthongs: /(ae)|(au)|(ei)|(oe)|(oi)|(ui)/g,
  maybeDiphthong: /(eu)/g,
  doubleVowel: /[aeiouy][aeiouy]/g,
  spondeeVowels: /[āēīōūȳ]/g,
  dactylVowels: /[ăĕĭŏŭy̌]/g,
  silent1: /(\sia)|(\sio)|(\siu)/g,
  silent2: /(qu)/g,
  twoConsonants: /[aeiouy]\s*([b-df-hj-np-tvwxz]\s*[b-df-hj-np-tvwxz])|[xz]}/g,
  ellisionOnFirstChar:
    /([aeiouy]m\s+[aeiouy])|([aeiouy]\s+h[aeiouy])|([aeiouy]m\s+h[aeiouy])/g,
  ellisionOnLastChar: /[aeiouy]\s+[aeiouy]/g,
  punctuation: /[,.?!;:\-\[\]\(\)\{\}]/g,
};

//object that contains the alternate character set for the vowels
export const vowelsWithMarkings: Record<
  vowel,
  Record<quantityStrict, string>
> = {
  a: {
    Long: "ā",
    Short: "ă",
  },
  A: { Long: "Ā", Short: "Ă" },
  e: {
    Long: "ē",
    Short: "ĕ",
  },
  E: { Long: "Ē", Short: "Ĕ" },
  i: {
    Long: "ī",
    Short: "ĭ",
  },
  I: { Long: "Ī", Short: "Ĭ" },
  o: {
    Long: "ō",
    Short: "ŏ",
  },
  O: { Long: "Ō", Short: "Ŏ" },
  u: {
    Long: "ū",
    Short: "ŭ",
  },
  U: { Long: "Ū", Short: "Ŭ" },
  y: {
    Long: "ȳ",
    Short: "y̌",
  },
  Y: { Long: "Ȳ", Short: "Y̌" },
};

export function getLetterWithMarking(
  quantity: quantity,
  letter: vowel
): string {
  if (quantity === "Undefined" || !/[aeiouy]/.test(letter.toLowerCase())) {
    return letter;
  } else {
    return vowelsWithMarkings[letter][quantity];
  }
}

//TODO consider neccesity
export function findAllMatches(string: string, regex: RegExp): number[] {
  regex.test(""); //"clear" the regex, since .test() followed by .exec() will return second instance.
  let posArray: number[] = [];
  let objectReturnedByRegex: RegExpExecArray | null;
  while ((objectReturnedByRegex = regex.exec(string)) !== null) {
    posArray.push(objectReturnedByRegex.index);
  }
  return posArray;
}

//*tested
export function sum(arr: number[]): number {
  return arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
}

//*tested
export function nBitCombos(nBits: number): (0 | 1)[][] {
  let work: (0 | 1)[] = Array(nBits).fill(0);
  let output: (0 | 1)[][] = [[...work]];
  while (sum(work) < nBits) {
    work[nBits - 1] += 1;
    for (let i = nBits; i > 0; i--) {
      if (work[i] > 1) {
        work[i] = 0;
        work[i - 1]++;
      }
    }
    output.push([...work]);
  }
  return output.sort();
}

//*tested
export function switchElegaicMeter(meter: meter): meter {
  return meter === "Hexameter" ? "Pentameter" : "Hexameter";
}
