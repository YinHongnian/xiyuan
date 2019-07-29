const http = require('http');
const express = require('express');

let app = express();
var server = http.createServer(app).listen(3001);