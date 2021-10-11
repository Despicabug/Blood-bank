const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./src/models');

db.sequelize.sync().then(() => {
    console.log('Drop and re-sync db.');
});

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to bezkoder application.' });
});

require('./src/routes/donor.route')(app);
require('./src/routes/inventory.route')(app);
require('./src/routes/request.route')(app);
require('./src/routes/patient.route')(app);
require('./src/routes/guardian.route')(app);
require('./src/routes/history.route')(app);
require('./src/routes/login.route')(app);

require('./src/routes/auth.route')(app);
require('./src/routes/user.route')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
});