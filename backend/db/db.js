const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/flutter_db");

module.exports = db;