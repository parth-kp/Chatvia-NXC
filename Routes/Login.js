const express = require('express');
const router = express.Router();
const con = require("../DB.js");
let error = require("../MiddleWare/Error.js")
let bcrypt = require('bcrypt');
router.post("/login", async (req, res, next)=>{
    let {email, password} = req.body;
   con.query(`select usr_id, usr_name, usr_pass, token from user_master where usr_email = '${email}'`, (err, result)=>{
           if(!err){
            try{
           for(let i = 0; i < result.length; i++){
            let hash = result[i].usr_pass.replace(/^\$2y(.+)$/i, '$2a$1');
            let check =  bcrypt.compareSync(password, hash);
            if(check){
                 res.json({success: true, message: "Login Successfull", id: result[i].usr_id, name: result[i].usr_name, email, token: result[i].token})
                 return;
            }
         }
         res.json({success: false, message: "Invalid Credentials"});
        }
         catch(error){
            res.json({status: false, message: error.message});
         }
        }
        else {
            res.json({success: false, error: true, message: err.message})
        }
   })
});


router.get("/logout", async(req, res, next)=>{
    res.send("Hello Parth");
})

module.exports = router;