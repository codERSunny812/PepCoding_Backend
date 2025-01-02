// node js server 

const http = require('http')
const fs = require('fs')


// when a request came this server will run 
const server = http.createServer((req,res)=>{
console.log("request has made to the server")
console.log(req.url)
console.log(req.method)

//response object
// res.setHeader("Content-Type","text/plain")
// if sends html
res.setHeader("Content-Type","text/HTML")

// res.write("hello")
//to sends a html
// res.write("<h1> hey</h1>")

// sending a html file
let path = './views'
switch (req.url) {
    case '/':
        path+='/index.htm'
        res.statusCode=200
        break;
    case '/about':
        path+='/about.htm'
        res.statusCode=200
       break;
    case '/about-us': // Redirect this route
        res.writeHead(301, { 'Location': '/about' });
        res.end(); // End the response after setting the redirect
        break;
    default:
        path+='/Error.htm'
        res.statusCode=404
        break;
}

fs.readFile(path,(err,fileData)=>{
    if(err){
        console.log("error occured")
    }else{
        // because we have only one res.write() so that why we can use res.end()     
        res.end(fileData);
    }
})

})

const PORT = 3001
//the hostname argument is not neccasry
server.listen(PORT,"localhost",()=>{
console.log("server is running")
})