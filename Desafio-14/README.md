#Para ejecutar las combinaciones posibles elegir algunos de los scripts de

scripts: {
"start": "node app.js --port 3000 --mode FORK",
"devNodemon": "nodemon app.js --port 3000 --mode FORK",
"pm2Fork": "pm2 start app.js --name server --watch -- --port 3000 --mode FORK",
"pm2Cluster": "pm2 start app.js -i max --name server --watch -- --port 8080 --mode FORK ",
"pm2Monitor": "pm2 monit",
"pm2DeleteAll": "pm2 delete all",
"testArtillery": "artillery quick --count 50 -n 40 http://localhost:8081?max=100000 > result_fork.txt"
},
