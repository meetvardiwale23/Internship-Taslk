
exports.newDate = function()
{
    var Days = ['Sunday','Monday','Tuesday','wednesday','Thursday','Friday','Saturday'];
    const date = new Date("2023-04-30");
    const date1 = new Date("2002-04-23");
    const date2 = new Date("2023-02-17");
    const newDate = new Date();
    const newDate1 = new Date();
    const counter = 1;

   newDate.setDate(date.getDate()+ counter) ;
 

    console.log(newDate); 
    console.log(newDate1); 
    console.log(Days[date.getDay()]);
    console.log(Days[date1.getDay()]);
    console.log(Days[date2.getDay()]);
    
} 