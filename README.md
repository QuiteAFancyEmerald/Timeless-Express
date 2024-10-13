# Timeless <img align="right" width="200px" src="https://github.com/QuiteAFancyEmerald/Timeless/blob/master/src/favicon.png?raw"></img>
### A clean, thoughtfully designed portfolio site made with Express and vanilla JS/CSS.


## Overview
My portfolio site made from scratch! Built with vanilla JS/CSS and Express.

### Features

- Dynamic blog setup with markdown support
- Absurdly optimized~~
- Clean carousel for project showcasing


### Setup
Why would you want to do this? shrug~

Well it works fully as a static site but you may do the below if you want to use a very basic environment.

```
git clone https://github.com/QuiteAFancyEmerald/Timeless.git
cd Timeless
npm install
npm start
```

### NGINX Configuration
```nginx 
    server {
        listen 80;
        server_name quiteafancyemerald.com www.quiteafancyemerald.com;
        limit_conn conn_limit_per_ip 15;
        limit_req zone=req_limit_per_ip burst=15 nodelay;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;
        server_name quiteafancyemerald.com www.quiteafancyemerald.com;

        ssl_certificate /etc/nginx/ssl/quiteafancyemerald.com/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/quiteafancyemerald.com/privkey.pem;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA HIGH !RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS";
        ssl_prefer_server_ciphers on;

        server_tokens off;
        access_log off;
        error_log off;

        location / {
            proxy_pass http://localhost:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header x-frame-options "SAMEORIGIN";
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For-Forwarded-Proto $https;
            proxy_set_header X-Url-Scheme $scheme;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_redirect off;
            proxy_cache_bypass $http_upgrade;

            # Security Stuff
            add_header X-Robots-Tag "googlebot: all";
            add_header X-Robots-Tag "bingbot: all";
            add_header X-Frame-Options "SAMEORIGIN";
            add_header X-XSS-Protection "1; mode=block";
            add_header X-Content-Type-Options "nosniff";
            add_header Content-Security-Policy "default-src 'self'; connect-src *; font-src *; frame-src *; img-src * data:; media-src *; object-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline';";
            add_header Referrer-Policy 'strict-origin';
        }

    }
```

Thanks to @00Fjongl for fixing the various resource usage issues on Firefox! Was a slightly cursed issue with how Firefox handles hardware acceleration and simple CSS keyframe animations.

<img src="https://github.com/QuiteAFancyEmerald/Timeless/blob/master/src/404.png?raw"></img>
