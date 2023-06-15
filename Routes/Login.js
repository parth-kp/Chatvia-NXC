const express = require('express');
const router = express.Router();
const con = require("../DB.js");
let error = require("../MiddleWare/Error.js")
let bcrypt = require('bcrypt');

router.get("/login", error(async (req, res, next)=>{
    try{
        let email= req.param('email');
        console.log(email);
        let password= req.param('password');
        console.log(password);
        con.query(`select usr_id, usr_name, usr_pass, token from user_master where usr_email = '${email}'`, (err, result)=>{
            let count = 0;
            for (let i = 0; i < result.length; i++) {
                let hash = result[i].usr_pass.replace(/^\$2y(.+)$/i, '$2a$1');
                let check =  bcrypt.compareSync(password, hash);
                if(check){
                    res.send({success: true, message: "Login Successfull", id: result[i].usr_id, name: result[i].usr_name, email, token: result[i].token})
                    return;
                }
            }
            res.send({success: false, message: "Invalid Credentials"});
        })
    }catch (e) {
        res.send({success: false, message: "Invalid Credentials"});
    }
}));
router.get("/logout", async(req, res, next)=>{
    res.send("Hello Parth");
})
module.exports = router;