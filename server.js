const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //which means localhost
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, response) => {
    response.send(database.users);
    console.log(request.url);
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', (request, response) => { image.handleImage(request, response, db) });

app.post('/image-recognition', (request, response) => { image.handleApiCall(request, response) })


const port = 3001;
app.listen(port, () => {
    console.log('app is running on port', port);
});