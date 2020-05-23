const db = require("../../db/db")

module.exports = {
    isPostExisting: async (req, res, next) => {
        const getId = req.params.id;
        const postId = req.body.post_id;
        const id = getId ? getId : postId;
        try {
            if(id) {
                await db.one("Select * FROM posts where id=$1", id);
                next();
            } else {
                throw { error: 400, error: "No ID supplied"}
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

    getAllPosts: async (req, res, next) => {
        try {
            const posts = await db.any(
                `SELECT users.username, users.full_name, full_posts.*
                FROM (
                    SELECT posts.*, array_remove(ARRAY_AGG(tags.name), NULL) as tags
                    FROM posts
                    LEFT JOIN tags on tags.post_id = posts.id
                    GROUP BY posts.id
                    ORDER BY created_at DESC
                ) AS full_posts
                JOIN users on users.id = full_posts.poster_id;`
            )

            if(posts.length) {
                res.json({
                    status: "OK",
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
        try {
            const { id } = req.params;
            const post = await db.one(
                `SELECT users.username, users.full_name, full_posts.*
                FROM (
                    SELECT posts.*, array_remove(ARRAY_AGG(tags.name), NULL) as tags
                    FROM posts
                    LEFT JOIN tags on tags.post_id = posts.id
                    GROUP BY posts.id
                    ORDER BY created_at DESC
                ) AS full_posts
                JOIN users on users.id = full_posts.poster_id
                WHERE full_posts.id=$1;`, id
            )

            res.status(200).json({
                status: "OK",
                post,
                message: "Retrieved post at id " + id
            })
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    
    createPost: async (req, res, next) => {
        try {
            const {
                poster_id,
                body,
                tags,
                created_at
            } = req.body;

            const post = await db.one(
                `INSERT INTO posts (poster_id, body, created_at)
                VALUES ($1, $2, $3)
                RETURNING *`, [poster_id, body, created_at]
            )

            if(tags) {
                tags.map(async (tag) => {
                    return await db.one(
                        `INSERT INTO tags (post_id, name)
                        VALUES ($1, $2)
                        RETURNING *`, [post.id, tag]
                    )
                })
            }


            res.status(200).json({
                status: "OK",
                post,
                message: "Created post."
            })

        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    
    deletePost: async (req, res, next) => {
        try {
            const { id } = req.params;
            const post = await db.one(`
                DELETE FROM posts 
                WHERE id=$1
                RETURNING *
            `, id)

            res.status(200).json({
                status: "OK",
                post,
                message: "Deleted post."
            })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
} 