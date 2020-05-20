const db = require("../../db/db")

module.exports = {
    isPostExisting: async (req, res, next) => {
        const getId = req.params.id;
        const postId = req.body.post_id;
        const id = getId ? getId : postId;
        try {
            if(id) {
                next();
            } else {
                let post = await db.one("Select * FROM posts where id=$1", id);
                next();
            }
        } catch (error) {
            if(error.received === 0) {
                res.status(404).json({
                    status: 404,
                    error: `Post ID: ${id} doesn't exist`
                })
            } else {
                next(error);
            }
        }
    },

    isTagSearch: async (req, res, next) => {
        try {
            const { search } = req.query;
            if(search) {
                const posts = await db.any(
                    `SELECT users.username, full_posts.*
                    FROM (
                        SELECT posts.*, array_remove(ARRAY_AGG(tags.name), NULL) as tags
                        FROM posts
                        LEFT JOIN tags on tags.post_id = posts.id
                        WHERE tags.name=$1
                        GROUP BY posts.id
                        ORDER BY created_at DESC
                    ) AS full_posts
                    JOIN users on users.id = full_posts.poster_id`, search
                );

                if(posts.length) {
                    res.status(200).json({
                        status: "Ok",
                        posts,
                        message: "Retrieved all posts."
                    });
                } else {
                    throw { status: 404, error: "No posts found." };
                }
            } else {
                next()
            }

        } catch (error) {
            next(error)
        }

    },

    getAllPosts: async (req, res, next) => {
        try {
            const posts = await db.any(
                `SELECT users.username, full_posts.*
                FROM (
                    SELECT posts.*, array_remove(ARRAY_AGG(tags.name), NULL) as tags
                    FROM posts
                    LEFT JOIN tags on tags.post_id = posts.id
                    GROUP BY posts.id
                    ORDER BY created_at DESC
                ) AS full_posts
                JOIN users on users.id = full_posts.poster_id`
            )

            if(posts.length) {
                res.json({
                    status: "Ok",
                    posts,
                    message: "Retrieved all posts."
                })
            } else {
                throw {status: 404, error: "No posts found."}
            }
        } catch (error) {
            next(error);
        }
    },
    
    getPostById: async (req, res, next) => {
        
    },
    
    createPost: async (req, res, next) => {
        
    },
    
    deletePost: async (req, res, next) => {
        
    },
    
    getPostTags: async (req, res, next) => {
        
    }
} 