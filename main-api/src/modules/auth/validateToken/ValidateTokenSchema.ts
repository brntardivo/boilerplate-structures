import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export class ValidateTokenSchema {
  static validate(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = z.object({
        token: z.string().uuid(),
      });

      schema.parse(req.params);

      return next();
    } catch (error: any) {
      let err = error;

      if (error instanceof ZodError) {
        err = error.format();
      }

      return res.status(422).json({ message: "validation error", err });
    }
  }
}
