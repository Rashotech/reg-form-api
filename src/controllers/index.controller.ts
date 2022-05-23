import catchAsync from "../helpers/catchAsync";
import { Request, Response } from "express";
import { updateAccountData } from "../services";
import httpStatus from 'http-status';

const home = catchAsync(async (req: Request, res: Response) => {
  res.render("index");
});

const updateAccount = catchAsync(async (req: Request, res: Response) => {
  await updateAccountData(req.body);
  res.status(httpStatus.OK).send({
      status: "success",
      message: "Account Information Updated Successfully"
  });
});

export { home, updateAccount };
