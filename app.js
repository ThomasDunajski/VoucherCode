var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var codes = [];
var used = [];
var app = express();

app.use(cors());
app.use(bodyParser.json());

//generate codes
for (i = 0; i < 100; i++){
    codes.push(generateCode());
}

app.get('/', function (req, res) {
    res.send(codes);
});

app.post('/check', function (req, res) {
    var code = req.body.code;
    var index = codes.indexOf(code);
    if (index > -1){
        codes.splice(index, 1);
        used.push(code);
        res.send('valid');
    }
    else if (used.indexOf(code) > -1){
        res.send('already used');
    }
    res.send('invalid');
});

function generateCode()
{
    return Math.random().toString(36).substring(2, 9);
}

//start server
app.listen(3000, function () {
    codes.forEach(function(code) {
        console.log(code);
    });
});