var http = require('http'),
	httpProxy = require('http-proxy'),
	url = require('url'),
	sys = require('sys'),
	fs = require('fs')

HOST_IP_OR_URL = '127.0.0.1';
HOST_PORT = 9000; //Will be based on mapping

// Server definition
var mapping = JSON.parse(fs.readFileSync('./proxy_mapping.json'))

http.createServer(function(req, res){
	url_object = url.parse(req.url, true)
	host = url_object.host
	console.log(host)
	url_object.host = mapping[host].ip
	url_object.port = mapping[host].port.toString()
	// Create url options
	options = {
		host : mapping[host].ip,
		path : url_object.path,
		port : mapping[host].port.toString()
	}

	console.log (url.format(options))
	console.log (url_object.path)
	callback = function(response){
		var response_string = ''

		response.on('data', function(chunk){
			response_string += chunk
		})

		response.on('end', function() {
			console.log(response_string)
			res.writeHead(200, {'Content-Type' : 'text/plain'})
			res.write(response_string)
			res.end()
		})
	}

	http.request(options, callback).end()
}).listen(9000)

// var proxyServer = httpProxy.createServer(options)
// proxyServer.listen(9000)
