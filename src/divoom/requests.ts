import { DisplayText } from 'node-divoom-timebox-evo'
import { BluetoothSerialPort } from 'bluetooth-serial-port'
import { write, CantWriteBuffer } from './bluetooth'
import { taskEither, TaskEither } from 'fp-ts/lib/TaskEither'
import { array } from 'fp-ts/lib/Array'

export const sendText = (btSerial: BluetoothSerialPort, text : string) : TaskEither<CantWriteBuffer, void[]> =>
  array.sequence(taskEither)(new DisplayText({ text })
    .messages
    .asBinaryBuffer()
    .map((b : Buffer) => write(btSerial, b)))
