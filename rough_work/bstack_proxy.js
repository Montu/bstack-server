var http = require('http'),
	httpProxy = require('http-proxy'),
	url = require('url'),
	sys = require('sys');

HOST_IP_OR_URL = '127.0.0.1';
HOST_PORT = 8080;
// Proxy server definition

httpProxy.createServer(9000, 'localhost').listen(8000);

// Target server definition

http.createServer(function (req, res) {
	var var_path = url.parse(req.url).href
	sys.puts("Path asked: " + var_path);
	var proxy_flag = var_path.split('?')[1].split('=')[1]
	if(proxy_flag == 'true') {
		var options = {
			hostname: HOST_IP_OR_URL,
			path: var_path.split('?')[0],
			port: HOST_PORT,
			method: 'POST'
		};
		console.log(HOST_IP_OR_URL + " " + var_path.split('?')[0] + " " + HOST_PORT);

		callback = function(response) {
			response.on('data', function(return_data){
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
				res.write('Your command was successfully implemented on bstack server');
				res.end();
			});
		}

		var req_bstack_server = http.request(options, callback)
		req_bstack_server.on('error', function(e){
			console.log('problem with request :' + e.message);
		});
		req_bstack_server.end();
	}
	else {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.write('Proxy disabled');
		res.end();
	}
}).listen(9000);

