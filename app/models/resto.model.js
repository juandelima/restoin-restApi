const sql = require("./db.js");

const Resto = function(resto) {
    this.id_resto = resto.id_resto;
    this.nama_resto = resto.nama_resto;
    this.latitude = resto.latitude;
    this.longitude = resto.longitude;
    this.kisaran_harga = resto.kisaran_harga;
    this.id_kategori_resto = resto.id_kategori_resto;
    this.id_rating = resto.id_rating;
    this.alamat = resto.alamat;
    this.kontak = resto.kontak;
    this.status = resto.status;
    this.nama_pemilik = resto.nama_pemilik;
}

Resto.create = (newResto, result) => {
    sql.query("INSERT INTO resto SET ?", newResto, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created resto: ", {...newResto });
      result(null, {...newResto });
    });
};

Resto.getAll = result => {
    sql.query(`SELECT r.id_resto, r.nama_resto, r.latitude, r.longitude, r.kisaran_harga, 
    kategori_resto.nama_kategori, rate.rating, r.alamat, r.kontak, r.status, 
    r.nama_pemilik, r.created_at, r.updated_at FROM resto r 
    INNER JOIN kategori_resto on r.id_kategori_resto = kategori_resto.id_kategori 
    INNER JOIN rating_resto rate on r.id_rating = rate.id_rating 
    order by r.id_resto DESC`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Resto: ", res);
        result(null, res);
    });
};

Resto.updateById = (id, data, result) => {
    sql.query(
      `UPDATE resto SET nama_resto = ?, latitude = ?, longitude = ?, 
       kisaran_harga = ?, id_kategori_resto = ?, id_rating = ?,
       alamat = ?, kontak = ?, status = ?, nama_pemilik = ? WHERE id_resto = ? 
      `,
      [data.nama_resto, data.latitude, 
        data.longitude, data.kisaran_harga, 
        data.id_kategori_resto, data.id_rating, 
        data.alamat, data.kontak, data.status, data.nama_pemilik, id],
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
  
        console.log("updated resto: ", { id_resto: id, ...data });
        result(null, { id_resto: id, ...data });
      }
    );
};

Resto.remove = (id, result) => {
    sql.query("DELETE FROM resto WHERE id_resto = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted resto with id: ", id);
      result(null, res);
    });
};

Resto.removeAll = result => {
    sql.query("DELETE FROM resto", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} resto`);
      result(null, res);
    });
};

module.exports = Resto;