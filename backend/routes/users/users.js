const users = require("express").Router();
const {
    isUserExisting,
    getAllUsers,
    getUserByUsername,
    getUserById,
    createUser
} = require("../../queries/users/users");

users.get("/", getAllUsers);
users.get("/username/:username", getUserByUsername)
users.get("/:id", isUserExisting, getUserById)
users.post("/", createUser);

module.exports = users;