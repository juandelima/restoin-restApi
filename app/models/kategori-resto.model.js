const sql = require("./db.js");

const KategoriResto = function(kategori) {
    this.id_kategori = kategori.id_kategori;
    this.nama_kategori = kategori.nama_kategori;
}

KategoriResto.create = (newKategori, result) => {
    sql.query("INSERT INTO kategori_resto SET ?", newKategori, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created kategori: ", {...newKategori });
      result(null, {...newKategori });
    });
};


KategoriResto.getAll = result => {
    sql.query("SELECT * FROM kategori_resto order by id_kategori desc", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Kategori Resto: ", res);
        result(null, res);
    });
};


KategoriResto.updateById = (id, data, result) => {
    sql.query(
      "UPDATE kategori_resto SET nama_kategori = ? WHERE id_kategori = ?",
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
  
        console.log("updated kategori resto: ", { id_kategori: id, ...data });
        result(null, { id_kategori: id, ...data });
      }
    );
};

KategoriResto.remove = (id, result) => {
    sql.query("DELETE FROM kategori_resto WHERE id_kategori = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted KategoriResto with id: ", id);
      result(null, res);
    });
};
  
KategoriResto.removeAll = result => {
    sql.query("DELETE FROM kategori_resto", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} kategori_resto`);
      result(null, res);
    });
};

module.exports = KategoriResto;