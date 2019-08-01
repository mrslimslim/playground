const express = require('express');
const app = express();

var requestPort = 8000;

app.use(express.static(__dirname + '/staticReq'));

app.listen(requestPort, function(){
    console.log('Requester is listening on port '+ requestPort)
})