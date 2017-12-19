
/**
 * Integrating ghost into express.
 * used this guide on ghost 0.11.7 https://rogerstringer.com/2015/09/07/ghost-express-middleware/
 * - make sure to set the right node version engine
 * - make sure to copy the ghost content and config over from the node_modules folder.
 * - set the content directory path in the config or it wont be able to find your theme or login.
 */
var ghost 			= require('ghost');
var path 			= require('path');
var utils 			= require('./node_modules/ghost/core/server/utils');
var express     	= require('express');
var bodyParser 		= require('body-parser');
var path        	= require('path');
var app         	= express();
var mandrill 		= require('mandrill-api/mandrill');

//Middleware Configs
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

//Ghost configs
// var config_path = path.join(__dirname, '/public/insights/config.js');


console.log('Debug Info: ');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`port: ${process.env.PORT}`);
console.log('===========================');
console.log(process.env.CUSTOM_MYSQL_HOST);
console.log('===========================');
console.log('===========================');
console.log(process.env.CUSTOM_MYSQL_USER);
console.log('===========================');
console.log('===========================');
console.log(process.env.CUSTOM_MYSQL_PASSWORD);
console.log('===========================');
console.log('===========================');
console.log(process.env.CUSTOM_MYSQL_DB);
console.log('===========================');


//Init Ghost in a subdirectory
ghost().then(function (ghostServer) {
	console.log("==== In ghost bootup =====");
	app.use(utils.url.getSubdir(), ghostServer.rootApp);

	if(process.env.NODE_ENV === 'production'){
		let blog_url = `http://imperativedesign.net/insights`;
		ghostServer.config.set('url', blog_url);

		let db = {};
		db.client = "mysql";
		db.connection.host process.env.CUSTOM_MYSQL_HOST;
		db.connection.user process.env.CUSTOM_MYSQL_USER;
		db.connection.password process.env.CUSTOM_MYSQL_PASSWORD;
		db.connection.database process.env.CUSTOM_MYSQL_DB;
		// db.connection = process.env.CLEARDB_DATABASE_URL;
		ghostServer.config.set('databse', db);

		let paths = ghostServer.config.get('paths');
		paths.contentPath = "/app/insights/content"
		ghostServer.config.set('paths', paths);
	}	
	
	console.log('===== database config is =====');
	console.log(ghostServer.config.get('databse'));
	console.log('=== url config is ======');
	console.log(ghostServer.config.get('url'));
	console.log('=== paths config is ======');
	console.log(__dirname);	
	console.log(ghostServer.config.get('paths'));
	
    ghostServer.start(app);
});

//If you want to use view engines
app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

//Routes
app.get('/', (req, res) => res.render('index', {active_page: 'home'}));
app.get('/about', (req, res) => res.render('about', {message: 'Great and nerdy things coming... stay tuned.', title: 'this is how you pass data from express to your views.', active_page: 'about-page'}));
app.get('/clients', (req, res) => res.render('clients', {message: 'Great and nerdy things coming... stay tuned.', title: 'this is how you pass data from express to your views.', active_page: 'clients-page'}));
app.get('/services', (req, res) => res.render('services', {active_page: 'services-page'}));
app.get('/services/website-development', (req, res) => res.render('web-development', {active_page: 'services-page', sub_page: 'website-development' }));
app.get('/services/application-development', (req, res) => res.render('appdev', {active_page: 'services-page', sub_page: 'appdev' }));
app.get('/services/search-engine-optimization', (req, res) => res.render('seo', {active_page: 'services-page', sub_page: 'seo' }));
app.get('/services/social-media-marketing', (req, res) => res.render('smm', {active_page: 'services-page', sub_page: 'smm' }));
app.get('/services/digital-marketing-strategy', (req, res) => res.render('strategy', {active_page: 'services-page', sub_page: 'strategy' }));
app.get('/services/copywriting', (req, res) => res.render('copywriting', {active_page: 'services-page', sub_page: 'copywriting' }));
app.get('/services/branding', (req, res) => res.render('branding', {active_page: 'services-page', sub_page: 'branding' }));
app.get('/services/website-rennovation', (req, res) => res.render('web-rennovation', {active_page: 'services-page', sub_page: 'web-rennovation' }));
app.get('/services/mentoring', (req, res) => res.render('mentoring', {active_page: 'services-page', sub_page: 'mentoring' }));

app.post('/contact', (req, res)=>{
	let formData = req.body;
	console.log('formData', formData);

	let msg_html = `
		<p>Name: ${formData['first name']} ${formData['last name']}</p>
		<p>Email: ${formData['email']}</p>
		<p>Phone: ${formData['phone']}</p>
		<p>Reason for inquiry: ${formData['Reason for writing']}</p>
	`;
	msg_html = msg_html.trim();

	let MANDRILL_CONFIGS = {
		protocall: 'https',
		base_endpoint: 'mandrillapp.com/api/1.0/SOME-METHOD.OUTPUT_FORMAT',
		host: 'smtp.mandrillapp.com',
		port: 587,
		options: {
			service: 'Mandrill',
			auth: {
				user: process.env['MANDRILL_USERNAME'],
				pass: process.env['MANDRILL_APIKEY']
			}
		}
	}

	var mandrill_client = new mandrill.Mandrill(MANDRILL_CONFIGS.options.auth.pass);

	var message = {
		"html": msg_html,
		"text": formData['Reason for writing'],
		"subject": "site contact",
		"from_email": 'dev@imperativedesign.net',
		"from_name": formData['first name'] + formData['last name'],
		"to": [{
				"email": "dev@imperativedesign.net",
				"name": "Imperative Design",
				"type": "to"
			}],
		"headers": {
			"Reply-To": formData['email']
		},
		"important": false,
		"track_opens": null,
		"track_clicks": null,
		"auto_text": null,
		"auto_html": null,
		"inline_css": null,
		"url_strip_qs": null,
		"preserve_recipients": null,
		"view_content_link": null
	};

	var async = false;
	var ip_pool = "Main Pool";
	
	//YYYY-MM-DD HH:MM:SS
	var now 	= new Date();
	var send_at = '2011-01-01 12:00:00';
	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, (result) => {
		console.log(result);
		res.status(200).send(result);
		
	}, function(e) {
		// Mandrill returns the error as an object with name and message keys
		console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		// A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		res.status(500).send('error');
	});
});

//Port Configs
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port'), 'Ghost mounted on', utils.url.getSubdir(), '<- here'));