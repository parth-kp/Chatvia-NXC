const express = require('express');
const app = express();
const connect = require("./DB.js");
connect();
app.listen(5000, ()=>{
    console.log("Listening to port 5000")
})