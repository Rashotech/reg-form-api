import express, { Application } from 'express';
import path from 'path';
import error from './middleware/error';
import httpStatus from 'http-status';
import ApiError from './helpers/ApiError';

declare global {
    var __root: string
}

global.__root = path.join(__dirname);

// Routes
import { Routes } from './routes';

// Express App
const app:Application = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Set the view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(Routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });
  
  // convert error to ApiError, if needed
  app.use(error.errorConverter);
  
  // handle error
app.use(error.errorHandler);

export default app;

