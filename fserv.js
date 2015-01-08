#!/usr/bin/env node

var program = require('commander');

program
  .version('1.0.0')
  .option('-f, --file [value]', 'file to be served')
  .option('-p, --port [value]', 'port on which to serve the file', 8182)
  .parse(process.argv);

//console.log(program.file + " / " + program.port)

var mime = require('mime');
var content_type = mime.lookup(program.file);
//console.log(content_type);

var uuid = require('uuid');
var id = uuid.v4(); 

var fs = require('fs');
var http = require("http");
var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": content_type});
	var readStream = fs.createReadStream(program.file);
	readStream.pipe(response);
	//response.end();
});
 
server.listen(program.port);
console.log("http://localhost:" + program.port + "/" + id);

