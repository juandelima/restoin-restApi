const sql = require("./db.js");

const MenuResto = function(menu) {
    this.id_resto = menu.id_resto;
    this.id_kategori_menu = menu.id_kategori_menu;
    this.nama_menu = menu.nama_menu;
    this.harga = menu.harga;
    this.deskripsi = menu.deskripsi;
    this.foto_menu = menu.foto_menu;
    this.status_menu = menu.status_menu;
};

MenuResto.create = (newMenu, result) => {
    sql.query("INSERT INTO menu_resto SET ?", newMenu, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created menu: ", {...newMenu });
      result(null, {...newMenu });
    });
};

MenuResto.getAll = result => {
    sql.query(`SELECT menu.id_menu, r.nama_resto, k.nama_kategori, menu.nama_menu, menu.harga, 
    menu.deskripsi, menu.foto_menu, menu.status_menu, menu.is_deleted, menu.created_at, menu.updated_at 
    from menu_resto menu INNER JOIN resto r on menu.id_resto = r.id_resto INNER JOIN kategori_menu k 
    on menu.id_kategori_menu = k.id_kategori order by menu.id_menu desc`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Menu Resto: ", res);
        result(null, res);
    });
};

MenuResto.getByIdResto = (id_resto, result) => {
  sql.query(`SELECT menu.id_menu, r.nama_resto, k.nama_kategori, menu.nama_menu, menu.harga, 
  menu.deskripsi, menu.foto_menu, menu.status_menu, menu.is_deleted, menu.created_at, menu.updated_at 
  from menu_resto menu INNER JOIN resto r on menu.id_resto = r.id_resto INNER JOIN kategori_menu k 
  on menu.id_kategori_menu = k.id_kategori where menu.id_resto = ${id_resto} order by menu.id_menu desc`, (err, res) => {
      if(err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }

      console.log("Menu Resto: ", res);
      result(null, res);
  });
};

MenuResto.updateById = (id, data, result) => {
    sql.query(
      `UPDATE menu_resto SET id_resto = ?, 	id_kategori_menu = ?, nama_menu = ?, harga = ?, 
       deskripsi = ?, foto_menu = ?, status_menu = ? WHERE id_menu = ? 
      `,
      [data.id_resto, data.id_kategori_menu, 
        data.nama_menu, data.harga, 
        data.deskripsi, 
        data.foto_menu, 
        data.status_menu, id],
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
  
        console.log("updated menu resto: ", { id_menu: id, ...data });
        result(null, { id_menu: id, ...data });
      }
    );
};

MenuResto.findById = (id, result) => {
  sql.query("SELECT harga FROM menu_resto WHERE id_menu = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

MenuResto.remove = (id, result) => {
    sql.query("DELETE FROM menu_resto WHERE id_menu = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted menu resto with id: ", id);
      result(null, res);
    });
};

MenuResto.removeAll = result => {
    sql.query("DELETE FROM menu_resto", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} menu_resto`);
      result(null, res);
    });
};

function getHargaMenu(id_menu, callback) { 
  const query = `SELECT harga FROM menu_resto WHERE id_menu = ${id_menu}`;
  sql.query(query, function(err, results) {
    if (err){ 
      throw err;
    }

    return callback(results[0].harga);
  });
}

module.exports = {
  MenuResto,
  getHargaMenu
};
