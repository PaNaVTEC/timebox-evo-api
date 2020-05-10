import express from 'express'
import {Do} from 'fp-ts-contrib/lib/Do'
import {fold, mapLeft, taskEither, fromEither, TaskEither} from 'fp-ts/lib/TaskEither'
import {task} from 'fp-ts/lib/Task'
import {BluetoothSerialPort} from 'bluetooth-serial-port'

import {textHandler} from './handlers'
import {parseEnv, ParseFailures} from './envparser'
import {connectToTimebox, ConnectionProblems} from './divoom/connection'
import {listen, ExpressListenError} from './express_bindings'

type AppError = ParseFailures | ConnectionProblems | ExpressListenError

const createExpressServer = (
  port: number,
  btSerial: BluetoothSerialPort,
): TaskEither<ExpressListenError, void> =>
  listen(express().get('/text', textHandler(btSerial)), port)

const withFailure = mapLeft(e => e as AppError)

const bootupExpress: TaskEither<AppError, void> = Do(taskEither)
  .bindL('env', () => withFailure(fromEither(parseEnv)))
  .bindL('btSerial', ({env}) => withFailure(connectToTimebox(env.timeboxAddress)))
  .doL(({env, btSerial}) => withFailure(createExpressServer(env.port, btSerial)))
  .return(() => {})

const app = fold(
  (err: AppError) => task.of(console.error(`Error booting up application: ${JSON.stringify(err)}`)),
  () => task.of(console.log('Bootup complete')),
)(bootupExpress)

app()
