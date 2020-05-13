import express from 'express'
import textHandler from './text'
import timeHandler from './time'
import { BluetoothSerialPort } from 'bluetooth-serial-port'

export const handlers = (express: express.Express, btSerial: BluetoothSerialPort) =>
  express
    .post('/text', textHandler(btSerial))
    .post('/time', timeHandler(btSerial))
