var express = require('express')
  , http = require('http')
  , routes = require('./routes')
  , path = require('path')
  , fs = require('fs')
  , qs = require('querystring')
  , app = express(app)
  , colors = require("colors")

var package = require(path.resolve(__dirname, './package.json'))

// Setup local variables to be available in the views.
app.locals.title = "Modern Recording Company"
app.locals.description = "Modern Recording Company"
app.locals.node_version = process.version.replace('v', '')
app.locals.app_version = package.version
app.locals.env = process.env.NODE_ENV
app.locals.show_modal = false
app.locals.instagram_json = null

app.set('port', process.env.PORT || 3330)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.favicon())
app.use(express.logger(app.locals.env === 'production' ? 'tiny' : 'dev' ))
app.use(express.compress())

app.use(express.cookieParser('mrc'))

app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(app.router)
app.use(require('stylus').middleware(__dirname + '/public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.directory(__dirname + '/public'));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

// Core routes
app.get('/', routes.index)


http.createServer(app).listen(app.get('port'), function(){
  console.log("\033[96m\nhttp://127.0.0.1:" + app.get('port') +"\033[96m")
})



// Dirty

// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.error(err)
    if(err.stack) console.trace(err.stack)
});