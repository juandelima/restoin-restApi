const sql = require("./db.js");

const RatingResto = function(rating) {
    this.id_rating = rating.id_rating;
    this.id_resto = rating.id_resto;
    this.id_user = rating.id_user;
    this.rating = rating.rating;
    this.ulasan = rating.ulasan;
}

RatingResto.create = (newRating, result) => {
    sql.query("INSERT INTO rating_resto SET ?", newRating, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created rating: ", {...newRating });
      result(null, {...newRating });
    });
};

RatingResto.getAll = result => {
    sql.query(`select rate.id_rating, r.nama_resto, 
    u.nama_lengkap, rate.rating, rate.ulasan, 
    rate.created_at, rate.updated_at FROM rating_resto rate 
    INNER JOIN resto r on rate.id_resto = r.id_resto 
    INNER JOIN user u on rate.id_user = u.id_user order by rate.id_rating desc`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Rating Resto: ", res);
        result(null, res);
    });
};

RatingResto.remove = (id, result) => {
    sql.query("DELETE FROM rating_resto WHERE id_rating = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted rating resto with id: ", id);
      result(null, res);
    });
};

RatingResto.removeAll = result => {
    sql.query("DELETE FROM rating_resto", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} rating_resto`);
      result(null, res);
    });
};

module.exports = RatingResto;