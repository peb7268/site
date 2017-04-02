
var express     = require('express');
var path        = require('path');
var app         = express();
var ghost       = require(__dirname + '/public/insights/ghost-middleware');

//Middleware Configs
//app.use(express.static(__dirname + '/public'));
app.use( '/insights', ghost({
	config: path.join(__dirname, 'insights/config.js')
}) );
//If you want to use view engines
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//app.get('/', (req, res) => res.render('pages/index'));

//Routes
app.get('/', (req, res) => res.send('Great and nerdy things coming... stay tuned.'));
app.get('/test', (req, res) => res.send('rendered with express'));

//Port Configs
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));