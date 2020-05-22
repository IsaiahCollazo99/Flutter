const db = require("../../db/db");

module.exports = {
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
    }
}