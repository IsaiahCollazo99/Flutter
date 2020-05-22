const users = require("express").Router();
const {
    getAllUsers,
    createUser
} = require("../../queries/users/users");

users.get("/", getAllUsers);
users.post("/", createUser);

module.exports = users;