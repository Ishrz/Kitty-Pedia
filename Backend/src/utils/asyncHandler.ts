import type { NextFunction, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const asyncHandler =
    (handler: AsyncHandler) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next)).catch((error: unknown) => {
            const message = error instanceof Error ? error.message : "Something went wrong";
            res.status(500).json({
                message,
                success: false
            })
        })
    }
