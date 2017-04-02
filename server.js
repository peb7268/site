
var express = require('express')
var app = express()

//Middleware
app.use(express.static(__dirname + '/public'));
//If you want to use view engines
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

//Routes
app.get('/test', (req, res) => res.send('rendered with express'));

//Port Configs
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));