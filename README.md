## Callable

Helps fix callback issue discussed here: https://github.com/joyent/node/issues/4702.
Tests, further examples, and description about the issue this utility solves are coming.

## Installation

`npm install callable`

## Usage

Append .callable() to your function `function(){}.callable()` or wrap it: `callable(function(){})`

```javascript
require("callable");

var d = domain.create();
d.run(function() {
  var request = http.request({ hostname: "google.com", port: 80, method: "HEAD" }, function(response) {
    throw new Error("An exception from the response handler");
  }.callable().bind(this));
  request.end();
  
  d.on("error", function(error) {
    console.log("domain caught " + error);
    d.dispose();
  });
});
```
### Chaining
Both approaches can be chained with other functions such as `.bind()`

Append
```javascript
function(){}.callable().bind(this);
function(){}.bind(this).callable();
```

Wrap
```javascript
callable(function(){}).bind(this);
callable(function(){}.bind(this));
```
