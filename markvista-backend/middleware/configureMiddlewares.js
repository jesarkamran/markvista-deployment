import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import useHeaders from "./useHeader.js";
import globalErrorHandler from "../controller/errorController.js";

export default function configureMiddlewares(app) {
  // JSON middlewares first
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Security and sanitization middlewares
  app.use(helmet());
  app.use(mongoSanitize());
  app.use(xss());

  // Logging
  app.use(morgan("dev"));

  // Headers middleware
  app.use(useHeaders);

  // Global error handling (typically should be last)
  app.use(globalErrorHandler);

  // Testing middleware
  app.use((req, _, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });
}
