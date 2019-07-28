const express = require('express');
const app = express();

const requestPort = 3000;
app.use(express.static(__dirname));

app.listen(requestPort, function(){
    console.log('req server is listening' + requestPort)
})