import {
  scannedLineObject,
  outputObject,
  breakObject,
  meter,
  scanStatus,
} from "./types";

export class scannedLine implements scannedLineObject {
  status: scanStatus = "Warning";
  output: outputObject[] = [];
  statusMessage: string;
  meter: meter;
  line: string;

  constructor(meter: meter, line: string) {
    this.line = line;
    this.meter = meter;
    this.statusMessage = "This line cannot be scanned in " + meter;
  }

  get flat() {
    let temp: string[] = [];
    temp.push(this.line);

    for (let each of this.output) {
      temp = temp.concat(each.raw, each.full);
    }

    return temp;
  }

  get solutions() {
    let temp: string[] = [];
    for (let each of this.output) {
      temp = temp.concat(each.full);
    }
    return temp;
  }

  get numberOfSolutions() {
    let temp = 0;
    for (let each of this.output) {
      temp += each.full.length;
    }
    return temp;
  }
}

export class syllableBreak implements breakObject {
  preceedingVowel: number;
  succeedingVowel: number;
  line: string = ""; //this is not in the constructor because when the break object is created, it is not easy to add the line.

  constructor(preceedingVowel: number, succeedingVowel: number) {
    this.preceedingVowel = preceedingVowel + 1;
    //we need this to be the position just after the preceeding vowel in every subsequent computation;
    //so we add one here.
    this.succeedingVowel = succeedingVowel;
  }

  get position(): number {
    if (this.line === "") {
      throw "Line not set";
    }
    let subsection =
      this.line.substring(this.preceedingVowel, this.succeedingVowel) || "@";
    //! "@" is needed to prevent "" from being passed to subsection
    //! which would case this to return true when it ought to be false.

    if (/\s/.test(subsection)) {
      return this.preceedingVowel + subsection.search(/\s/);
    } else if (/[aeiouy]/.test(subsection[0])) {
      return this.preceedingVowel + 1;
    }
    return this.preceedingVowel;
  }
}
