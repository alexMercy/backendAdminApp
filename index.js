const express = require("express");
const app = express();
const port = 3300;
const db = require('./services/db');
const cors = require('cors');
const createRouter = require("./routes");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

const dbConfig = ["todos", "users", "posts", "comments", "albums", "photos"];
dbConfig.forEach(table => app.use(`/${table}`, createRouter(table)));

app.get("/", (req, res) => {
    db.query("SHOW TABLES").then(r => res.json(r));
});


app.listen(port,'localhost' , () => (
    console.log(`Example app listening at http://localhost:${port}`)));


