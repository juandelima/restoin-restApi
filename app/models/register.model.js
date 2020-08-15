const sql = require("./db.js");

const Register = function(register) {
    this.foto_profil = register.foto_profil;
    this.nama_lengkap = register.nama_lengkap;
    this.email = register.email;
    this.password = register.password;
    this.no_telepon = register.no_telepon;
    this.role = register.role;
}

Register.create = (newRegister, result) => {
    sql.query("INSERT INTO user SET ?", newRegister, (err) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created register user: ", {...newRegister });
        result(null, {...newRegister });
    });
};

module.exports = Register;