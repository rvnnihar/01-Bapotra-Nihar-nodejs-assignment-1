const http = require('http');
const WebSocket  =  require('ws')
const {WebSocketServer}  =  require('ws')

const static = require('node-static');
const {replyToChat} = require('./chatboat');
const { fileUnlinkPromise } = require('./unlink');
const fileserver = new static.Server('./public')
const fetch = require('node-fetch');


const server = http.createServer(async (req,res)=>{
    
    if(req.url == "/get-data" && req.method=="POST"){
        res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("get-data");
            return res.end();
    }
    else if(req.url == "/get-hello" && req.method=="POST"){
        res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write("Hello NodeJS!!");
            return res.end();
    }

    else if(req.url == "/unlink" && req.method=="GET"){
            fileUnlinkPromise("./public/target.zip").then((data)=>{
                    console.log(data)
                    res.end("file unlinked successfully");
                
            }).catch((err)=>{
                res.end("error accur");
            })
            // return res.end("compress");
    }

    else if(req.url == "/google" && req.method=="GET"){
        await fetch('https://www.google.com/').then(data=>{
            console.log("Google api fetched")
            res.end("Google api fetched")
            
        }).catch((err)=>{
            console.log(err)
            res.end("error accur");
        })
        // return res.end("compress");
    }


    req.addListener('end',()=>{
        fileserver.serve(req,res);
        
    }).resume();
}).listen(3000,()=>{
    console.log("Server listening on port 3000")
})

const websocet = new WebSocket.Server({  server: server  });

websocet.on('connection', function(ws) {
  ws.send('Hello client')
  
  ws.on('message', message => {
    ws.send(replyToChat(message.toString()))
  })
  
})



const cricketWS = new WebSocketServer({ port: 8000 });


cricketWS.on('connection', function(ws) {
    let data = [
        {
            score:115,
            over:8.4,
            wicket:3,
        },
        {
            score:37,
            over:4.4,
            wicket:0,
        },
        {
            score:23,
            over:3.0,
            wicket:1,
        }
    ];

    setInterval(() => {
        ws.send(JSON.stringify(getScore(data)));
    },2000);
    
  
  
})

function getScore(data){

    const runs = [0,1,2,3,4,6];
    const wickets = [0,0,0,1,0,0,1,0,1,0,0,0];

    for (let i = 0; i < 3; i++) {
        
        if(data[i].over< 10 && data[i].wicket< 10){

            var run = runs[Math.floor(Math.random()*runs.length)];

            data[i].score += run;
            
            if (Math.abs((data[i].over % 1)-0.5) < 0.001)
            data[i].over += 0.5;
            else 
            data[i].over += 0.1;
            
            data[i].over = Math.round(data[i].over * 10) / 10

            data[i].wicket += wickets[Math.floor(Math.random()*wickets.length)]; 
            
        }
    } 
    return data;
}