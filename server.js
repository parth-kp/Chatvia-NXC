const express = require('express');
const app = express();
const con = require('./DB');
app.use(express.json());
con.connect((err)=> {
    if (err) console.log(err);
    console.log("Connection Successfull");
  })
  app.use('/api/auth', require("./Routes/Login.js"));

app.listen(5001, ()=>{
    console.log("Listening to port 5001")
})