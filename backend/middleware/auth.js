const admin = require("../firebase");

const checkFirebaseToken = async (req, res, next) => {
    try {
        const token = req.headers.authtoken;
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        req.user_id = uid;
        next();
    } catch (error) {
        next({status: 401, message: "No Authenticated User!"});
    }
}

module.exports = {
    checkFirebaseToken
};