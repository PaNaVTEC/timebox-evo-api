import express from 'express'
import { IO, io } from 'fp-ts/lib/IO'
import { Do } from 'fp-ts-contrib/lib/Do'
import { fold } from 'fp-ts/lib/Option'

import { rootHandler } from './handlers'
import { parseEnv, Env } from './envparser'

const envOrCrash : IO<Env> =
  fold(
    () => () => { throw new Error('Please execute the application with the correct arguments') },
    (env : Env) => io.of(env)
  )(parseEnv())

const createExpressServer = (env : Env) : IO<void> => () => {
  const app = express()
  app.get('/', rootHandler(env.timeboxAddress))

  app.listen(env.port, (err) => {
    if (err) return console.error(err)
    return console.log(`Server is listening on ${env.port}`)
  });
}

(Do(io)
  .bindL('env', () => envOrCrash)
  .bindL('', ({ env }) => createExpressServer(env))
  .done()
)()
