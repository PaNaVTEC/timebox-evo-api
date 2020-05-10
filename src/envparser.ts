import { either, Either, fromNullable } from 'fp-ts/lib/Either'
import { Do } from 'fp-ts-contrib/lib/Do'

export type Env = { port: NonNullable<string>, timeboxAddress: NonNullable<string> }

export enum ParseFailures {
  Port,
  TimeboxAddress
}

export const parseEnv : Either<ParseFailures, Env> = Do(either)
  .bindL('port', () => fromNullable(ParseFailures.Port)(process.env.PORT))
  .bindL('timeboxAddress', () => fromNullable(ParseFailures.TimeboxAddress)(process.env.TIMEBOX_ADDRESS))
  .return(({ port, timeboxAddress }) => ({ port, timeboxAddress }))
