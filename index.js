const express = require('express')
const app = express()
//const cors = require('cors');
//const frameguard = require('frameguard') //imports iframe block
const config = require('./config.json')
const port = process.env.PORT || 8080;
const Corrosion = require('./lib/server')
const btoa = e => new Buffer.from(e).toString("base64")

const proxy = new Corrosion({
  prefix: "/beta/",
  codec: "base64",
  title: "Classes",
  forceHttps: true,
  requestMiddleware: [
  Corrosion.middleware.blacklist([
    'accounts.google.com'
  ], 'This page is unavailable.'),
]
});

proxy.bundleScripts();

//app.use(frameguard({ action: 'SAMEORIGIN' })) //blocks iframing this site

app.get('/', function(req, res){
  res.sendFile('index.html', {root: './main'});
});

app.use('/g/', function(req, res, next){
  res.sendFile('gams.html', {root: './main'});
});

app.get('/js/go.js', function(req, res){
  res.sendFile('go.js', {root: './main/js/'});
});

app.get('/favicon.ico', function(req, res){
  res.sendFile('favicon.ico', {root: './main/img/'});
});

app.use(express.static('./main', {
  extensions: ['html']
}));

app.use(function (req, res) {
  if (req.url.startsWith(proxy.prefix)) {
    proxy.request(req,res);
  } else {
    res.status(404).sendFile('404.html', {root: './main'});
  }
}).post('*', (req, res) => {})

app.listen(port, () => {
  console.log(`Site is running at localhost:${port}`)
})
