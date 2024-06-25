import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import http from "http";
import path from "path";
import connectDB from "./config/db";

import morgan from "morgan";
import errorMiddleware from "./middlewares/error";
import routes from "./routes";

const app: Application = express();

// Apply CORS middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, "..", "public")));
// Connect to Database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

app.use("/api/v1/", routes);

// Middleware for Errors
app.use(errorMiddleware);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

const port: any = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(
    `App is running on port: ${port}. Run with http://localhost:${port}`
  );
});
