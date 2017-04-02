
var express     = require('express');
var path        = require('path');

var app         = express();
var parentApp   = express();    //This is needed for ghost
var ghost       = require('ghost');

//Middleware Configs
//app.use(express.static(__dirname + '/public'));
ghost().then(function (ghostServer) {
	console.log('');
	console.log('');
	console.log('ghost paths: ');
	console.log(ghostServer.config.paths);
	console.log('');
	console.log('');
	
    parentApp.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(parentApp);
});

// app.use( '/insights', ghost({
// 	config: path.join(__dirname, 'insights/config.js')
// }) );

//If you want to use view engines
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//app.get('/', (req, res) => res.render('pages/index'));

//Routes
app.get('/', (req, res) => res.send('Great and nerdy things coming... stay tuned.'));

//Port Configs
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));