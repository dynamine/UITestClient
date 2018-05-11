var express = require('express');
var app = express();
var net = require('net');

var getRand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var server = net.createServer(function(socket) {
	socket.on('data', (data) => {
		console.log("parsing: "+ data.toString('utf8'));
		let fmtData = JSON.parse(data.toString('utf8'));
		let mockResources = {
      "cmd" : "resources",
      //"resources": ["localhost:gpu1", "localhost:gpu2"]
      "data": {"resources": ["localhost:gpu1"]}
    };
		let mockHashRate = {
			"cmd": "\\hashRate\\",
			"data": {
				"resource": "\\localhost:gpu1\\",
				"hashRate": getRand(1000, 2000)
			}
		}
		if(fmtData.cmd == 'resources') {
			let resp  = JSON.stringify(mockResources);
			console.log("sending mock resources resp: " + resp);
			socket.write(resp, "utf8");
		} else if(fmtData.cmd == 'hashRate') {
			let resp  = JSON.stringify(mockHashRate);
			console.log("sending mock hashRate resp: " + resp);
			socket.write(resp, "utf8");
		}
		console.log(JSON.parse(data))
	});
});

console.log("running socket echo server...")
server.listen(1337, '127.0.0.1');
