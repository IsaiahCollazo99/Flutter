const users = require("express").Router();
const {
    getAllUsers
} = require("../../queries/users/users");

users.get("/", getAllUsers);

module.exports = users;