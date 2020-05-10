import express from 'express'
import { TaskEither, taskify } from 'fp-ts/lib/TaskEither'

export interface ExpressListenError {
  kind: 'ExpressListenError'
  error: any
}

const _listen = (app: express.Express,
                 port : string,
                 cb : ((err : ExpressListenError | undefined, ok: void) => void)) =>
  app.listen(port, error => error ? cb({ kind: 'ExpressListenError', error }, undefined) : cb(undefined, undefined))
export const listen : (app: express.Express, port : string) => TaskEither<ExpressListenError, void> = taskify(_listen)
