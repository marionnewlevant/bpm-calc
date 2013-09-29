#! /usr/bin/env node

var infoString = 'Hit space to start timing and again to stop. \'q\' to exit. \'h\' for help';
var optimist = require('optimist').
    usage('Calculate beats per minute. '+infoString+'\nUsage: $0 -m [num] -b [num]').
    describe('m', 'Number of measures timed').
    describe('b', 'Number of beats per single measure').
    default({m: 10, b: 3});
var Bpm = require('./lib/bpm');
var KeyResponder = require('./lib/keyResponder');

var bpm = new Bpm(optimist.argv.m, optimist.argv.b);
var ui = new KeyResponder();
var keyBindings = {
  'h': function() {console.log(optimist.help());},
  'q': ui.quit,
  'ctrl-c': ui.quit,
  'space': function() {bpm.startStop.call(bpm);},
  'b': function() { console.log('beats/measure: '+bpm.beats); },
  'm': function() { console.log('measures: '+bpm.measures); }
};

ui.init(keyBindings);
console.log(infoString);
ui.run();
