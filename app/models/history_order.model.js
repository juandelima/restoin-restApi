const sql = require("./db.js");

const HistoryOrder = function(history) {
    this.id_order = history.id_order;
};

HistoryOrder.create = newHistory => {
    sql.query("INSERT INTO history_order SET ?", newHistory, (err) => {
        if(err) {
          console.log("error: ", err);
          return;
        }

        console.log({
          "success": "history_order successfully created"
        });
        
    });
};

HistoryOrder.getAll = result => {
    sql.query(`
        SELECT h.id_history, r.nama_resto, u.nama_lengkap, m.nama_menu, 
        o.metode_pembayaran, o.status, h.created_at FROM history_order h 
        INNER JOIN order_menu o ON h.id_order = o.id_order 
        INNER JOIN resto r ON o.id_resto = r.id_resto 
        INNER JOIN user u ON o.id_user = u.id_user 
        INNER JOIN menu_resto m ON o.id_menu = m.id_menu 
        ORDER BY h.id_history DESC`, 
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("History Orders: ", res);
            result(null, res);
        }
    );
};

HistoryOrder.filterByPaymentMethod = (payment_method, result) => {
    sql.query(`
        SELECT h.id_history, r.nama_resto, u.nama_lengkap, m.nama_menu, 
        o.metode_pembayaran, o.status, h.created_at FROM history_order h 
        INNER JOIN order_menu o ON h.id_order = o.id_order 
        INNER JOIN resto r ON o.id_resto = r.id_resto 
        INNER JOIN user u ON o.id_user = u.id_user 
        INNER JOIN menu_resto m ON o.id_menu = m.id_menu 
        WHERE o.metode_pembayaran = '${payment_method}' ORDER BY h.id_history DESC`, 
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("History Orders: ", res);
            result(null, res);
        }
    );
};

HistoryOrder.filterByStatus = (status, result) => {
    sql.query(`
        SELECT h.id_history, r.nama_resto, u.nama_lengkap, m.nama_menu, 
        o.metode_pembayaran, o.status, h.created_at FROM history_order h 
        INNER JOIN order_menu o ON h.id_order = o.id_order 
        INNER JOIN resto r ON o.id_resto = r.id_resto 
        INNER JOIN user u ON o.id_user = u.id_user 
        INNER JOIN menu_resto m ON o.id_menu = m.id_menu 
        WHERE o.status = '${status}' ORDER BY h.id_history DESC`,
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("History Orders: ", res);
            result(null, res);
        }
    );
}

HistoryOrder.filterByStatusAndPayMethod = (payment_method, status, result) => {
    sql.query(`
        SELECT h.id_history, r.nama_resto, u.nama_lengkap, m.nama_menu, 
        o.metode_pembayaran, o.status, h.created_at FROM history_order h 
        INNER JOIN order_menu o ON h.id_order = o.id_order 
        INNER JOIN resto r ON o.id_resto = r.id_resto 
        INNER JOIN user u ON o.id_user = u.id_user 
        INNER JOIN menu_resto m ON o.id_menu = m.id_menu 
        WHERE o.metode_pembayaran = '${payment_method}' AND o.status = '${status}' ORDER BY h.id_history DESC`,
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("History Orders: ", res);
            result(null, res);
        }
    );
}
module.exports = HistoryOrder;