'use strict';

let fs = require('fs');
let analyzeExports = require('./log_analyze.js');
let NoopProcessor = analyzeExports.NoopProcessor;
let AnonymizingPrinter = analyzeExports.AnonymizingPrinter;
let processLog = analyzeExports.processLog;

let exitCode = 0;
let errorFunc = (str) => {
  console.error(str);
  exitCode = 1;
};

class CollectingPrinter {
  constructor(fileName) {
    this.fileName = fileName;
    this.lines = [];
  }

  print(splitLine) {
    this.lines.push(splitLine);

    // TODO: uncomment this to print the anonymized line while testing.
    // console.log(splitLine.join('|'));
  }

  warn(reason, splitLine) {
    if (typeof splitLine === 'undefined')
      errorFunc(this.fileName + ': ' + reason);
    else
      errorFunc(this.fileName + ': ' + reason + ': ' + splitLine.join('|'));
  }
}

let logFileName = process.argv[2];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(logFileName),
});

let collect = new CollectingPrinter(logFileName);
let anonymizer = new AnonymizingPrinter(collect);

lineReader.on('line', (line) => {
  anonymizer.print(line.split('|'));
});

lineReader.on('close', () => {
  anonymizer.validateIds();
  for (let line of collect.lines)
    anonymizer.validateLine(line);


  process.exit(exitCode);
});
