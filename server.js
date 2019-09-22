const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();


const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('Mongo DB is connected!!!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!! and good bye'));
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 7000;
app.listen(port,() => console.log(`Server running on port ${port}`));



