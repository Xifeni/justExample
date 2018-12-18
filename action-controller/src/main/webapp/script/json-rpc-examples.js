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

function showTestUser() {
  var callback = function(user, exception) {
      console.log("user " + user.name + " " + user.family);
  };
  rpcClient.rpcTester.getTestUser(callback);
}

function htmlInsert(id, htmlData) {
    document.getElementById(id).innerHTML = htmlData;
}