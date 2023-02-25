
const express = require('express');
const app = express();
const port = 3000;

app.use(express());

app.get('/getprime', (req,res)=>{
    
    let n=30;
    let flag = 0;
    
    for(let i=2;i<=n;i++)
    {
        flag=0;
        for(let j=2;j<i;j++)
        {
            if(i % j == 0)
            {
                flag = 1;
                break;
            }
        }
        if(flag == 0 )
        {
            console.log(i);
        }    
    }
    
});

app.get('/oddeven', (req,res)=>{
    res.send("In odd even page");
    let n= 10;
    for(let i=0;i<n;i++)
    {
        if(i%2 == 0)
        {
            console.log(i,"is even number");
        }
        else
        {
            console.log(i,'it is odd number');
        }
    }
});

app.get('/phebo', (req,res)=>{
    res.send("In phebonaci page");
    let n=10;
    let a = 0,b =1,c;
    for(i=1;i<n;i++)
    {   console.log(c);
        c = a+b;
        a=b;
        b=c;  
    }
    
});


app.listen(port, ()=>{
    console.log(`Listining on ${port}`);
});