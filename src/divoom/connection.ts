import {taskEither, TaskEither, mapLeft} from 'fp-ts/lib/TaskEither'
import {Do} from 'fp-ts-contrib/lib/Do'
import {BluetoothSerialPort} from 'bluetooth-serial-port'
import {
  findSerialPortChannel,
  connect,
  CantFindDevice,
  CantConnectDevice,
} from './bluetooth_bindings'

export type ConnectionProblems = CantConnectDevice | CantFindDevice

const withFailure = mapLeft(e => e as ConnectionProblems)

export const connectToTimebox = (
  timeboxAddress: string,
): TaskEither<ConnectionProblems, BluetoothSerialPort> => {
  const serialPort = new BluetoothSerialPort()
  return Do(taskEither)
    .bindL('channel', () => withFailure(findSerialPortChannel(serialPort, timeboxAddress)))
    .doL(({channel}) => withFailure(connect(serialPort, timeboxAddress, channel)))
    .return(() => serialPort)
}

export const disconnectFromTimebox = (btSerial: BluetoothSerialPort) =>
  taskEither.of(btSerial.close())
