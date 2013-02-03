var domain = resolve("domain");

function resolve(module) {
  try { return require(module) }
  catch(error) { return {} }
}

var callable = module.exports = function(fn) {
  var callback = (typeof fn === "function") ? fn : this;
  
  return function() {
    try {
      return callback.apply(this, Array.prototype.slice.call(arguments));
    } catch(error) {
      if (!domain.active)
        throw error;
      
      domain.active.emit("error", error);
      return false;
    }
  };
};

Object.defineProperty(Function.prototype, "callable", {
  value: function() {
    return callable.apply(this);
  }
});