import { left, right, either, Either, mapLeft } from 'fp-ts/lib/Either'
import { Do } from 'fp-ts-contrib/lib/Do'

export type Env = { port: NonNullable<number>, timeboxAddress: NonNullable<string> }

export interface PortParseFailure {
  kind: 'PortFailure'
  input: string | undefined
}

export interface TimeboxAddressFailure {
  kind: 'TimeboxAddressFailure'
  input: string | undefined
}

export type ParseFailures = TimeboxAddressFailure | PortParseFailure

const tryInt = <E>(s : string | undefined, e: E) => (s === undefined || isNaN(parseInt(s))) ? left(e) : right(parseInt(s))
const tryRegex = <E>(regex: string, s: string | undefined, e: E) => s && RegExp(regex).test(s) ? right(s) : left(e)
const tryBtAddress = <E>(s : string | undefined, e: E) => tryRegex('([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2})', s, e)

export const parseEnv : Either<ParseFailures, Env> = Do(either)
  .bindL('port', () => mapLeft(e => e as ParseFailures)(tryInt(process.env.PORT, ({ kind: 'PortParseFailure', input: process.env.PORT }))))
  .bindL('timeboxAddress', () => mapLeft(e => e as ParseFailures)(tryBtAddress(process.env.TIMEBOX_ADDRESS, { kind: 'TimeboxAddressFailure', input: process.env.TIMEBOX_ADDRESS })))
  .return(({ port, timeboxAddress }) => ({ port, timeboxAddress }))
