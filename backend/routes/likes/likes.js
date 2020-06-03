const likes = require("express").Router();

const {
    createLike,
    deleteLike
} = require("../../queries/likes/likes");

likes.post("/", createLike);
likes.delete("/", deleteLike);

module.exports =  likes;
