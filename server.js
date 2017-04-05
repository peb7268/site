
/**
 * Integrating ghost into express.
 * used this guide on ghost 0.11.7 https://rogerstringer.com/2015/09/07/ghost-express-middleware/
 * - make sure to set the right node version engine
 * - make sure to copy the ghost content and config over from the node_modules folder.
 * - set the content directory path in the config or it wont be able to find your theme or login.
 */

var express     = require('express');
var path        = require('path');

var app         = express();

var ghost 		= require(__dirname + '/public/insights/ghost-middleware');

//Middleware Configs
app.use(express.static(__dirname + '/public'));

//Ghost configs
var config_path = path.join(__dirname, '/public/insights/config.js');

// console.log('===========================');
// console.log('Ghost diagnostics: ');
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`port: ${process.env.PORT}`);
// console.log(`config_path: ${config_path}`);
// console.log('===========================');


app.use( '/insights', ghost({
	config: config_path
}) );

//If you want to use view engines
app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

//app.get('/', (req, res) => res.render('pages/index'));

//Routes
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about', {message: 'Great and nerdy things coming... stay tuned.', title: 'this is how you pass data from express to your views.'}));

//Port Configs
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));