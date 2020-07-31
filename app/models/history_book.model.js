const sql = require("./db.js");

const HistoryBook = function(history) {
    this.id_book = history.id_book;
};

HistoryBook.create = (newHistory, result) => {
    sql.query("INSERT INTO history_book SET ?", newHistory, (err, res) => {
        if(err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log({
          "success": "history_book successfully created"
        });
        
        result(null, {
          "success": "history_book successfully created",
        });
    });
};

HistoryBook.getAll = result => {
    sql.query(`
    SELECT h.id_history, u.id_user, u.nama_lengkap, b.jumlah_orang, 
    b.tanggal_book, b.jam, b.status, b.session, b.created_at FROM history_book h 
    INNER JOIN booking b ON h.id_book = b.id_booking 
    INNER JOIN user u ON u.id_user = b.id_user 
    ORDER BY b.tanggal_book DESC`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("History Booking: ", res);
        result(null, res);
    });
};

HistoryBook.filterByIdUser = (id_user, result) => {
    sql.query(`
        SELECT h.id_history, u.id_user, u.nama_lengkap, b.jumlah_orang, b.tanggal_book, 
        b.jam, b.status, b.session, b.created_at FROM history_book h 
        INNER JOIN booking b ON h.id_book = b.id_booking INNER JOIN user u ON u.id_user = b.id_user 
        WHERE u.id_user = ${id_user} ORDER BY b.tanggal_book DESC`,
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("History Booking: ", res);
            result(null, res);
        }
    );
};

HistoryBook.filterByStatus = (status, result) => {
    sql.query(`
        SELECT h.id_history, u.id_user, u.nama_lengkap, b.jumlah_orang, b.tanggal_book, 
        b.jam, b.status, b.session, b.created_at FROM history_book h 
        INNER JOIN booking b ON h.id_book = b.id_booking INNER JOIN user u ON u.id_user = b.id_user 
        WHERE b.status = "${status}" ORDER BY b.tanggal_book DESC`,
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("History Booking: ", res);
            result(null, res);
        }
    );
};

HistoryBook.filterByIdUserAndStatus = (id_user, status, result) => {
    sql.query(`
        SELECT h.id_history, u.id_user, u.nama_lengkap, b.jumlah_orang, b.tanggal_book, 
        b.jam, b.status, b.session, b.created_at FROM history_book h 
        INNER JOIN booking b ON h.id_book = b.id_booking INNER JOIN user u ON u.id_user = b.id_user 
        WHERE u.id_user = ${id_user} AND b.status = "${status}" ORDER BY b.tanggal_book DESC`,
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("History Booking: ", res);
            result(null, res);
        }
    );
}

module.exports = HistoryBook;