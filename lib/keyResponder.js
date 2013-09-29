var keypress = require('keypress');

var KeyResponder = function(mappings) {
  this.mappings = mappings;
}

KeyResponder.prototype.run = function(key) {
  var me = this;
  keypress(process.stdin);
  process.stdin.on('keypress', function(ch, key) {
    var keyName = (key.ctrl?'ctrl-':'') + key.name;
    if (me.mappings.hasOwnProperty(keyName)) {
      me.mappings[keyName](keyName);
    }
  });
  
  if (typeof process.stdin.setRawMode === 'function') {
    process.stdin.setRawMode(true);
  } else {
    require('tty').setRawMode(true);
  }
  process.stdin.resume();
}

KeyResponder.prototype.quit = function() {
  process.stdin.pause();
}

KeyResponder.prototype.init = function(mappings) {
  this.mappings = mappings;
}

module.exports = KeyResponder;