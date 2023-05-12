import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwt.verify(token, config.jwToken as unknown as string)

    if (decoded) {
      next()
    } else {
      res.status(401)
    }
  } catch (error) {
    res.status(401)
    throw new Error(`Invalid token${error}`)
  }
}

export default verifyAuthToken
