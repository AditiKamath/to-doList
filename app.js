const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require("body-parser");
const path = require('path');

const mongoose = require('mongoose');
const controller = require('./server/controller/controller');
const PORT =3000
const uri  = "mongodb+srv://admin1:admin@cluster0.cmd6t.mongodb.net/task-list?retryWrites=true&w=majority";  
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
      console.log('connected to db ')
      app.listen(3000)
  })
  .catch(err => console.log(err));

const app = express();

dotenv.config( { path : 'config.env'} )


// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))
app.use(express.json()); 

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "/js")))

// load routers
app.use('/', require('./server/routes/router'))

// app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});










