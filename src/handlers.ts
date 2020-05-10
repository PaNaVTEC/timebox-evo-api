import { Request, Response } from 'express'
import { BluetoothSerialPort } from 'bluetooth-serial-port'
import { sendText } from './divoom/requests'
import { fold } from 'fp-ts/lib/TaskEither'
import { task } from 'fp-ts/lib/Task'
import { CantWriteBuffer } from './divoom/bluetooth'

type SendTextResponse = { text: string, err?: CantWriteBuffer }

export const textHandler = (btSerial : BluetoothSerialPort) => (req: Request, res: Response<SendTextResponse>) => {
  const reqHandler = fold(
    (err : CantWriteBuffer) => task.of(res.send({ text: req.query.text as string, err })),
    () => task.of(res.send({ text: req.query.text as string }))
  )(sendText(btSerial, req.query.text as string))

  reqHandler()
}
