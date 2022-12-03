const fs = require('fs');
const path = require('path');
const ms = require('ms');
const express = require('express');
const app = express();
const compression = require('compression');

const config = require('../config/index.js');

const IP = config.buildtime.originServer.ip;
const PORT = config.buildtime.originServer.port;

(function injectConfig() {
  const configScript = `<!--configArea--><script>window.CODEMAOCONFIG = ${JSON.stringify(config.runtime)}</script><!--endOfConfigArea-->`;
  const htmlPath = path.join(__dirname, '../build/index.html');
  let htmlData = fs.readFileSync(htmlPath, { encoding: 'utf8' });

  htmlData = htmlData.replace(/<!--configArea-->(.)*<!--endOfConfigArea-->/, configScript);
  fs.writeFileSync(htmlPath, htmlData);
})();

app.use(compression());

app.use(express.static(path.join(__dirname, '../build/'), {
  etag: true,
  lastModified: true,
  maxAge: ms('10 days'),
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.set('Cache-Control', 'no-cache');
    }
  },
}));

app.use(function(req, res, next) {
  if (/^\/MP_verify_/.test(req.path)) {
    res.send(req.path.match(/\/MP_verify_(.*).txt/)[1]);
  } else {
    next();
  }
});

/**
 * codemao fun 小程序webview相关配置文件
 */
app.get('/XSXXE203iJ.txt', function(req, res) {
  res.send('af65fa6fdd0b16f3a46c24171957f5e9');
});
app.get('/miazrwrQVm.txt', function(req, res) {
  res.send('3abf3c3d6630b2cc9f31221d497531db');
});
app.get('/7MX4KVzUiH.txt', function(req, res) {
  res.send('c8c3e83012af85cb981aef13594aef41');
});
app.get('/yl6ScvYgyI.txt', function(req, res) {
  res.send('aa092a747f32d91b6ce97e6201850d6a');
});
app.get('/9ST49jhxQP.txt', function(req, res) {
  res.send('cd9dc88ffe38ad5a76d9e2a14eb40c8f');
});

app.use((req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, '../build/'));
});

app.listen(PORT, () => {
  console.log(`The app server is working at: http://${IP}:${PORT}`);
});
