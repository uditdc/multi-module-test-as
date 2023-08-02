// Module loaded here ...
@external("moda", "GET")
  declare function GET_moda(buf: usize, bufLen: u32): void

function main(): void {
  const buf = String.UTF8.encode('Data to send to module.')
  let bufPtr = changetype<usize>(buf)
  console.log('[Entry] Pointer: ' + bufPtr.toString() + ' - ' + buf.byteLength.toString())
  console.log('[Entry] Result: ' + String.UTF8.decodeUnsafe(bufPtr, buf.byteLength))

  // Linear memory
  memory.grow(1)
  store<u8>(0, 50);
  console.log('[Entry] Linear Memory Result: ' + load<u8>(0).toString())

  GET_moda(bufPtr, buf.byteLength)
  
  console.log('End.')
}

main()