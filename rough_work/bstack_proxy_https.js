var fs = require('fs'),
	http = require('http'),
	https = require('https'),
	httpProxy = require('http-proxy');

var options = {
	https: {
		key: fs.readFileSync('key.pem', 'utf8'),
		cert: fs.readFileSync('cert.pem', 'utf8')
	}
};

// HTTPS Proxy server
httpProxy.createServer(8000, 'localhost', options).listen(8001);

var proxy = new httpProxy.HttpProxy({
	target: {
		host: 'localhost',
		port: 8000
	}
});

https.createServer(options.https, function(req, res) {
	proxy.proxyRequest(req, res)
}).listen(8002)

// Target HTTPS Server
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type':'text/plain'})
	res.write('hello https\n')
	res.end()
}).listen(8000)



