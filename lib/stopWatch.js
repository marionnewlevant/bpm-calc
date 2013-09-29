var StopWatch = function() {
}

StopWatch.prototype.start = function() {
  this.startTime = Date.now();
  this.running = true;
}
StopWatch.prototype.stop = function() {
  this.stopTime = Date.now();
  this.running = false;
}
StopWatch.prototype.elapsed = function() {
  var stopTime = this.isRunning() ? Date.now() : this.stopTime;
  return stopTime - this.startTime;
}
StopWatch.prototype.isRunning = function() {
  return !!this.running;
}

module.exports = StopWatch;