const posts = require("express").Router();

const { 
    getAllPosts, 
    getPostById, 
    createPost, 
    deletePost, 
    getPostTags
} = require( '../../queries/posts/posts');

posts.get("/", getAllPosts);
posts.get("/:id", getPostById);
posts.post("/", createPost);
posts.delete("/:id", deletePost);

posts.get("/:id/tags", getPostTags);

module.exports = posts;