const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const dbcall = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'count',
        password: '1amHa!nt',
        database: 'smartbrain'
    }
});

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => res.send(database.users))

app.post('/signin', signin.handleSignIn(dbcall, bcrypt))
app.post('/register', register.handleRegister(dbcall, bcrypt))
app.get('/profile/:id', profile.handleProfile(dbcall))
app.put('/image', (req, res) => { image.handleImage(req, res, dbcall) })
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

const PORT = process.env.PORT

app.listen(PORT||4000, () => { console.log(`app is running on ${PORT}`); })