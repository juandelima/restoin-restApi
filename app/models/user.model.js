const sql = require("./db.js");

const User = function(user) {
    this.foto_profil = user.foto_profil;
    this.nama_lengkap = user.nama_lengkap;
    this.email = user.email;
    this.password = user.password;
    this.no_telepon = user.no_telepon;
    this.role = user.role;
}

User.getAll = result => {
    sql.query(`SELECT id_user, foto_profil, nama_lengkap, 
    email, password, no_telepon, role, is_deleted, created_at, updated_at FROM user order by id_user desc`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Users: ", res);
        result(null, res);
    });
};

User.updateById = (id, data, result) => {
    sql.query(
      `UPDATE user SET foto_profil = ?, nama_lengkap = ?, email = ?, password = ?, 
      no_telepon = ?, role = ?, is_deleted = ? WHERE id_user = ? 
      `,
      [data.foto_profil, data.nama_lengkap, data.email,
        data.password, data.no_telepon, data.role, data.is_delete, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { id_user: id, ...data });
        result(null, { id_user: id, ...data });
      }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id_user = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} user`);
      result(null, res);
    });
};

module.exports = User;