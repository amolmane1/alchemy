import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userServiceFirestore from "../services/userServiceFirestore";
import { SECRET } from "./config";
import { CustomRequest } from "./types";
import { isJwtPayload } from "./utils";
import { getAuth } from "firebase-admin/auth";

export const tokenExtractor = (
  request: CustomRequest,
  _response: Response,
  next: NextFunction
) => {
  const authorization = request.get("authorization");
  // console.log("authorization: ", authorization);
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

export const userExtractor = async (
  request: CustomRequest,
  _response: Response,
  next: NextFunction
) => {
  try {
    if (request.token) {
      const decodedToken = await getAuth().verifyIdToken(request.token);
      const user = await userServiceFirestore.getUser(decodedToken.uid);
      console.log("in userExtractor: ", user);
      request.user = user;
    }
    next();
  } catch (error) {
    console.log(error);
    // next(error); // Pass error to the error handling middleware
  }
};

export const unknownEndpoint = (
  _request: CustomRequest,
  response: Response
) => {
  response.status(404).send({ error: "unknown endpoint" });
};
