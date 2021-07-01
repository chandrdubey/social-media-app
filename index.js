const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const helmet = require("helmet");
const passport = require('passport');
const PORT = "5000";
const passportJwt = require('./config/passport-jwt-strategy')
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended:false})); 
app.use(cors());


app.use('/',routes);  

app.listen(PORT , (err) =>{
    if(err)
    {
        console.log(`there is an error ${err}`);
    }
    console.log(`the server is running on ${PORT}`);
});

