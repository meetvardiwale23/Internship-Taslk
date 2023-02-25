const express = require('express');
const app = express();
const port = 6000;
app 


app.listen(port,(err,res)=>{

    if(err) throw err;

    console.log(`listining on port ${port}`);
})