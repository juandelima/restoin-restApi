const sql = require("./db.js");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const Auth = function(auth) {
    this.email = auth.email;
    this.password = auth.password;
}

Auth.login = (email, password, result) => {
    sql.query("SELECT nama_lengkap, email, password FROM user WHERE email =  ?", [email], (err, res) => {
        if(err) {
            result.json({
                status:false,
                message:'there are some error with query'
            })
        } else {
            if(res.length > 0) {
                const decryptedPassword = cryptr.decrypt(res[0].password);
                if(password === decryptedPassword) {
                    result(null, {
                        "success": "successfully authenticated",
                        "message": `Hai, ${res[0].nama_lengkap}`
                    });   
                } else {
                    result(null, {
                        "success": "Password does not match",
                    });  
                }
            } else {
                result(null, {
                    "success": "Email does not exits",
                });  
            }
        }
    });
};

module.exports = Auth;