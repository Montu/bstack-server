
var Connection = require('ssh2'),
	user_data = require('./user_data.js'),
	crypto = require('crypto'),
	shasum = crypto.createHash('md5')

var c = new Connection()

c.on('connect', function(){
	console.log('Connection :: connect')
})

c.on('ready', function(){
	console.log('Connection :: ready')
	c.exec('uptime', function(err, stream) {
		if (err) 
			throw err
		stream.on('data', function(data, extended) {
			console.log((exttended === 'stderr' ? 'STDERR: ':'STDOUT: ') + data)
		})

		stream.on('end', function(){
			console.log('Stream :: EOF')
		})

		stream.on('close', function(){
			console.log('Stream :: close')
		})
		stream.on('exit', function(code, signal){
			console.log('Stream :: exit :: code : ' + code + 'singnal: ' + signal)
			c.end()
		})
	})
})

c.on('error', function(err){
	console.log('Connection :: error :: ' + err)
})

c.on('end', function(){
	console.log('Connection :: close')
})

console.log("username :"+user_data.user_username + " password:" + user_data._password)

c.connect({
	host: '127.0.0.1',
	port: 22,
	username: user_data._username,
	password: user_data._password,
	privateKey: require('fs').readFileSync('/Users/akshay/.ssh/id_rsa'),
	paraphrase: user_data._paraphrase
})