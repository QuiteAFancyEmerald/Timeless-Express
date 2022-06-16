const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const text404 = fs.readFileSync(path.normalize(__dirname + '/static/404.html'), 'utf8');
const pages = { index: "index.html", projects: "docs.html", waifus: "waifus.html", socials: "socials.html" };

function tryReadFile(file) {
    return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : text404;
}

app.get('/', async(req, res) => res.send(tryReadFile(path.normalize(__dirname + '/static/' + (['/', '/?'].includes(req.url) ? pages.index : pages[Object.keys(req.query)[0]])))));
app.use(express.static(path.normalize(__dirname + "/static"))), app.use((e, s) => { s.status(404).send(text404) });
server.listen(port);