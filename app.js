var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var codes = [];
var used = [];
var app = express();

app.use(cors());
app.use(bodyParser.json());

//generate codes
for (i = 0; i < 100000; i++){
    codes.push(generateCode());
}

app.get('/valid', function (req, res) {
    res.send(codes);
});

app.get('/used', function (req, res) {
    res.send(used);
});

app.post('/check', function (req, res) {
    var code = req.body.code;
    var index = codes.indexOf(code);
    if (index > -1){
        codes.splice(index, 1);
        used.push(code);
        res.json({message: 'code is valid', valid: true});
    }
    else if (used.indexOf(code) > -1){
        res.json({message: 'code already used', valid: false});
    }
    res.json({message: 'code is invalid', valid: false});
});

function generateCode()
{
    return Math.random().toString(36).substring(2, 7);
}

//start server
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
app.listen(server_port, server_ip_address, function () {
    codes.forEach(function(code) {
        console.log(code);
    });
});