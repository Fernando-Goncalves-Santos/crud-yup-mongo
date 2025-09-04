import express from "express";
import UserSchema from "../yup/yupSchema.ts";
import { ValidationError } from "yup";

export const validationMiddleware =
  (schema: typeof UserSchema) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      req.body = await schema.validate(req.body);
      return next();
    } catch (error) {
      if (error instanceof ValidationError)
        return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "deu erro" });
  };
