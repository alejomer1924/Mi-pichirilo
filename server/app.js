//initialize variables

const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');

//initialize express

const app = express(); 

//Midlewares

app.use(cors());
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000); 
app.use(require('./routes/routes'));
 


//server start

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port')); 
});


