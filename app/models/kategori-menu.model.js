const sql = require("./db.js");

const KategoriMenu = function(kategori) {
    this.id_kategori = kategori.id_kategori;
    this.nama_kategori = kategori.nama_kategori;
}


KategoriMenu.create = (newKategori, result) => {
    sql.query("INSERT INTO kategori_menu SET ?", newKategori, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created kategori: ", {...newKategori });
      result(null, {...newKategori });
    });
};


KategoriMenu.getAll = result => {
    sql.query("SELECT * FROM kategori_menu order by id_kategori desc", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Kategori Menu: ", res);
        result(null, res);
    });
};


KategoriMenu.updateById = (id, data, result) => {
    sql.query(
      "UPDATE kategori_menu SET nama_kategori = ? WHERE id_kategori = ?",
      [data.nama_kategori, id],
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
  
        console.log("updated kategori menu: ", { id_kategori: id, ...data });
        result(null, { id_kategori: id, ...data });
      }
    );
};

KategoriMenu.remove = (id, result) => {
    sql.query("DELETE FROM kategori_menu WHERE id_kategori = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted kategorimenu with id: ", id);
      result(null, res);
    });
};
  
KategoriMenu.removeAll = result => {
    sql.query("DELETE FROM kategori_menu", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} kategori_menu`);
      result(null, res);
    });
};

module.exports = KategoriMenu;