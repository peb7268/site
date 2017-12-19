var ghost = require('ghost');
var path = require('path');

console.log('==== this is where its all happening =====');

ghost().then(function (ghostServer) {
    ghostServer.start();
});