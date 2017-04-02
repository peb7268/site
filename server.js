
var express = require('express')
var app = express()

//Middleware
app.use(express.static('public'));

//Routes
app.get('/test', (req, res) => res.send('rendered with express'));

//Port Configs
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})