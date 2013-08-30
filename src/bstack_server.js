/* Usage: 
 * First call npm install to install dependencies
 * To start first install node.js on your computer and then run in shell : node bstact_server.js
 * In browser type: http://127.0.0.1:8081/firefox/start to start firefox and /firefox/close to close it
 * and completely delete the data. Support for Safari Added.
 * ** This could be more cleaned up by making a routes like config file which at
 * start of application is loaded on a mapping hash
 * **** Thoroughly tested for Firefox. Stop command partially tested for Chrome and Safari
 * Stop by default clears the entier browser data and makes it a fresh browser ready to run 
 * next time. 
 */

var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require('url'),
filesys = require("fs"),
fsex = require("fs-extra"),
exec = require('child_process').exec,
plist = require('plist'),
global = require('../global.js'),
proxy_settings = require(global.project_root + '/lib/proxy_settings.js'),
browser_location = "",
browser_name = "",
browser_data_location = "",
_preference_location = global.project_root +'/resources/preferences.plist',
_temp_new_pref = global.project_path+'/resources/preferences_new.plist' // Made so that my own file doesn't get corrupted while testing!


// console.log("Directory name " + (__dirname || "Not Found"))

my_http.createServer(function(request, response) {
	var var_path = url.parse(request.url).pathname
	var query = url.parse(request.url,true).query
	console.log(query.proxy + " " + query.address + " " + query.port + "printed\n")
	// sys.puts(var_path)
	var split_path = var_path.split('/')


	switch (split_path[1]) {
		case "firefox":
			browser_name = "firefox";
			browser_location = "/Applications/Firefox.app/";
			browser_data_location = "/Users/akshay/Library/Application\ Support/Firefox/";
			break;
		case "chrome":
			browser_name = "Google Chrome";
			browser_location = "/Applications/Google\ Chrome.app/"
			browser_data_location = "/Users/akshay/Library/Application\ Support/Google/Chrome"
			break;
		case "safari":
			browser_name = "Safari";
			browser_location = "/Applications/Safari.app/";
			browser_data_location = "/Users/akshay/Library/Safari/"
			break;
		default:
			response.writeHeader(404, {"Content-Type": "text/plain"});
			response.write("No such browsers");
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
			fsex.remove(browser_data_location, function(err) {
				if (err) {
					console.log(err);
				}
				else {
					console.log("success!");
				}
			});
			response.writeHeader(200, {"Content-Type": "text/plain"});
			response.write(browser_name + " Closed and Browswer data deleted!");
			response.end();
			break;
		default:
			response.writeHeader(404, {"Content-Type": "text/plain"});
			response.write("No such command");
			response.end();

	}

	if (query.proxy == 'true')
		proxy_settings.modify_proxy_general_settings(query.server, parseInt(query.port),_preference_location,_temp_new_pref)
}).listen(8081);
sys.puts("Server Running on 8081");
