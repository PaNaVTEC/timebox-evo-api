import {left, right, either, Either, mapLeft} from 'fp-ts/lib/Either'
import {Do} from 'fp-ts-contrib/lib/Do'

export type Env = {
  port: NonNullable<number>
  timeboxAddress: NonNullable<string>
}

export interface PortParseFailure {
  kind: 'PortFailure'
  input: string | undefined
}
const PortParseFailure = (input: string | undefined) => ({kind: 'PortParseFailure', input})

export interface TimeboxAddressFailure {
  kind: 'TimeboxAddressFailure'
  input: string | undefined
}

const TimeboxAddressFailure = (input: string | undefined) => ({
  kind: 'TimeboxAddressFailure',
  input,
})

export type ParseFailures = TimeboxAddressFailure | PortParseFailure

const tryInt = <E>(s: string | undefined, e: E) =>
  s === undefined || isNaN(parseInt(s)) ? left(e) : right(parseInt(s))

const tryRegex = <E>(regex: string, s: string | undefined, e: E) =>
  s && RegExp(regex).test(s) ? right(s) : left(e)

const tryBtAddress = <E>(s: string | undefined, e: E) =>
  tryRegex(
    '([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2})',
    s,
    e,
  )

const withFailure = mapLeft(e => e as ParseFailures)

export const parseEnv: Either<ParseFailures, Env> = Do(either)
  .bindL('port', () => withFailure(tryInt(process.env.PORT, PortParseFailure(process.env.PORT))))
  .bindL('timeboxAddress', () =>
    withFailure(
      tryBtAddress(process.env.TIMEBOX_ADDRESS, TimeboxAddressFailure(process.env.TIMEBOX_ADDRESS)),
    ),
  )
  .return(({port, timeboxAddress}) => ({port, timeboxAddress}))
