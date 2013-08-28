var fs = require('fs')
var plist = require('plist')

var obj = plist.parseFileSync('preferences.plist')

obj.NetworkServices["622D9F75-98F0-4AF1-8FFC-C5A27462B0B6"].Proxies = 8080
obj.NetworkServices["622D9F75-98F0-4AF1-8FFC-C5A27462B0B6"].HTTPProxy ='192.168.1.1'
obj.NetworkServices["622D9F75-98F0-4AF1-8FFC-C5A27462B0B6"].HTTPEnable = 1
// console.log(plist.build(obj).toString())

fs.writeFile("preferences_new.plist", plist.build(obj).toString(), function(err){
	if (err)
		console.log(err)
	else
		console.log("The file was saved")
})
// print(JSON.stringify(proxyData))
// fs.readFileSync('./prefs.js').toString().split('\n').forEach(function (line){
// 	console.log(line)
// 	fs.appendFileSync('./output.js', line.toString() + "\n")
// })