// Module loaded here ...
@external("moda", "GET")
  declare function GET_moda(buf: usize, bufLen: u32): void

@external("moda", "GET_INT")
  declare function GET_INT_moda(i: u32): void

function main(): void {
  const i: u32 = 50
  const buf = String.UTF8.encode('Data to send to module.')
  let bufPtr = changetype<usize>(buf)
  console.log('[Entry] Pointer: ' + bufPtr.toString() + ' - ' + buf.byteLength.toString())
  console.log('[Entry] Result: ' + String.UTF8.decodeUnsafe(bufPtr, buf.byteLength))

  // Linear memory
  // memory.grow(1)
  store<u8>(0, i);
  atomic.store<u8>(1, i + 2)
  console.log('[Entry] Linear Memory Result: ' + memory.size().toString() + ' - ' + load<u8>(0).toString())
  console.log('[Entry] Atomic Memory Result: ' + atomic.load<u8>(1).toString())

  GET_moda(bufPtr, buf.byteLength)
  GET_INT_moda(i)
  
  console.log('End.')
}

main()