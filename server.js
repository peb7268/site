
/**
 * Integrating ghost into express.
 * used this guide on ghost 0.11.7 https://rogerstringer.com/2015/09/07/ghost-express-middleware/
 * - make sure to set the right node version engine
 * - make sure to copy the ghost content and config over from the node_modules folder.
 * - set the content directory path in the config or it wont be able to find your theme or login.
 */

var express     	= require('express');
var bodyParser 		= require('body-parser');
var path        	= require('path');
var app         	= express();
var ghost 			= require(__dirname + '/public/insights/ghost-middleware');
var mandrill 		= require('mandrill-api/mandrill');

//Middleware Configs
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

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
	console.log(req.body);
	let MANDRILL_CONFIGS = {
		protocall: 'https',
		base_endpoint: 'mandrillapp.com/api/1.0/SOME-METHOD.OUTPUT_FORMAT',
		host: 'smtp.mandrillapp.com',
		port: 587,
		options: {
			service: 'Mandrill',
			auth: {
				user: 'imperativedesign.net',
				pass: 'huNbvvhPVGg6n3IXgAsqYg'
			}
		}
	}

	var mandrill_client = new mandrill.Mandrill(MANDRILL_CONFIGS.options.auth.pass);

	var message = {
		"html": "<p>Example HTML content</p>",
		"text": "Example text content",
		"subject": "example subject",
		"from_email": "message.from_email@example.com",
		"from_name": "Example Name",
		"to": [{
				"email": "dev@imperativedesign.net",
				"name": "Recipient Name",
				"type": "to"
			}],
		"headers": {
			"Reply-To": "message.reply@example.com"
		},
		"important": false,
		"track_opens": null,
		"track_clicks": null,
		"auto_text": null,
		"auto_html": null,
		"inline_css": null,
		"url_strip_qs": null,
		"preserve_recipients": null,
		"view_content_link": null,
		"bcc_address": "message.bcc_address@example.com",
		"tracking_domain": null,
		"signing_domain": null,
		"return_path_domain": null,
		"merge": true,
		"merge_language": "mailchimp",
    	"global_merge_vars": [{
            "name": "merge1",
            "content": "merge1 content"
        }],
    	"merge_vars": [{
            "rcpt": "recipient.email@example.com",
            "vars": [{
                    "name": "merge2",
                    "content": "merge2 content"
                }]
        }],
		"tags": [
			"password-resets"
		],
		"subaccount": "customer-123",
		"google_analytics_domains": [
			"example.com"
		],
		"google_analytics_campaign": "message.from_email@example.com",
		"metadata": {
			"website": "www.example.com"
		},
    	"recipient_metadata": [{
            "rcpt": "recipient.email@example.com",
            "values": {
                "user_id": 123456
            }
        }],
    	"attachments": [{
            "type": "text/plain",
            "name": "myfile.txt",
            "content": "ZXhhbXBsZSBmaWxl"
        }],
    	"images": [{
            "type": "image/png",
            "name": "IMAGECID",
            "content": "ZXhhbXBsZSBmaWxl"
        }]
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
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));