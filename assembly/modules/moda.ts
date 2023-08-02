/**
 * Externally imported module function
 * 
 * @param buf 
 * @param bufLen 
 */
export function GET(buf: usize, bufLen: u32): void {
  console.log('')
  console.log('------ Module starts here.')
  console.log('[Module] Pointer: ' + buf.toString() + ' - ' + bufLen.toString())
  console.log('[Module] Result: ' + String.UTF8.decodeUnsafe(buf, bufLen))
  console.log('[Module] Linear Memory Result: ' + load<u8>(0).toString())
  console.log('------ Module ends here.')
}