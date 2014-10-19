var assert   = require('assert')
var fs       = require('fs')
var util     = require('util')

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

console.log ('hello!')
// EntuLib.findEntity(console.log, 'person', '', 10)
EntuLib.getEntity(function (result) {
  if (result.error !== undefined)
    throw new Error("Can't find myself!")
  // console.log(result)
}, 610)

EntuLib.listChilds(function (result) {
  if (result.error !== undefined)
    throw new Error("Can't find myself!")
  console.log(util.inspect(result,{depth:null}))
}, ENTU_USER_ID)
