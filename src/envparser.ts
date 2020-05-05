import { option, fromNullable, getOrElse, Option } from 'fp-ts/lib/Option'
import { Do } from 'fp-ts-contrib/lib/Do'

export type Env = { port: string, timeboxAddress: string }

export const parseEnv = () : Option<Env> => Do(option)
  .bindL('port', () => fromNullable(process.env.PORT))
  .bindL('timeboxAddress', () => fromNullable(process.env.TIMEBOX_ADDRESS))
  .return(({ port, timeboxAddress }) => ({ port, timeboxAddress }))
