import { NextFunction, Request, Response } from "express";
import UserStore from "../models/user";
import config from "../config";
import jwt from "jsonwebtoken";

const userModel = new UserStore();

export const create = async (req: Request, res: Response) => {
  try {
    const user = await userModel.create(req.body);
    var token = jwt.sign({ user: user }, config.jwToken as unknown as string);
    res.json({
      status: "success",
      data: { ...user },
      token: { token },
      message: "user created successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userModel.getAll();
    res.json({
      status: "success",
      data: { ...users },
      message: "displaying all users successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.getSingleUser(req.params.id);
    res.json({
      status: "success",
      data: { ...user },
      message: "displaying single user",
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.updateSingleUser(req.body);
    res.json({
      status: "success",
      data: { ...user },
      message: "user updated successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.deleteSingleUser(req.params.id);
    res.json({
      status: "success",
      data: { ...user },
      message: "user deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    console.log(user);
    const token = jwt.sign({ user }, config.jwToken as string);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "email and password does not match",
      });
    }
    return res.json({
      status: "success",
      data: { ...user, token },
      message: "user logged in successfully",
    });
  } catch (err) {
    throw new Error(`unable to authenticate: ${err}`);
  }
};
