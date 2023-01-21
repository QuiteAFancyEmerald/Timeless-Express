const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const text404 = fs.readFileSync(path.normalize(__dirname + '/static/404.html'), 'utf8');
const pages = { index: "index.html", projects: "projects.html", waifus: "waifus.html", socials: "socials.html", gallery:"gallery.html" };
const router = express.Router();

router.get('/', (req, res) => {
    res.send(fs.readFileSync(path.normalize(__dirname + '/static/' + pages.index), 'utf8'));
});

router.get('/projects', (req, res) => {
    res.send(fs.readFileSync(path.normalize(__dirname + '/static/' + pages.projects), 'utf8'));
});

router.get('/waifus', (req, res) => {
    res.send(fs.readFileSync(path.normalize(__dirname + '/static/' + pages.waifus), 'utf8'));
});

router.get('/socials', (req, res) => {
    res.send(fs.readFileSync(path.normalize(__dirname + '/static/' + pages.socials), 'utf8'));
});

router.get('/gallery', (req, res) => {
    res.send(fs.readFileSync(path.normalize(__dirname + '/static/' + pages.gallery), 'utf8'));
});

app.use(express.static(path.normalize(__dirname + "/static")));
app.use(router);
app.use((req, res) => {
    res.status(404).send(text404)
});

server.listen(port);
console.log(`Server is running on port ${port}`);
