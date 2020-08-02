const sql = require("./db.js");

const Booking = function(book) {
    this.id_user = book.id_user;
    this.jumlah_orang = book.jumlah_orang;
    this.tanggal_book = book.tanggal_book;
    this.jam = book.jam;
};

Booking.create = (newBook, result) => {
    sql.query("INSERT INTO booking SET ?", newBook, (err, res) => {
        if(err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log({
          "success": "booking successfully created",
        });

        result(null, {
          "success": "booking successfully created",
        });
    });
};

Booking.getAll = result => {
    sql.query(`SELECT b.id_booking, u.nama_lengkap, b.jumlah_orang, 
    b.tanggal_book, b.jam, b.session, b.created_at FROM booking b 
    INNER JOIN user u ON b.id_user = u.id_user ORDER BY b.tanggal_book DESC`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
  
        console.log("Booking: ", res);
        result(null, res);
    });
};

Booking.updateById = (id, booking, result) => {
    sql.query(
        `UPDATE booking SET jumlah_orang = ?, tanggal_book = ?,
        jam = ?, status = ? WHERE id_booking = ?`,
        [booking.jumlah_orang, booking.tanggal_book, booking.jam, booking.status, id],
        (err, res) => {
            if(err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }

            if (res.affectedRows == 0) {
              result({ kind: "not_found" }, null);
              return;
            }

            console.log("updated booking: ", { id_order: id, ...booking });
            result(null, { id_order: id, ...booking });
        }
    );
};


Booking.filterByIdUser = (id, result) => {
    sql.query(`SELECT b.id_booking, b.id_user, u.nama_lengkap, 
    b.jumlah_orang, b.tanggal_book, b.jam, 
    b.session, b.created_at FROM booking b 
    INNER JOIN user u ON b.id_user = u.id_user where b.id_user = ${id} 
    ORDER BY b.tanggal_book DESC`, 
    (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`Booking by id ${id}:`, res);
        result(null, res);
    });
};

function get_last_id_booking(callback) {
    const query = `SELECT id_booking FROM booking ORDER BY id_booking DESC LIMIT 1`;
    sql.query(query, function(err, result) {
        if (err){ 
            throw err;
        }

        return callback(result[0].id_booking);
    });
}

module.exports = {
    Booking,
    get_last_id_booking
};

