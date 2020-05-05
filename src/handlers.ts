import { Request, Response } from 'express'
import foo from './testingblue'

export const rootHandler = (timeboxAddress: string) => (_req: Request, res: Response) => {
  foo(timeboxAddress)
  res.send('API is working 🤓')
}
