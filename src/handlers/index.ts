import express from 'express'
import textHandler from './text'
import timeHandler from './time'
import { BluetoothSerialPort } from 'bluetooth-serial-port'
import swaggerUi from 'swagger-ui-express'
import openApiDocumentation from '../openApiDocumentation'

export const handlers = (express: express.Express, btSerial: BluetoothSerialPort) =>
  express
    .post('/text', textHandler(btSerial))
    .post('/time', timeHandler(btSerial))
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation))
