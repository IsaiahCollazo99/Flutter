const db = require("../../db/db");

module.exports = {
    tagSearch: async (req, res, next) => {
        try {
            const { search } = req.query;
    
            const posts = await db.any(`
                SELECT users.username, users.full_name, users.profile_pic, full_posts.*
                FROM (
                    SELECT p_l.id, p_l.poster_id, p_l.body, p_l.created_at, p_l.is_retweet, 
                    p_l.retweeter_user, p_l.retweeted_id, p_l.image, array_remove(ARRAY_AGG(tags.name), NULL) AS tags,             COUNT(p_l.liker_id) AS like_count
                    FROM (
                        SELECT posts.*, likes.liker_id
                        FROM posts
                        LEFT JOIN likes ON likes.post_id = posts.id
                        GROUP BY posts.id, likes.liker_id
                    ) AS p_l
                    LEFT JOIN tags ON tags.post_id = p_l.id
                    GROUP BY p_l.id, p_l.poster_id, p_l.body, p_l.created_at, p_l.is_retweet, 
                    p_l.retweeter_user, p_l.retweeted_id, p_l.image
                    ORDER BY created_at DESC
                ) AS full_posts
                JOIN users ON users.id = full_posts.poster_id
                WHERE $1 = ANY(full_posts.tags)
                ORDER BY full_posts.id DESC;
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
    },

    searchAll: async (req, res, next) => {
        try {
            const { search } = req.query;

            const users = await db.any(
                `SELECT * FROM users
                WHERE username LIKE $1`, ['%' + search + '%']
            );

            const posts = await db.any(`
                SELECT users.username, users.full_name, users.profile_pic, full_posts.*
                FROM (
                    SELECT p_l.id, p_l.poster_id, p_l.body, p_l.created_at, p_l.is_retweet, 
                    p_l.retweeter_user, p_l.retweeted_id, p_l.image, array_remove(ARRAY_AGG(tags.name), NULL) AS tags,             COUNT(p_l.liker_id) AS like_count
                    FROM (
                        SELECT posts.*, likes.liker_id
                        FROM posts
                        LEFT JOIN likes ON likes.post_id = posts.id
                        GROUP BY posts.id, likes.liker_id
                    ) AS p_l
                    LEFT JOIN tags ON tags.post_id = p_l.id
                    GROUP BY p_l.id, p_l.poster_id, p_l.body, p_l.created_at, p_l.is_retweet, 
                    p_l.retweeter_user, p_l.retweeted_id, p_l.image
                    ORDER BY created_at DESC
                ) AS full_posts
                JOIN users ON users.id = full_posts.poster_id
                WHERE full_posts.body LIKE $2 OR lower($1) = ANY(full_posts.tags) OR full_posts.retweeter_user=$3
                ORDER BY full_posts.id DESC;
            `, [search.toLowerCase(),  '%' + search + '%', search]);

            if(posts.length || users.length) {
                res.status(200).json({
                    status: "OK",
                    posts,
                    users,
                    message: "Retrieved all results matching the query."
                })

            } else {
                throw {status: 404, error: "No results found."}
            }
            
        } catch (error) {
            next(error);
        }
    }
} 