import { Response, Request, NextFunction } from "express";

interface Error {
  status?: number;
  name?: string;
  message?: string;
  stack?: string;
}

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Whoops!! something went wrong";
  res.status(status).json({ status, message });
};

export default errorMiddleware;
