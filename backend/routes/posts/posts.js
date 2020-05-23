const posts = require("express").Router();

const { 
    isPostExisting,
    getAllPosts, 
    getPostById, 
    createPost, 
    deletePost
} = require( '../../queries/posts/posts');

posts.get("/", getAllPosts);
posts.get("/:id", isPostExisting, getPostById);
posts.post("/", createPost);
posts.delete("/:id", isPostExisting, deletePost);

module.exports = posts;