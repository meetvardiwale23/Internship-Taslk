var http = require('http');
var current = require('./index');

http.createServer(function(req,res){
    res.writeHead(400,{'content-type' : 'error'});
    res.write("Your Current Date & Time is :"+current.myDateTime());
    res.end();
}).listen(3000,()=>{
    console.log("Listining on the port 3000")
}) 