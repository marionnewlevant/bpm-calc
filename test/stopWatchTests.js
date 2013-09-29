var should = require('should');
var StopWatch = require('../lib/stopWatch');

describe('StopWatch', function() {
  describe('#elapsed()', function() {
    var sw;
    
    beforeEach(function() {
      sw = new StopWatch();
    });
  
    this.timeout(1000); // give them time
    
    it('should calculate elapsed time without stop', function(done) {
      sw.start();
      setTimeout(function() {
        sw.elapsed().should.be.within(490, 510);
        done();
      }, 500);
    });
    it('should calc elapsed time 2nd time', function(done) {
      // start; 25; stop; 25; start; 100; elapsed = 100
      sw.start();
      setTimeout(function() {
        sw.stop();
        setTimeout(function() {
          sw.start();
          setTimeout(function() {
            sw.elapsed().should.be.within(90, 110);
            done();
          }, 100);
        }, 25);
      }, 25);
    });
    it('should calculate elapsed time with stop', function(done) {
      sw.start();
      setTimeout(function() {
        sw.stop();
        setTimeout(function() {
          sw.elapsed().should.be.within(490, 510);
          done();
        }, 100);
      }, 500);
    });
    it('should return NaN if no start', function() {
      sw.elapsed().should.be.NaN;
    });
  });
  describe('#isRunning()', function() {
    var sw;
    
    beforeEach(function() {
      sw = new StopWatch();
    });
  
    it('should not be running initially', function() {
      sw.isRunning().should.be.false;
    });
    it('should be running when started', function() {
      sw.start();
      sw.isRunning().should.be.true;
    });
    it('should be running when started & elapsed', function() {
      sw.start();
      sw.elapsed();
      sw.isRunning().should.be.true;
    });
    it('should not be running when started & stopped', function() {
      sw.start();
      sw.stop();
      sw.isRunning().should.be.false;
    });
  });
});

