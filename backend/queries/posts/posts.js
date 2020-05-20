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

    getAllPosts: async (req, res, next) => {
        
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