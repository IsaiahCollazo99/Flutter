const posts = require("express").Router();

const { 
    isPostExisting,
    getAllPosts, 
    getPostById, 
    createPost, 
    deletePost, 
    getPostTags
} = require( '../../queries/posts/posts');

posts.get("/", getAllPosts);
posts.get("/:id", isPostExisting, getPostById);
posts.post("/", createPost);
posts.delete("/:id", isPostExisting, deletePost);

posts.get("/:id/tags", isPostExisting, getPostTags);

module.exports = posts;