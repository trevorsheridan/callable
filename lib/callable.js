Object.defineProperty(Function.prototype, "callback", {
  value: function() {
    return function() {
      try {
        return this.apply(this, Array.prototype.slice.call(arguments));
      } catch(error) {
        /* Rethrow the error if there isn't an active domain. If an 'uncaughtException'
        listener is enabled this will yield the same "socket hanging" issue... but
        you shouldn't be using process.on('uncaughtException') anyways. If there
        is no 'uncaughtException' listener, then the process will simply exit and
        behave the exact same way as exceptions within callbacks do today.
        */
        if (!domain.active)
          throw error;

        domain.active.emit("error", error);
        return false;
      }
    }.bind(this);
  }
});