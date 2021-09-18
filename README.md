# Latin-Scanner

Latin-scanner is a javascript libarary that can scan latin poetry.

[What is scansion?](https://latin-scan.com/#/about)

take a look at the [github repo](https://github.com/JakeTrevor/latin-scanner)

and the package on [npm](https://www.npmjs.com/package/latin-scanner)

## Installation

Use [npm](https://www.npmjs.com/) to install latin-scanner

```bash
npm install latin-scanner
```

## Usage

This API provides all of its functionality via named exports. There are three:

1. `scanLine`
2. `scanParagraph`
3. `defaultSettings`

## functions

There are two user-facing functions in the latin-scanner libarary. Both of these accept a settings object and a string as arguments.

`scanLine(settings, line)` will assume that its string input is a line of poetry. It returns a scannedLine object which contains the solutions found as well as meta data about the scan.

`scanParagraph(settings, paragraph)` will break its string input on lineBreaks ("\n") and pass each line into the scanLine function. It returns the results as an array of scannedLine objects.

## Settings Object

The scanSettings object is how settings are passed to the analyser functions, and it is the same for both functions described above. There are two properties on the object:

- `meter`:

  The meter (a `string` with the value of `"Hexameter"` or `"Pentameter"`) of the content to be scanned.

- `elegaic`:

  A `boolean` that denotes weather the paragraph should be scanned in Elegaic;

  > Elegaic poetry is multi-line by nature and therefore it is ony supported within the scanParagraph function. The `elegaic` property has no effect on the scanLine function.

  When this is true, the meter declared in the `meter` property will be used for the first "line", and it will cycle back and forth for each consecutive non-null line.

The defaultSettings export is an instantiation of this interface, configured to handle Hexameter poetry.

## scannedLine object

The results for the scanner functions are returned with an interfaced called scannedLineObject.
There are 5 data properties on this object, and 3 further properties which can help access the data.

- `status`:

  Takes on a value of either "Warning", "OK" or "Plus". This indicates weather the algoithm was able to produce a single scan (OK) multiple scans (Plus) or no scan (Warning).

- `statusMessage`:

  Additional information pertaining to the status of the scan. This is most obviously useful when the status is Warning, as it is sometimes used to pass back data about why the line is failing to scan. NB that error information is also passed back in the error property of objects in the "`output`" property.

- `meter`:

  Returns the meter the line was scanned with.

- `line`:

  The input line provided.

- `output`:

  An array of `outputObjects`. [See the definition](#outputObject)

The following properties do not contain any new data; instead, they provide useful ways to access the data we have already discussed.

- `flat`:

  Flattens the scan data into a single array. The first entry is the input, and then each output object is flattened wth the raw scan first followed by its solutions.

- `solutions`:

  An array only of the solutions - the full scans of the line. NB the difference between flat and solutions; flat contains input and raw scans as well.

- `numberOfSolutions`:

  Contains the number of solutions (full scans) found.

## outputObject

---

A single line can often be scanned in more than one way. What's more, there are times when there is more than one way to pick out the vowels in that line; consider how the EU in the words "Deus" and "Teucri" are read differently, despite there being no visible difference. It is useful therefore to organise the soulutions to the line in a more structured manner than a simple array.

The output object is the way such structure is provided. Each output object in the output array represents one way to select the vowels in a line. There are three properties on this interface:

- `raw`:

  A string which has the "known quantites" written in; a representation of how the vowels have been selected.

- `full`:

  An array of strings, each one representing a full scan or solution to the line.

- `error`:

  A string containing information about how this particular vowel set has scanned. This is most often useful when the vowelset produces no results. However, even when the line does scan, this property can still be non-null.

  For instance, in hexameter the last 5 vowels have fixed quantity, so it is assumed that the scan will fit without explicitly checking these syllables. But these syllables are still checked for Long-Short-Long patterns, and if one is found a message will be placed in the error property. This is intended to improve the experience for composers of poetry.

## Contributing

If you're interested in things as weird and niche as this, you're certainly welcome to email me and and get involved in the project.

## License

[MIT](https://choosealicense.com/licenses/mit/)
