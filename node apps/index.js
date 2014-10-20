var assert   = require('assert')
var util     = require('util')
var fs       = require('fs')
var https    = require("https"), url = require("url")
var swig     = require('swig')

var xml2js = require('xml2js')
  , parseString = xml2js.parseString

var EntuLib  = require('../entulib/entulib.js')
var stringifier = require('./stringifier.js')

var myArgs = process.argv.slice(2);
assert.strictEqual(typeof(myArgs[0]), 'string'
            , "Your Entu ID should be passed as first argument from commandline. " + typeof(myArgs[1]))
assert.strictEqual(typeof(myArgs[1]), 'string'
            , "Your Entu API key should be passed as 2nd argument from commandline.")
assert.strictEqual(myArgs[3], undefined
            , "Don't know what to do with extra arguments ['" + myArgs.slice(2).join("', '") + "']")
assert.strictEqual(myArgs[2], undefined
            , "Don't know what to do with third argument '" + myArgs[2] + "'")

var ENTU_USER_ID = myArgs[0]
var ENTU_USER_KEY = myArgs[1]
var ENTU_URL = 'keeleressursid.entu.ee'

var EntuLib = new EntuLib(ENTU_USER_ID, ENTU_USER_KEY, ENTU_URL)

console.log ('hellow!')

EntuLib.getEntity(function (result) {
  console.log(util.inspect(result, {depth:5}))
  if (result.error !== undefined) throw new Error("getEntity: Can't find myself!")
  console.log('getEntity: ' + util.inspect(result,{depth:null}))
}, 682)


// openssl genrsa -out key.pem
// openssl req -new -key key.pem -out csr.pem
// openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
// rm csr.pem
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

var a = https.createServer(options, function (req, res) {
  res.writeHead(200)

  EntuLib.getEntity(function(result) {
    console.log('getEntity: ' + util.inspect(result,{depth:null}))
    res.write('<h1>' + util.inspect(result) + '</h1>')
    res.end("</html>")
  }, 682)

    // res.end(swig.renderFile('index.html', {
    //         pagename: 'awesome people',
    //         authors: ['Paul', 'Jim', 'Jane']
    //     }))

  //   res.end()
  //   // res.end("hello world\n")
}).listen(8080)



// EntuLib.findEntity(console.log, 'person', '', 10)
EntuLib.getEntity(function (result) {
  // if (result.error !== undefined) throw new Error("getEntity: Can't find myself!")
  // console.log('getEntity: ' + util.inspect(result,{depth:null}))
}, 610)

EntuLib.getChilds(function (result) {
  // if (result.error !== undefined) throw new Error("getChilds: Can't find myself!")
  // console.log('getChilds: ' + util.inspect(result,{depth:null}))
}, 610)

EntuLib.getReferrals(function (result) {
  // if (result.error !== undefined) throw new Error("getReferrals: Can't find myself!")
  // console.log('getReferrals' + util.inspect(result,{depth:null}))
}, 682)

