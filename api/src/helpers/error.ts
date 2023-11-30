import { Response } from "express";

const getError = (error, res: Response) => {
  if (error.meta) {
    return res.status(400).json({
      error: error.meta.target,
    });
  }
  if (error.error) {
    return res.status(400).json({
      error: error.error,
    });
  }

  return res.status(400).json({
    error: error,
  });
};

export { getError };
