export default () => {
  const TIMEBOX_ADDRESS = "11:22:33:44:55:66"
  var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort()
  var Divoom = require('node-divoom-timebox-evo')


  const cantConnectHandler = () => console.log('cannot connect')
  const cantFindDeviceHandler = () => console.log(`cannot find device: ${TIMEBOX_ADDRESS}`)

  btSerial.findSerialPortChannel(TIMEBOX_ADDRESS, (channel: any) => {
    btSerial.connect(TIMEBOX_ADDRESS, channel, function() {
      console.log('connected')

      btSerial.on('data', function(buffer: any) {
        console.log(buffer.toString('ascii'))
      });
    }, cantConnectHandler);
  }, cantFindDeviceHandler)

  let d = (new Divoom.TimeboxEvo()).createRequest('text', {text: "Hi friends!"})
  d.paletteFn = d.PALETTE_BLACK_ON_CMY_RAINBOW // Baked in color palette, but you can define your own
  d.animFn = d.ANIM_HORIZONTAL_GRADIANT_BACKGROUND // Baked in animation, but you can define your own

  // This contains what is required to bootstrap the display on the Timebox
  console.log(d.messages.asBinaryBuffer());

  // Then you have to send your animation frame by frame, I suggest that you do no go over 30 message per second, if you do, the timebox will disconnect.
  // This would generate 512 animation frames.
  for (let i = 0; i < 512; i++){
    console.log(d.getNextAnimationFrame().asBinaryBuffer());
  }
}
