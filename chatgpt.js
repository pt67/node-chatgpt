const express = require('express');
const axios = require('axios');
const process = require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const port = 3000;

const configuration = new Configuration({
  apiKey: process.parsed.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


//chat with gpt
async function chat(message){

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: message}],
});
//console.log(completion.data.choices[0].message);

return completion.data.choices[0].message;

}

//chat("write 5 words of milk.");


//make image with gpt

async function makeimage(say){

const response = await openai.createImage({
  prompt: say,
  n: 2,
  size: "1024x1024",
});

console.log(response.data);

}

//makeimage("A cute baby sea water");




app.get('/', (req, res)=>{
 res.send("We are buildig a chatgpt here..");
});

app.post('/', urlencodedParser, async (req, res)=>{
  //send a data with the name of message 
  //console.log(req.body);
  var msg = await chat(req.body.message);
  //console.log("from msg", msg);
  res.send(msg);

});



app.listen(port, ()=> { console.log("running on the 3000 port")} );









