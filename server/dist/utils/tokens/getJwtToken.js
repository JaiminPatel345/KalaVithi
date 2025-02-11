var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { client } from "../../redis/redis.js";
export const generateAccessToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = uuidv4();
    yield client.set(uuid, userId, {
        EX: 900 //15 min
    });
    return jwt.sign({ uuid }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15Minutes' });
});
export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '4Weeks' });
};
export const getTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield generateAccessToken(userId.toString());
    const refreshToken = generateRefreshToken(userId);
    return {
        accessToken,
        refreshToken
    };
});
//# sourceMappingURL=getJwtToken.js.map