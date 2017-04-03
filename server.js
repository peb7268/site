
var express     = require('express');
var path        = require('path');
var app         = express();

//Middleware Configs
app.use(express.static(__dirname + '/public'));

//Ghost configs
var debug 		= require('debug')('ghost:boot:index'), ghost, logging, errors, utils;
var parentApp   = app;
ghost       	= require(__dirname + '/public/insights/core');
logging 		= require(__dirname + '/public/insights/core/server/logging');
errors  		= require(__dirname + '/public/insights/core/server/errors');
utils   		= require(__dirname + '/public/insights/core/server/utils');


console.log('===========================');
console.log('Ghost diagnostics: ');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`port: ${process.env.PORT}`);
console.log(ghost);
console.log('===========================');

console.log('Ghost custom boot');
console.time('Ghost boot');

debug('First requires...');
debug('Required ghost');

debug('Initialising Ghost');
ghost().then(function (ghostServer) {
    // Mount our Ghost instance on our desired subdirectory path if it exists.
	var subdir = utils.url.getSubdir();
	console.log(`subdir path: ${utils.url.getSubdir()}`);
	
    parentApp.use(subdir, ghostServer.rootApp);

    debug('Starting Ghost');
    // Let Ghost handle starting our server instance.
    return ghostServer.start(parentApp).then(function afterStart() {
        console.timeEnd('Ghost boot');
        // if IPC messaging is enabled, ensure ghost sends message to parent
        // process on successful start
        if (process.send) {
            process.send({started: true});
        }
    });
}).catch(function (err) {
    if (!errors.utils.isIgnitionError(err)) {
        err = new errors.GhostError({err: err});
    }

    if (process.send) {
        process.send({started: false, error: err.message});
    }

    logging.error(err);
    process.exit(-1);
});


/*
ghost({
	config: path.join(__dirname, 'insights/config.js')
}).then(function (ghostServer) {
	console.log('');
	console.log('');
	console.log('ghost paths: ');
	console.log(ghostServer.config.paths);
	console.log('');
	console.log('');

    app.use('/insights', ghostServer.rootApp);
    ghostServer.start(parentApp);
});
*/


//If you want to use view engines
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//app.get('/', (req, res) => res.render('pages/index'));

//Routes
app.get('/', (req, res) => res.send('Great and nerdy things coming... stay tuned.'));

//Port Configs
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));