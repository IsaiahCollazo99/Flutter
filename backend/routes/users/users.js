const users = require("express").Router();
const {
    isUserExisting,
    getAllUsers,
    getUserById,
    createUser
} = require("../../queries/users/users");

users.get("/", getAllUsers);
users.get("/:id", isUserExisting, getUserById)
users.post("/", createUser);

module.exports = users;