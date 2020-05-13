import {BluetoothSerialPort} from 'bluetooth-serial-port'
import {TimeChannel} from 'node-divoom-timebox-evo'
import {Request} from 'express'

import {sendRequest} from '../divoom/requests'
import {defaultHandler} from './handler'

export default (btSerial: BluetoothSerialPort) => defaultHandler((_req: Request) => sendRequest(btSerial, new TimeChannel({showTime: true})))
