import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/users";
import { CustomRequest } from "./types";
import { isJwtPayload } from "./utils";

export const tokenExtractor = (
  request: CustomRequest,
  _response: Response,
  next: NextFunction
) => {
  const authorization = request.get("authorization");
  console.log(authorization);
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

export const userExtractor = async (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  if (request.token) {
    const decodedToken = await jwt.verify(request.token, "fullstack");
    console.log(decodedToken);
    if (!isJwtPayload(decodedToken) || !decodedToken.id) {
      response.status(401).json({ error: "Invalid token" });
    } else {
      const user = await UserModel.findById(decodedToken.id);
      request.user = JSON.parse(JSON.stringify(user));
    }
  }
  next();
};
