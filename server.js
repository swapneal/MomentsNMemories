const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/',(req,res) => res.send("Hello World!!!"));
const port = 7000;
app.listen(port,() => console.log(`Server running on port ${port}`));

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
        .then(()=>console.log('Mongo DB is connected!!!'))
        .catch(err => console.log(err));
        