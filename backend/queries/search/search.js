const db = require("../../db/db");

module.exports = {
    tagSearch: async (req, res, next) => {
        try {
            const { search } = req.query;
    
            const posts = await db.any(`
                SELECT users.username, users.full_name, full_posts.*
                FROM (
                    SELECT posts.*, array_remove(ARRAY_AGG(tags.name), NULL) as tags
                    FROM posts
                    LEFT JOIN tags on tags.post_id = posts.id
                    WHERE tags.name=$1
                    GROUP BY posts.id
                    ORDER BY created_at DESC
                ) AS full_posts
                JOIN users on users.id = full_posts.poster_id
            `, search);

            if(posts.length) {
                res.status(200).json({
                    status: "OK",
                    posts,
                    message: "Retrieved all tags matching the query."
                })
            } else {
                throw {status: 404, error: "No posts found."}
            }
    
        } catch (error) {
            next(error);
        }
    },

    userSearch: async (req, res, next) => {
        try {
            const { search } = req.query;

            const users = await db.any(
                `SELECT * FROM users
                WHERE username LIKE $1`, ['%' + search + '%']
            );

            if(users.length) {
                res.status(200).json({
                    status: "OK",
                    users,
                    message: "Retrieved all users matching the query."
                })
            } else {
                throw { status: 404, error: "No users found." }
            }
        } catch (error) {
            next(error);
        }
    }
} 