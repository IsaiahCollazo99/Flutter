const users = require("express").Router();
const {
    isUserExisting,
    getAllUsers,
    getUserByUsername,
    getUserById,
    getUsersPosts,
    createUser,
    updateUser
} = require("../../queries/users/users");

users.get("/", getAllUsers);
users.get("/username/:username", getUserByUsername)
users.get("/:id", isUserExisting, getUserById)
users.get("/:username/posts", getUsersPosts);
users.post("/", createUser);
users.patch("/:id", isUserExisting, updateUser)

module.exports = users;