const parseDivoomMessage = (buffer: Buffer) : DivoomMessage => {
  const hexlify = (str: string) => {
      var result = ''
      var padding = '00'
      for (var i=0, l=str.length; i<l; i++) {
        var digit = str.charCodeAt(i).toString(16)
        var padded = (padding+digit).slice(-2)
        result += padded
      }
      return result
    };

const divoomBufferToString = (raw : Buffer) => hexlify(raw.toString('ascii'))

export const parseDivoomMessageFromHex = (msg : string) : DivoomMessage =>
  ({
    ascii: msg,
    crc: msg.slice(-6, msg.length - 2),
    payloadLength: msg.slice(2, 6),
    command: msg.slice(8, 10),
    fixed: msg.slice(10, 12),
    cmddata: msg.slice(12, msg.length - 6)
  })

  return parseDivoomMessageFromHex(divoomBufferToString(buffer))
}

type DivoomMessage = {
  ascii: string,
  crc: string,
  payloadLength: string,
  command: string,
  fixed: string,
  cmddata: string
}
