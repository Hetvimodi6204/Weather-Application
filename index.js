//https://api.openweathermap.org/data/2.5/weather?lat=23.58&lon=72.36&appid=cb777e9b5a4b322ae0b5ff6480a82a72
//api.openweathermap.org/data/2.5/weather?q=pune&appid=cb777e9b5a4b322ae0b5ff6480a82a72

const http= require("http");
const fs= require("fs");
var requests= require("requests");
// const { REPLServer } = require("repl");
const homeFile= fs.readFileSync("home.html", "utf-8");

const replaceVal= (tempVal,orgVal)=>{
    let temperature= tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature= temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature= temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature= temperature.replace("{%location%}", orgVal.name);
    temperature= temperature.replace("{%country%}", orgVal.sys.country);
    temperature= temperature.replace("{%tempStatus%}", orgVal.weather[0].main);
    return temperature;
}
const server= http.createServer((req,res)=>{
   if(req.url=="/"){
    requests("https://api.openweathermap.org/data/2.5/weather?lat=23.58&lon=72.36&appid=cb777e9b5a4b322ae0b5ff6480a82a72")
    .on("data", (chunk)=>{
        const objData= JSON.parse(chunk);
        const arrData= [objData];
        // console.log(arrData[0].main.temp);
        const realTimeData= arrData
        .map((val) => replaceVal(homeFile, val))
        .join("");
        res.write(realTimeData);
        // console.log(realTimeData);
    })
    .on("end", (err)=>{
        if (err) return console.log("connection closed", err);
        // console.log("end");
        res.end();
    });
   }
});
server.listen(8000,"127.0.0.1");
