import { BluetoothSerialPort } from 'bluetooth-serial-port'
import { taskify, TaskEither } from 'fp-ts/lib/TaskEither'

export interface CantFindDevice { kind: 'CantFindDevice', timeboxAddress: string }

const _findSerialPortChannel =
  (serialPort: BluetoothSerialPort,
   timeboxAddress: string,
   callback : (err: CantFindDevice | undefined, channel: number) => void) =>
  serialPort.findSerialPortChannel(timeboxAddress, c => callback(undefined, c), () => callback({ kind: 'CantFindDevice', timeboxAddress }, 0))

export const findSerialPortChannel :
  (serialPort: BluetoothSerialPort,
   timeboxAddress: string) => TaskEither<CantFindDevice, number> = taskify(_findSerialPortChannel)

export interface CantConnectDevice { kind: 'CantConnectDevice' }

const _connect =
  (serialPort: BluetoothSerialPort,
   timeboxAddress: string,
   channel: number,
   callback: (err: CantConnectDevice | undefined, ok: void) => void) =>
  serialPort.connect(timeboxAddress, channel, () => callback(undefined, undefined), () => callback({ kind: 'CantConnectDevice'}, undefined))

export const connect :
  (serialPort: BluetoothSerialPort,
   timeboxAddress: string,
   channel: number) => TaskEither<CantConnectDevice, void> = taskify(_connect)

export interface CantWriteBuffer { kind: 'CantWriteBuffer', error: Error }

const _write =
  (serialPort: BluetoothSerialPort,
   b: Buffer,
   callback: (err: CantWriteBuffer | undefined, ok: void) => void) =>
  serialPort.write(b, error => error ? callback({kind: 'CantWriteBuffer', error }) : callback(undefined, undefined))

export const write :
  (serialPort: BluetoothSerialPort,
   b: Buffer) => TaskEither<CantWriteBuffer, void> = taskify(_write)
