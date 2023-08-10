/**
 * Externally imported module function
 *
 * @param buf
 * @param bufLen
 */
export function GET(buf: usize, bufLen: u32): void {
  console.log("");
  console.log("------ Module GET starts here.");
  console.log(
    "[Module GET] Pointer: " + buf.toString() + " - " + bufLen.toString()
  );
  console.log("[Module GET] Result: " + String.UTF8.decodeUnsafe(buf, bufLen));
  console.log("[Module GET] Linear Memory Result: " + load<u8>(0).toString());
  console.log('[Module GET] Atomic Memory Result: ' + atomic.load<u8>(1).toString())
  console.log("------ Module GET ends here.");
}

/**
 *
 * @param i
 */
export function GET_INT(i: u32): void {
  console.log("");
  console.log("------ Module GET_INT starts here.");
  console.log("[Module GET_INT] Result: " + i.toString());
  console.log("------ Module GET_INT ends here.");
}
