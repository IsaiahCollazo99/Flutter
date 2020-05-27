const users = require("express").Router();
const {
    isUserExisting,
    getAllUsers,
    getUserByUsername,
    getUserById,
    getUsersPosts,
    createUser
} = require("../../queries/users/users");

users.get("/", getAllUsers);
users.get("/username/:username", getUserByUsername)
users.get("/:id", isUserExisting, getUserById)
users.get("/:username/posts", getUsersPosts);
users.post("/", createUser);

module.exports = users;