## Callable

Helps fix callback issue discussed here: https://github.com/joyent/node/issues/4702

`npm install callable`

## Usage

Append .callable to your function `function(){}.callable()` or wrap it: `callable(function(){})`

```javascript
var d = domain.create();
d.run(function() {
  var request = http.request({ hostname: "google.com", port: 80, method: "HEAD" }, function(response) {
    throw new Error("An exception from the response handler");
  }.callback().bind(this));
  request.end();
  
  d.on("error", function(error) {
    console.log("domain caught " + error);
    d.dispose();
  });
});
```

It's also chainable!

```javascript
function(){}.callable().bind(this);
function(){}.bind(this).callable();
callback(function(){}).bind(this);
```
