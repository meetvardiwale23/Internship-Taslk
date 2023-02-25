var fs = require('fs');


exports.returnText = function(){

    fs.readFile('./read.txt', 'utf-8' ,(err,data) =>{
        if(err)
        {
            console.log("not done");
            return err;
        }
        else{
            
            const dataArr = data.toString().split(" ");
            
            for(var i=0 ; i<dataArr.length;i++)
            {
                 dataArr[i] = dataArr[i].charAt(0).toUpperCase() + dataArr[i].slice(1);
            }
            fs.appendFile('./read.txt',dataArr.join(" ") ,(err) =>{
                if(err)
                {
                    console.log("Something went wrong");
                }
                else{
                    fs.readFileSync('./read.txt', "utf-8");
                }
             })
            
            
        }
    }); 
    
}

