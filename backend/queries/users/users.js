const db = require("../../db/db");

module.exports = {    
    isUserExisting: async (req, res, next) => {
        const { id } = req.params;
        try {
            if(id) {
                await db.one("Select * FROM users where id=$1", id);
                next();
            } else {
                throw { error: 400, error: "No ID supplied"}
            }
        } catch (error) {
            if(error.received === 0) {
                next({ status: 404, error: `User ID: ${id} doesn't exist` });
            } else {
                next(error);
            }
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            let users = await db.any(
                `SELECT * FROM USERS`
            )

            if(users.length) {
                res.status(200).json({
                    status: "OK",
                    users,
                    message: "Retrieved all users."
                })
            } else {
                throw { status: 404, error: "No users found"}
            }
        } catch (error) {
            next(error);
        }
    },

    getUserByUsername: async (req, res, next) => {
        try{
            const { username } = req.params;
            const { userProfile } = req.query;
            let user = await db.any(
                `SELECT * FROM users
                WHERE username=$1`, username
            )

            if(user.length) {
                if(userProfile) {
                    res.status(200).json({
                        status: "OK",
                        user: user[0],
                        message: "Successfuly retrieved user"
                    })
                } else {
                    throw { status: 409, error: "User with that username exists" }
                }
            } else {
                res.status(200).json({
                    status: "OK",
                    message: "No user exists with that username"
                })
            }
        } catch (error) {
            next(error)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            let user = await db.one(
                `SELECT * FROM users
                WHERE id=$1`, id
            )
            res.status(200).json({
                status: "OK",
                user,
                message: "Retrieved user."
            })
        } catch (error) {
            next(error);
        }
    },

    getUsersPosts: async (req, res, next) => {
        try {
            const { username } = req.params;

            let userPosts = await db.any(
                `SELECT users.username, users.full_name, users.profile_pic, full_posts.*
                FROM (
                    SELECT p_l.id, p_l.poster_id, p_l.body, p_l.created_at, p_l.is_retweet,
                    p_l.retweeter_user, p_l.image, array_remove(ARRAY_AGG(tags.name), NULL) AS tags,
                    COUNT(p_l.liker_id) AS like_count
                    FROM (
                        SELECT posts.*, likes.liker_id
                        FROM posts
                        LEFT JOIN likes ON likes.post_id = posts.id
                        GROUP BY posts.id, likes.liker_id
                    ) AS p_l
                    LEFT JOIN tags ON tags.post_id = p_l.id
                    GROUP BY p_l.id, p_l.poster_id, p_l.body, p_l.created_at, 
                    p_l.is_retweet, p_l.retweeter_user, p_l.image
                    ORDER BY created_at DESC
                ) AS full_posts
                JOIN users ON users.id = full_posts.poster_id
                WHERE users.username=$1
                ORDER BY full_posts.id DESC;`, username
            )

            if(userPosts.length) {
                res.status(200).json({
                    status: "OK",
                    userPosts,
                    message: "Retrieved all posts by " + username
                })
            } else {
                throw { status: 404, error: "User has no posts." }
            }
            
        } catch(error) {
            if(error.received === 0) {
                res.status(404).json({
                    status: 404,
                    error: `User doesn't exist`
                })
            } else {
                next(error);
            }
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { 
                id, email, full_name, username, profile_pic
            } = req.body;

            let user = await db.one(
                `INSERT INTO users (id, email, full_name, username, profile_pic)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`, [id, email, full_name, username, profile_pic]
            );

            res.status(200).json({
                status: "OK",
                user,
                message: "Created user."
            })
        } catch(error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                full_name, username
            } = req.body;

            const { id } = req.params;

            let user = {};

            if(full_name) {
                let updated = await db.one(
                    `UPDATE users
                    SET full_name=$1
                    WHERE id=$2 RETURNING *`, [full_name, id]
                );
                user = {
                    ...updated
                }
            }

            if(username) {
                let updated = await db.one(
                    `UPDATE users
                    SET username=$1
                    WHERE id=$2 RETURNING *`, [username, id]
                );
                user = {
                    ...updated
                }
            }

            res.status(200).json({
                status: "OK",
                user,
                message: "Successfully updated user"
            })
        } catch(error) {
            next(error);
        }
    }
}