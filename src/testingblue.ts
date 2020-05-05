export default (timeboxAddress : string) => {
  let btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort()
  let Divoom = require('node-divoom-timebox-evo')

  const cantConnectHandler = () => console.log('cannot connect')
  const cantFindDeviceHandler = () => console.log(`cannot find device: ${timeboxAddress}`)

  btSerial.findSerialPortChannel(timeboxAddress, (channel: any) => {
    btSerial.connect(timeboxAddress, channel, () => {
      console.log('connected')

      btSerial.on('data', (buffer: any) => console.log(buffer.toString('ascii')));

    }, cantConnectHandler);
  }, cantFindDeviceHandler)

  let d = (new Divoom.TimeboxEvo()).createRequest('text', {text: "Hi friends!"})
  d.paletteFn = d.PALETTE_BLACK_ON_CMY_RAINBOW // Baked in color palette, but you can define your own
  d.animFn = d.ANIM_HORIZONTAL_GRADIANT_BACKGROUND // Baked in animation, but you can define your own

  // This contains what is required to bootstrap the display on the Timebox
  //// console.log(d.messages.asBinaryBuffer());

  // Then you have to send your animation frame by frame, I suggest that you do no go over 30 message per second, if you do, the timebox will disconnect.
  // This would generate 512 animation frames.
/////  for (let i = 0; i < 512; i++) {
/////    console.log(d.getNextAnimationFrame().asBinaryBuffer());
/////  }
}
