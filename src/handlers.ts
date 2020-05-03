import { Request, Response } from 'express'
import foo from './testingblue'

interface HelloResponse {
  hello: string
}

type HelloBuilder = (name: string) => HelloResponse

const helloBuilder: HelloBuilder = name => ({ hello: name })

export const rootHandler = (_req: Request, res: Response) =>
  res.send('API is working 🤓')

export const helloHandler = (req: Request, res: Response) => {
  const { params } = req
  const { name = 'World' } = params
  const response = helloBuilder(name)

  return res.json(response)
}

export const fooHandler = (_req: Request, _res: Response) => foo()
