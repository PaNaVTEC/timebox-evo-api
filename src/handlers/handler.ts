import {Request, Response} from 'express'
import {fold, TaskEither} from 'fp-ts/lib/TaskEither'
import {task} from 'fp-ts/lib/Task'

import {CantWriteBuffer} from '../divoom/bluetooth_bindings'

type DefaultResponse = {text: string; err?: CantWriteBuffer}

export const defaultHandler = (f: (req: Request) => TaskEither<CantWriteBuffer, void>) => (
  req: Request,
  res: Response<DefaultResponse>,
) => {
  const handler = fold(
    (err: CantWriteBuffer) => task.of(res.send({text: req.query.text as string, err})),
    () => task.of(res.send({text: req.query.text as string})),
  )(f(req))

  handler()
}
