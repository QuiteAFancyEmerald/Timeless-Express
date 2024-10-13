const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const helmet = require('helmet'); 
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const text404 = fs.readFileSync(path.normalize(__dirname + '/src/404.html'), 'utf8');
const pages = { 
    index: "index.html", 
    projects: "projects.html", 
    socials: "socials.html", 
    gallery: "gallery.html" 
};
const router = express.Router();

app.use(helmet({
    hidePoweredBy: true,
    noSniff: true,
    xssFilter: true,
    contentSecurityPolicy: false
}));


router.get('/', (req, res) => {
    res.send(fs.readFileSync(path.normalize(__dirname + '/src/' + pages.index), 'utf8'));
});

router.get('/projects', (req, res) => {
    res.send(fs.readFileSync(path.normalize(__dirname + '/src/' + pages.projects), 'utf8'));
});

router.get('/socials', (req, res) => {
    res.send(fs.readFileSync(path.normalize(__dirname + '/src/' + pages.socials), 'utf8'));
});

router.get('/gallery', (req, res) => {
    res.send(fs.readFileSync(path.normalize(__dirname + '/src/' + pages.gallery), 'utf8'));
});

app.use(express.static(path.normalize(__dirname + "/src")));
app.use(router);
app.use((_req, res) => {
    res.status(404).send(text404);
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
