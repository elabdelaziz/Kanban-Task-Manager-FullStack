import { NextFunction, Request, Response } from "express";
import TaskStore from "../models/task";

const taskModel = new TaskStore();

export const create = async (req: Request, res: Response) => {
  try {
    const task = await taskModel.create(req.body);
    res.json({
      status: "success",
      data: { ...task },
      message: "task created successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserTasks = async (req: Request, res: Response) => {
  const colId = parseInt(req.params.id);
  try {
    const task = await taskModel.getUserTasks(colId);
    res.json({
      status: "success",
      data: { ...task },
      message: "task deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const task = await taskModel.deleteTask(id);
    res.json({
      status: "success",
      data: { ...task },
      message: "task deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
