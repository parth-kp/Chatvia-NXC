const mysql = require('mysql');
const bcrypt = require("bcrypt");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'whatsapp'
});

let CheckCredentials=(email,password)=>{
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
}