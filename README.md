# Latin-Scanner

Latin-scanner is a javascript libarary that can scan latin poetry
<br>
[What is scansion?](https://latin-scan.com/#/about)

## Installation

Use [npm](https://www.npmjs.com/) to install latin-scanner

```bash
npm install latin-scanner
```

# Usage

## functions

---

There are two user-facing functions in the latin-scanner libarary. Both of these accept a settings object and a string as arguments.

`scanLine(settings, line)` is a named export and will assume that its string input is a line of poetry. It returns a scannedLine object which contains the solutions found as well as meta data about the scan.

`scanParagraph(settings, paragraph)` is the default export and will break its string input on lineBreaks (\n) and pass each line into the scanLine. It returns the results as an array of scannedLine objects.

## Settings Object

---

the scanSettings object is the same for both functions described above. There are three properties on the object:

- `meter`: <br>
  The meter (a `string` with the value of `"Hexameter"` or `"Pentameter"`) of the content to be scanned.
- `elegaic`: <br>
  A `boolean` that denotes weather the paragraph should be scanned in Elegaic;

  > Elegaic poetry is multi-line by nature and therefore it is ony supported within the scanParagraph function. The `elegaic` property has no effect on the scanLine function.

  When this is true, the meter declared in the `meter` property will be used for the first "line", and it will cycle back and forth for each consecutive non-null line.

- `subscriptIgnoredText`: <br>
  A boolean which denotes weather "ignored" sections of text (such as those caught in elisions, or the second vowel of a diphthong) should be sandwitched between `<sub></sub>` tags.
  when displaying the output as HTML, this can provide a very easy solution to marking in such sections. however, when printing to a non-HTML situation, this can cause more problems than it solves.

There is annother named export named "default settings" which can be used as an example - it is configured to handle Hexameter lines.

## scannedLine object

---

The results for the scanner functions are returned with an interfaced called scannedLineObject.
There are 5 data properties on this object, and 3 further properties which can help access the data.

- `status`:<br>
  takes on a value of either "Warning", "OK" or "Plus". This indicates weather the algoithm was able to produce a single scan (OK) multiple scans (Plus) or no scan (Warning).

- `statusMessage`:<br>
  additional information pertaining to the status of the scan. This is most obviously useful when the status is Warning, as it is sometimes used to pass back data about why the line is failing to scan. NB that sometimes this data is passed back in the error property instead.

- `meter`:<br>
  returns the meter the line was scanned with.

- `line`:<br>
  the input line provided.

- `output`:<br>
  an array of `outputObjects`

the following properties do not contain any new data; instead, they provide useful ways to access the data we have already discussed.

- `flat`:<br>
  flattens the scan data into a single array. the first entry is the input, and then each output object is flattened wth the raw scan first followed by its solutions.

- `solutions`:<br>
  an array only of the solutions - the full scans of the line. NB the difference between flat and solutions; flat contains input and raw scans as well.

- `numberOfSolutions`:<br>
  contains the number of true solutions (full scans) found.

## outputObject

---

A single line can often be scanned in more than one way. whats more, there are times when there is more than one way to pick out the vowels in that line (consider the words Deus and Teucri). It is useful therefore to organise the soulutions to the line in a more structured manner than a simple array.

The output object is the way such structure is provided. each output object in the output array represents one way to select the vowels in a line. there are three properties on this interface:

- `raw`:<br>
  a string which has the "known quantites" written in; a representation of how the vowels have been selected.

- `full`:<br>
  an array of strings, each one representing a full scan or solution to the line.

- `error`:<br>
  a string containing information about how this particular vowel set has scanned. this is most often useful when the vowelset produces no results. however, even when the line does scan, this property can still be non-null.

  For instance, in hexameter the last 5 vowels have fixed quantity, so it is assumed that the scan will fit without explicitly checking these syllables. But these syllables are still checked for Long-Short-Long patterns, and if one is found a message will be placed in the error property. this is intended to improve the experience for composers of poetry.

## Examples

---

```javascript
import { scanLine, defaultSettings } from "latin-scanner";

let AeneidLine1 = "Arma virumque cano, Troiae qui primus ab oris";

console.log(scanLine(defaultSettings, AeneidLine1).solutions);
//should return:
//Ārmă vĭ|rūmquĕ că|nō, Trō|iāe quī| prīmŭs ăb| ōris.
```

```javascript
import scanParagraph from "latin-scanner";

let AmoresIntroduction ="""
Qui modo Nasonis fueramus quinque libelli,
    tres sumus; hoc illi praetulit auctor opus.
ut iam nulla tibi nos sit legisse voluptas,
    at levior demptis poena duobus erit.
"""
//set the settings for elegaic poetry starting with hexameter
let Settings = {
  meter: "Hexameter",
  elegaic: true,
  subscriptIgnoredText: false,
};

let results = scanParagraph(Settings, AmoresIntroduction)

for (let each of results){
    console.log(each.solutions) //will scanfirst
}
```

## Contributing

If you're interested in things as weird and niche as this, pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
