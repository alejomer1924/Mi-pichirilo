//initialize variables

const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');

//initialize express

const app = express(); 

//Midlewares

app.use(cors());
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000); 
app.use(require('./routes/routes'));
app.use(express.static(path.resolve(__dirname, 'public')));
 


//server start

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port')); 
});


