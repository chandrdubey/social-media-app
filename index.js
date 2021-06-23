const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const PORT = "5000";

app.use(express.json());
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

