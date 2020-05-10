import express from 'express'
import { Do } from 'fp-ts-contrib/lib/Do'
import { fold, mapLeft, taskEither, fromEither, TaskEither } from 'fp-ts/lib/TaskEither'
import { task } from 'fp-ts/lib/Task'
import { BluetoothSerialPort } from 'bluetooth-serial-port'

import { textHandler } from './handlers'
import { parseEnv, ParseFailures } from './envparser'
import { connectToTimebox, ConnectionProblems } from './divoom/connection'
import { listen, ExpressListenError } from './express'

type AppError = ParseFailures | ConnectionProblems | ExpressListenError

const createExpressServer = (port : string, btSerial : BluetoothSerialPort) : TaskEither<ExpressListenError, void> =>
  listen(express().get('/text', textHandler(btSerial)), port)

const bootupExpress : TaskEither<AppError, void> = Do(taskEither)
  .bindL('env', () => mapLeft(e => e as AppError)(fromEither(parseEnv)))
  .bindL('btSerial', ({ env }) => mapLeft(e => e as AppError)(connectToTimebox(env.timeboxAddress)))
  .doL(({ env, btSerial }) => mapLeft(e => e as AppError)(createExpressServer(env.port, btSerial)))
  .return(() => {})

const app = fold(
  (err: AppError) => task.of(console.error(`Error booting up application: ${JSON.stringify(err)}`)),
  () => task.of(console.log('Bootup complete'))
)(bootupExpress)

app()
