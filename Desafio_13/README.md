#Servidor con balance de carga con PM2 y NGINX

#### Configuración de NGNIX

events {
}

http {
include mime.types;

    upstream node_app {
        server localhost:8082;
        server localhost:8083;
        server localhost:8084;
        server localhost:8085;
    }

    server {
        listen 8080;
        location /api/randoms {
            proxy_pass http://node_app;
        }
    }

}

### Para los scripts de:

scripts": {
"start": "node app.js --port 3000 --mode cluster",
"devNodemon": "nodemon app.js --port 3000 --mode cluster",
"pm2Fork": "pm2 start app.js --name server --watch -- --port 3000 --mode fork",
"pm2Cluster": "pm2 start app.js -i max --name server --watch -- --port 8080 --mode fork ",
"pm2Monitor": "pm2 monit",
"pm2DeleteAll": "pm2 delete all"
},
