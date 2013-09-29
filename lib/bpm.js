var StopWatch = require('./stopWatch');

var Bpm = function(measures, beats, outputFunction) {
  this.measures = measures;
  this.beats = beats;
  this.stopWatch = new StopWatch();
  this.outputFunction = outputFunction || function(m) {console.log(m);};
}

Bpm.prototype.calc = function(micosSecElapsed) {
  return Math.round(this.measures*this.beats*60*1000/micosSecElapsed)
}

Bpm.prototype.startStop = function() {
  if (!this.stopWatch.isRunning()) {
    this.stopWatch.start();
    this.outputFunction('timing...');
  } else {
    this.stopWatch.stop();
    this.outputFunction('bpm: '+this.calc(this.stopWatch.elapsed()));
  }
}

module.exports = Bpm;