import { taskEither, TaskEither, bracket, mapLeft } from 'fp-ts/lib/TaskEither'
import { Do } from 'fp-ts-contrib/lib/Do'
import { BluetoothSerialPort } from 'bluetooth-serial-port'
import { findSerialPortChannel, connect, CantFindDevice, CantConnectDevice } from './bluetooth_bindings'

export type ConnectionProblems = CantConnectDevice | CantFindDevice

export const connectToTimebox = (timeboxAddress : string) : TaskEither<ConnectionProblems, BluetoothSerialPort> => {
  const serialPort = new BluetoothSerialPort()
  return Do(taskEither)
    .bindL('channel', () => mapLeft(e => e as ConnectionProblems)(findSerialPortChannel(serialPort, timeboxAddress)))
    .doL(({ channel }) => mapLeft(e => e as ConnectionProblems)(connect(serialPort, timeboxAddress, channel)))
    .return(() => serialPort)
}

export const disconnectFromTimebox
  = (btSerial : BluetoothSerialPort) => taskEither.of(btSerial.close())

export const useTimebox = <E>(timeboxAddress : string, use: ((serialPort: BluetoothSerialPort) => TaskEither<ConnectionProblems | E, void>)) : TaskEither<ConnectionProblems | E, void> =>
  bracket(
    mapLeft(e => e as ConnectionProblems | E)(connectToTimebox(timeboxAddress)),
    use,
  (serialPort : BluetoothSerialPort, _e : any) => {
    console.log('closing')
    return mapLeft(e => e as ConnectionProblems | E)(disconnectFromTimebox(serialPort))
  }
  )
