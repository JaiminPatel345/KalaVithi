import jwt from "jsonwebtoken";
import { AppError } from "../errors/helpers.js";
const checkTokens = (req, res, SECRET) => {
    const bearerHeader = req.headers.authorization;
    // Check if the authorization header is present
    if (!bearerHeader) {
        throw new AppError("No token provided", 401);
    }
    // Extract the token from the header
    const token = bearerHeader.split(" ")[1];
    if (!token) {
        throw new AppError("Invalid token format", 401);
    }
    // Return a Promise to handle the asynchronous verification
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                reject(new AppError("Invalid or expired token", 403));
            }
            else {
                console.log("decord : ", decoded);
                resolve(decoded.userId || decoded.uuid);
            }
        });
    });
};
export default checkTokens;
//# sourceMappingURL=checkTokens.js.map