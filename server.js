const express = require('express');
const app = express();
const con = require('./DB');
app.use(express.json());

try {
    con.connect((err) => {
        if (err) console.log(err);
        console.log("DataBase Connected is successfully");
    })
}catch (e){
    console.log(e);
}

app.use('', require("./Routes/Login.js"));

app.listen(5001, ()=>{
    console.log("Listening to port 5001")
})