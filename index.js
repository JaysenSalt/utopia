const express = require('express')
const app = express()
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
  ], 'unavailable'),
]
});

proxy.bundleScripts();

app.get('/', function(req, res){
  res.sendFile('index.html', {root: './main'});
});

app.use('/g/', function(req, res, next){
  res.sendFile('gams.html', {root: './main'});
});

app.get('/js/go.js', function(req, res){
  res.sendFile('go.js', {root: './main/js/'});
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
  console.log(`running`)
})
