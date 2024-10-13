const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const { marked } = require('marked');

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const text404 = fs.readFileSync(path.normalize(__dirname + '/src/404.html'), 'utf8');

const pages = { 
    index: "index.html", 
    projects: "projects.html", 
    socials: "socials.html", 
    blog: "blog.html", 
    gallery: "gallery.html" 
};

app.use(helmet({
    hidePoweredBy: true,
    noSniff: true,
    xssFilter: true,
    contentSecurityPolicy: false
}));

app.use(express.static(path.normalize(__dirname + "/src")));

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', pages.index));
});

router.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', pages.projects));
});

router.get('/socials', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', pages.socials));
});


router.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', pages.gallery));
});

router.get('/blog', (req, res) => {
    const postsDir = path.join(__dirname, 'posts');
    
    fs.readdir(postsDir, (err, files) => {
        if (err) {
            return res.status(500).send("Error reading posts directory.");
        }

        const markdownFiles = files.filter(file => file.endsWith('.md'));

        fs.readFile(path.join(__dirname, 'src', pages.blog), 'utf8', (err, blogTemplate) => {
            if (err) {
                return res.status(500).send("Error loading blog page.");
            }

            const postPromises = markdownFiles.map(file => {
                return fs.promises.readFile(path.join(postsDir, file), 'utf8')
                    .then(markdownContent => {
                        const postHtml = marked(markdownContent); 
                        return postHtml;
                    });
            });

            Promise.all(postPromises)
                .then(posts => {
                    let modifiedBlogTemplate = blogTemplate;
                    posts.forEach(postHtml => {
                        modifiedBlogTemplate = modifiedBlogTemplate.replace('<!-- Blog Post Markdown Goes Here -->', postHtml);
                    });

                    res.send(modifiedBlogTemplate);
                })
                .catch(err => {
                    res.status(500).send("Error processing blog posts.");
                });
        });
    });
});

app.use(router);

app.use((_req, res) => {
    res.status(404).send(text404);
});

server.listen(port, () => {
    console.log(`Timeless Express is running on http://localhost:${port}`);
});
