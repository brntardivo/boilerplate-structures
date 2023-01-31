import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "src/config/environment";

export function JWTDecrypt(req: Request, res: Response, next: NextFunction) {
  const secret = JWT_SECRET;
  const token = req.headers.authorization;

  try {
    if (!token) {
      throw new Error("unauthorized");
    }

    const decoded = verify(token, secret);
    req.user = decoded;

    return next();
  } catch (e: any) {
    res.status(401).send(e.message);
    return;
  }
}
