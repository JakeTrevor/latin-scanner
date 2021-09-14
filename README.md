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

- meter
  <br>
  The meter (a `string` with the value of `"Hexameter"` or `"Pentameter"`) of the content to be scanned.
- elegaic
  <br>
  A `boolean` that denotes weather the paragraph should be scanned in Elegaic;

  > Elegaic poetry is multi-line by nature and therefore it is ony supported within the scanParagraph function. The `elegaic` property has no effect on the scanLine function.

  When this is true, the meter declared in the `meter` property will be used for the first "line", and it will cycle back and forth for each consecutive non-null line.

- subscriptIgnoredText
  <br>
  A boolean which denotes weather "ignored" sections of text (such as those caught in elisions, or the second vowel of a diphthong) should be sandwitched between `<sub></sub>` tags.
  when displaying the output as HTML, this can provide a very easy solution to marking in such sections. however, when printing to a non-HTML situation, this can cause more problems than it solves.

There is annother named export named "default settings" which can be used as an example - it is configured to handle Hexameter lines.

## scannedLine object

---

The results for

## Example

---

```javascript
import { scanLine, defaultSettings } from "latin-scanner";

let AeneidLine1 = "Arma virumque cano, Troiae qui primus ab oris";

console.log(scanLine(defaultSettings, AeneidLine1).solutions);
//should return:
//Ārmă vĭ|rūmquĕ că|nō, Trō|iāe quī |prīmŭs ă|b ōris.
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

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
