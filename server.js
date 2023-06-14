const express = require('express');
const app = express();
const cors = require("cors");
const con = require('./DB');
app.use(express.json());
app.use(cors())
try{
con.connect((err)=> {
    if (err) console.log(err);
     console.log("Connection Successfull");
  })}
  catch(e){
    console.log(e);
  }

  app.use('/api/auth', require("./Routes/Login.js"));

app.listen(5000, ()=>{
    console.log("Listening to port 5000")
})

   