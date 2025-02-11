import {IMiddleware} from "../../types/common.types.js";
import {client} from "../../redis/redis.js";
import {AppError} from "../errors/helpers.js";
import {formatResponse} from "../formatResponse.js";
import checkTokens from "../tokens/checkTokens.js";

export const verifyToken: IMiddleware['verifyToken'] = async (req, res, next) => {
  try {

    const uuid = await checkTokens(req, res, process.env.JWT_ACCESS_SECRET as string)

    //get from redis
    const userId = await client.get(uuid)

    if (!userId) {
      throw new AppError('Invalid token', 401)
    }

    //TODO:Remove in production
    console.log(userId)
    req.userId = userId;
    next();

  } catch (error: any) {

    //TODO:Remove in production
    console.log("error in validate token", error)
    res.status(error.statusCode || 500).json(formatResponse(false, error.message || "Server error during authentication"));

  }
}