var should = require('should');
var Bpm = require('../lib/bpm');

describe('Bpm', function() {
  describe('#calc()', function() {
    it('should calculate beats per minute', function() {
      var bpm = new Bpm(10, 3); // timing 10 measures, 3 beats each
      bpm.calc(60*1000).should.equal(30); // takes 1min, 30 beats per minute
      bpm.calc(30*1000).should.equal(60); // takes 30 sec, 60 beats per min
    });
  });
  describe('#startStop()', function() {
    it('should output bpm on 2nd call', function(done) {
      var output;
      var bpm = new Bpm(1, 1, function(m) {output=m;});
      bpm.startStop();
      setTimeout(function() {
        bpm.startStop();
        var res = output.split(' ')[1];
        parseInt(res, 10).should.be.within(590, 610);
        done();
      }, 100);
    });
  });
});
