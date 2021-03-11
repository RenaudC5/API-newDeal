const express = require('express');
const cors = require('cors');
const JsonDB = require('node-json-db');
const bodyParser = require('body-parser');

const port = 8080;
const db = new JsonDB.JsonDB("./data/data", true, true);
const country = require('./country/country')(db)

// Création du serveur
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/country', country)

function errorHandler(err, req, res, next) {
    console.error(err);
    if (err.isClientError) {
        res.status(403).send({ message: err.message });
    }
    else {
        res.status(500).send({ message: 'Something went wrong' });
    }
}
app.use(errorHandler);


app.listen(port, () => {
  console.log(`API listening on port ${port}!`)
});
