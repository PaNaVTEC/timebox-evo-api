import {BluetoothSerialPort} from 'bluetooth-serial-port'
import {DisplayText} from 'node-divoom-timebox-evo'
import {Request} from 'express'

import {sendRequest} from '../divoom/requests'
import {defaultHandler} from './handler'

export default (btSerial: BluetoothSerialPort) => defaultHandler((req: Request) => sendRequest(btSerial, new DisplayText({text: req.query.text as string})))
