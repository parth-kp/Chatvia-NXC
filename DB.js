const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'whatsapp'
});

let connect = ()=>{
con.connect((err)=> {
  if (err) console.log(err);
   con.query("SELECT * FROM user_master",  (err, result, fields) => {
        if (err) throw err;
        console.log(result[0]);
        });
})}
 module.exports = connect;