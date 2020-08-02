const sql = require("./db.js");

const EstimasiMasak = function(estimasi) {
    this.id_order = estimasi.id_order;
    this.iscooked = estimasi.iscooked;
    this.timebfrmasak = estimasi.timebfrmasak;
    this.timeaftmasak = estimasi.timeaftmasak;
};

EstimasiMasak.getAll = result => {
    sql.query(`
        SELECT e.id_estimasi, e.id_order, m.nama_menu, 
        e.iscooked, e.timebfrmasak, e.timeaftmasak FROM estimasi_masak e 
        INNER JOIN order_menu o ON e.id_order = o.id_order 
        INNER JOIN menu_resto m ON o.id_menu = m.id_menu 
        ORDER BY e.id_estimasi DESC`,
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Estimasi masak: ", res);
            result(null, res);
        }
    );
};

EstimasiMasak.filterByIdUser = (id_user, result) => {
    sql.query(`
        SELECT e.id_estimasi, e.id_order, m.nama_menu, 
        e.iscooked, e.timebfrmasak, e.timeaftmasak FROM order_menu o 
        INNER JOIN estimasi_masak e ON o.id_order = e.id_order 
        INNER JOIN menu_resto m ON o.id_menu = m.id_menu 
        WHERE o.id_user = ${id_user} ORDER BY e.id_estimasi DESC`,
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log(`Estimasi masak by id user ${id_user}: `, res);
            result(null, res);
        }
    )
};

EstimasiMasak.create = newEstimasi => {
    sql.query("INSERT INTO estimasi_masak SET ?", newEstimasi, (err) => {
        if(err) {
          console.log("error: ", err);
          return;
        }

        console.log({
          "success": "estimasi_masak successfully created"
        });
        
    });
};

EstimasiMasak.updateByIsCooked = (id_estimasi, estimasi_masak, result) => {
    sql.query(`
        UPDATE estimasi_masak SET iscooked = ? WHERE id_estimasi = ?`,
        [estimasi_masak.iscooked, id_estimasi],
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
      
            console.log("updated estimasi_masak: ", { id_estimasi: id_estimasi, ...estimasi_masak });
            result(null, { id_estimasi: id_estimasi, ...estimasi_masak });
        }
    );
};

EstimasiMasak.updateByCookingTime = (id_estimasi, estimasi_masak, result) => {
    sql.query(`
        UPDATE estimasi_masak SET timebfrmasak = ?,
        timeaftmasak = ? WHERE id_estimasi = ?`,
        [estimasi_masak.timebfrmasak, 
        estimasi_masak.timeaftmasak, id_estimasi],
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
      
            console.log("updated estimasi_masak: ", { id_estimasi: id_estimasi, ...estimasi_masak });
            result(null, { id_estimasi: id_estimasi, ...estimasi_masak });
        }
    );
};

function findIdOrderByIdEstimasi(id_estimasi, callback) {
    const query = `SELECT id_order, iscooked, timebfrmasak, timeaftmasak FROM estimasi_masak WHERE id_estimasi = ${id_estimasi}`;
    sql.query(query, function(err, result) {
        if (err){ 
            throw err;
        }

        return callback(result[0]);
    });
}

module.exports =  {
    EstimasiMasak,
    findIdOrderByIdEstimasi
};