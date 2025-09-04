import express from "express";
import { UserZodSchema } from "../zod/zodSchema.ts";
import { z } from "zod";

export const zodValidationMiddleware =
  (schema: typeof UserZodSchema) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      req.body = await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({ message: "Erro no middleware" });
    }
  };
