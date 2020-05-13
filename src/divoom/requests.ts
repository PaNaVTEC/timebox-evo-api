import {TimeboxEvoRequest} from 'node-divoom-timebox-evo'
import {BluetoothSerialPort} from 'bluetooth-serial-port'
import {write, CantWriteBuffer} from './bluetooth_bindings'
import {map, taskEither, TaskEither} from 'fp-ts/lib/TaskEither'
import {array} from 'fp-ts/lib/Array'

export const sendRequest
  = (btSerial: BluetoothSerialPort, req: TimeboxEvoRequest) : TaskEither<CantWriteBuffer, void> =>
  _void(array.sequence(taskEither)(req.messages.asBinaryBuffer().map((b: Buffer) => write(btSerial, b))))

const _void = map(() => {})
