var http = require('http');
var newdate = require('./index');

http.createServer(function(req,res){
    res.write("Performing date fucntions");
    newdate.newDate();
    res.end();
}).listen(3000,()=>{
    console.log("Listining on port 3000");
}); 