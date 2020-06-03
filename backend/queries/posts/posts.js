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
                `SELECT users.username, users.full_name, users.profile_pic, full_posts.*
                FROM (
                    SELECT p_l.id, p_l.poster_id, p_l.body, p_l.created_at, p_l.is_retweet,
                    p_l.retweeter_user, p_l.retweeted_id, array_remove(ARRAY_AGG(tags.name), NULL) AS tags, 
                    COUNT(p_l.liker_id) AS like_count
                    FROM (
                        SELECT posts.*, likes.liker_id
                        FROM posts
                        LEFT JOIN likes ON likes.post_id = posts.id
                        GROUP BY posts.id, likes.liker_id
                    ) AS p_l
                    LEFT JOIN tags ON tags.post_id = p_l.id
                    GROUP BY p_l.id, p_l.poster_id, p_l.body, p_l.created_at, p_l.is_retweet,
                    p_l.retweeter_user, p_l.retweeted_id
                ) AS full_posts
                JOIN users ON users.id = full_posts.poster_id
                ORDER BY full_posts.id DESC;`
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
                `SELECT users.username, users.full_name, users.profile_pic, full_posts.*
                FROM (
                    SELECT p_l.id, p_l.poster_id, p_l.body, p_l.created_at, p_l.is_retweet,
                    p_l.retweeter_user, p_l.retweeted_id, array_remove(ARRAY_AGG(tags.name), NULL) AS tags,
                    COUNT(p_l.liker_id) AS like_count
                    FROM (
                        SELECT posts.*, likes.liker_id
                        FROM posts
                        LEFT JOIN likes ON likes.post_id = posts.id
                        GROUP BY posts.id, likes.liker_id
                    ) AS p_l
                    LEFT JOIN tags ON tags.post_id = p_l.id
                    GROUP BY p_l.id, p_l.poster_id, p_l.body, p_l.created_at, p_l.is_retweet,
                    p_l.retweeter_user, p_l.retweeted_id
                ) AS full_posts
                JOIN users ON users.id = full_posts.poster_id
                WHERE full_posts.id=$1
                ORDER BY full_posts.id DESC;`, id
            )

            res.status(200).json({
                status: "OK",
                post,
                message: "Retrieved post at id " + id
            })
            
        } catch (error) {
            next(error);
        }
    },

    getPostLikers: async (req, res, next) => {
        try {
            const { id } = req.params;
            const likers = await db.any(`
                SELECT liker_id 
                FROM likes
                WHERE post_id=$1;`, id
            )

            res.status(200).json({
                status: "OK",
                likers,
                message: "Retrieved the ID of all likers from Post" + id
            })
        } catch(error) {
            next(error);
        }
    },
    
    createPost: async (req, res, next) => {
        try {
            const {
                poster_id,
                body,
                tags,
                created_at,
                is_retweet,
                retweeter_user, 
                retweeted_id
            } = req.body;

            if(is_retweet) {
                const retweetCheck = await db.any(
                    `SELECT * FROM posts
                     WHERE retweeter_user=$1 AND retweeted_id=$2`, [retweeter_user, retweeted_id]
                )

                if(retweetCheck) {
                    throw { status: 409, error: "User already reposted" }
                }
            }

            const post = await db.one(
                `INSERT INTO posts (poster_id, body, created_at, is_retweet, retweeter_user, retweeted_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *`, [poster_id, body, created_at, is_retweet, retweeter_user, retweeted_id]
            )

            if(tags) {
                tags.map(async (tag) => {
                    return await db.one(
                        `INSERT INTO tags (post_id, name)
                        VALUES ($1, $2)
                        RETURNING *`, [post.id, tag.toLowerCase()]
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