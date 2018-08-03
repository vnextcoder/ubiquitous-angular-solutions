const http = require('http') 
const server = http.createServer((request, response) => { response.writeHead(200, {'Content-Type': 'text/plain'})
response.end("Hello World") 
}) 
server.listen(8000)

setInterval(() => console.log('function 1'), 1000);
setInterval(() => { 
   console.log('function 2');
   while (true) { } 
   }, 1000) ;
console.log('starting')



function concat(a, b, callback){
 setTimeout(function(){
   var r = a + b 
   callback(r) 
}, 0)
 }


 function concat(a, b, callback){
  setTimeout(function(){
   var r = a + b 
   callback(r) 
  }, 0)
}
 
function upper(a, callback){
  setTimeout(function(){
    var r = a.toUpperCase()
    callback (r) 
  }, 0)
}

function decor(a, callback){
  setTimeout(function(){
    var r = '*' + a + '*'
    callback (r) 
  }, 0)
}

concat('hello', 'world', r1 => {
  upper(r1, r2 => { 
    decor(r2, r3 => {
       console.log(result, r3)
	   // *HELLOWORLD* 
	   })
   })
  })