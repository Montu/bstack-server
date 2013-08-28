var fs = require('fs')
var plist = require('plist')
// Location of _preference_location can be changed or maybe directly shifted to caller.


// obj.NetworkServices[].Proxies = 8080
// obj.NetworkServices["622D9F75-98F0-4AF1-8FFC-C5A27462B0B6"].HTTPProxy ='192.168.1.1'
// obj.NetworkServices["622D9F75-98F0-4AF1-8FFC-C5A27462B0B6"].HTTPEnable = 1
// console.log(plist.build(obj).toString())

// fs.writeFile("preferences_new.plist", plist.build(obj).toString(), function(err){
// 	if (err)
// 		console.log(err)
// 	else
// 		console.log("The file was saved")
// })

exports.modify_proxy_general_settings = function (ip_addr, port, _preference_location, _temp_new_pref) {
	var obj = plist.parseFileSync(_preference_location)
	key_word = "622D9F75-98F0-4AF1-8FFC-C5A27462B0B6"
	obj.NetworkServices[key_word].Proxies.HTTPProxy = ip_addr
	obj.NetworkServices[key_word].Proxies.HTTPPort = port
	obj.NetworkServices[key_word].Proxies.HTTPEnable = 1
	fs.writeFile(_temp_new_pref, plist.build(obj).toString(), function(err){
		if (err)
			console.log(err)
		else {
			console.log("Proxy settings in preferences.plist were changed")
			console.log("Wrote to : " + _temp_new_pref)
		}

	})
}
