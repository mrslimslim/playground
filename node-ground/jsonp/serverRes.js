const express = require('express');
const app = express();

const responsePort = 3001;

app.get('/',function (req, res) {
    const callbackName = req.query.callback;
    console.log(callbackName);
    res.send(callbackName + `({'message': 'this is message from JSONP'})`);
})

app.get('/tagReport', function(req, res) {
    console.log(req.query.spendTime);
    res.send(null);
})

app.listen(responsePort,function() {
    console.log('jsonp_responser listening' + responsePort);
})