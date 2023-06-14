const express = require('express');
const router = express.Router();
const con = require("../DB.js");
let error = require("../MiddleWare/Error.js")
let bcrypt = require('bcrypt');
router.post("/login", error(async (req, res, next)=>{
    let {email, password} = req.body;
   con.query(`select usr_id, usr_name, usr_pass, token from user_master where usr_email = '${email}'`, (err, result)=>{
        let count = 0;
         result.map((e)=>{
            let hash = e.usr_pass.replace(/^\$2y(.+)$/i, '$2a$1');
            let check =  bcrypt.compareSync(password, hash);
            console.log(check);
            console.log(count++);
            if(check){
                 res.json({success: true, message: "Login Successfull", id: e.usr_id, name: e.usr_name, email, token: e.token})
                 return;
            }
         })
         console.log("Hello");
         res.json({success: false, message: "Invalid Credentials"});
   })
}));
router.get("/logout", async(req, res, next)=>{
    res.send("Hello Parth");
})

module.exports = router;