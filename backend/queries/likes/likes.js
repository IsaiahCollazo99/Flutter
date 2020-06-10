const db = require("../../db/db");

module.exports = {
    createLike: async (req, res, next) => {
        try {
            const { liker_id, post_id } = req.body;
            let like = await db.one(`
             INSERT INTO likes(liker_id, post_id)
             VALUES($1, $2) RETURNING *`, [liker_id, post_id]);

            res.status(200).json({
                status: "OK",
                like,
                message: "Successfully posted like."
            })
        } catch(error) {
            next(error);
        }
    },

    deleteLike: async (req, res, next) => {
        try {
            const { liker_id, post_id } = req.query;
            let like = await db.one(`
             DELETE FROM likes
             WHERE liker_id=$1 AND post_id=$2`, [liker_id, post_id]);

            res.status(200).json({
                status: "OK",
                like,
                message: "Successfully deleted like."
            })
        } catch(error) {
            next(error);
        }
    },

}