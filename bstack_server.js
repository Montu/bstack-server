/* Usage: 
 * To start first install node.js on your computer and then run in shell : node bstact_server.js
 * In browser type: http://127.0.0.1:8080/firefox/start to start firefox and /firefox/close to close it
 * and completely delete the data. For chrome replace firefox with chrome. There seems to be some problem with rm -rf 
 * command will correct it by tomorrow
 */

var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require('url'),
filesys = require("fs"),
exec = require('child_process').exec,
browser_location = "",
browser_name = "",
browser_data_location = "";

my_http.createServer(function(request, response) {
	var var_path = url.parse(request.url).pathname;
	sys.puts(var_path)
	split_path = var_path.split('/')

	switch (split_path[1]) {
		case "firefox":
			browser_name = "firefox";
			browser_location = "/Applications/Firefox.app/";
			browser_data_location = "/Users/akshay/Library/Application\ Support/Firefox/";
			break;
		case "chrome":
			browser_name = "Google Chrome";
			browser_location = "/Applications/Google\ Chrome.app/"
			browser_data_location = "/Users/akshay/Library/Application Support/Google/Chrome"
			break;
		default:
			response.writeHeader(404, {"Content-Type": "text/plain"});
			response.write("No such browserß");
			response.end();
	}

	switch (split_path[2]) {
		case "start":
			exec ("open "+browser_location);
			response.writeHeader(200, {"Content-Type": "text/plain"});
			response.write(browser_name + " started");
			response.end();
			break;
		case "close":
			exec ("pkill "+browser_name);
			exec ("rm -rf " + browser_data_location);
			response.writeHeader(200, {"Content-Type": "text/plain"});
			response.write(browser_name + " Closed and Browswer data deleted!");
			response.end();
			break;
		default:
			response.writeHeader(404, {"Content-Type": "text/plain"});
			response.write("No such command");
			response.end();

	}
}).listen(8080);
sys.puts("Server Running on 8080");