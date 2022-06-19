const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');
const { faker } = require('@faker-js/faker');
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res, next) => { console.log('asdasd'); 
  const users = readUsers();
  const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
  if (user) {
    res.status(200).send(JSON.stringify(user));
  } else {
    res.status(200).send(JSON.stringify(['Incorrect username or password']));
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');  
  const users = JSON.parse(dbRaw).users
  return users;
}
