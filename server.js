const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RestoinApi." });
});

require('./app/routes/kategori-menu.routes')(app);
require('./app/routes/kategori-resto.routes')(app);
require('./app/routes/menu-resto.routes')(app);
require('./app/routes/rating-resto.routes')(app);
require('./app/routes/resto.routes')(app);
require('./app/routes/user.routes')(app);
const PORT = process.env.PORT || 3000;
// set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});