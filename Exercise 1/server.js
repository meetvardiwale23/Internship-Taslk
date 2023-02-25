var http = require('http');
var file_data = require('./index');

http.createServer(function(req,res){
    res.write("updating words with uppercase usinfs modules in node");
    file_data.returnText();
    res.end();
}).listen(3000,()=>{
    console.log("Listining on port 3000");
}); 