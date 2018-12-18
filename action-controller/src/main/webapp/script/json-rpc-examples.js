// The functions specific to these examples are in this file 
// (json-rpc-examples.js). That is, the functions here refer
// to specific server-side URLs or client-side ids.
// The functions that are generic and reusable are in ajax-utils.js.

var rpcClient;

window.onload = function() {
  rpcClient = new JSONRpcClient("JSON-RPC");
};

function sayHello(inputField, resultRegion) {
  var range = (document.getElementById(inputField)).value;

  var callback = function(randomNumber, exception) {
    if(exception) {
      alert(exception.message);
    } else {
      htmlInsert(resultRegion, "Number is " + randomNumber);
    }
  };
  rpcClient.rpcTester.getSayHello(range);
}

function showCity(inputField, resultRegion) {
  var cityName = getRawValue(inputField); // No escape needed with RPC
  var callback = function(city, exception) {
    if(exception) {
      alert(exception.message);
    } else {
      var result;
      if (city) {
        result = "<ul>" +
                 "<li>Name: " + city.name + "</li>" +
                 "<li>Time: " + city.time + "</li>" +
                 "<li>Population: " + city.population + "</li>" +
                 "</ul>";
      } else {
        result = "Unknown City";
      }
      htmlInsert(resultRegion, result);
    }
  };
  rpcClient.rpcTester.getCity(callback, cityName);
}

function htmlInsert(id, htmlData) {
    document.getElementById(id).innerHTML = htmlData;
}