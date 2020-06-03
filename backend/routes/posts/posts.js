const posts = require("express").Router();

const { 
    isPostExisting,
    getAllPosts, 
    getPostById, 
    getPostLikers,
    createPost, 
    deletePost
} = require( '../../queries/posts/posts');

posts.get("/", getAllPosts);
posts.get("/:id", isPostExisting, getPostById);
posts.get("/:id/likes", isPostExisting, getPostLikers);
posts.post("/", createPost);
posts.delete("/:id", isPostExisting, deletePost);

module.exports = posts;