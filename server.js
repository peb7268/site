
var express     = require('express');
var path        = require('path');
var app         = express();
var ghost 		= require(__dirname + '/public/insights/ghost-middleware');

//Middleware Configs
app.use(express.static(__dirname + '/public'));

//Ghost configs
var config_path = path.join(__dirname, '/public/insights/config.js');
var content_dir = path.join(__dirname, '/content/');

console.log('===========================');
console.log('Ghost diagnostics: ');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`port: ${process.env.PORT}`);
console.log(`config_path: ${config_path}`);
console.log(`content_path: ${content_dir}`);
console.log('===========================');


app.use( '/insights', ghost({
	config: config_path
}) );

//If you want to use view engines
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//app.get('/', (req, res) => res.render('pages/index'));

//Routes
app.get('/', (req, res) => res.send('Great and nerdy things coming... stay tuned.'));

//Port Configs
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));