const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = "5000";
app.use(express.json()); 


app.use('/',routes);  

app.listen(PORT , (err) =>{
    if(err)
    {
        console.log(`there is an error ${err}`);
    }
    console.log(`the server is running on ${PORT}`);
});

