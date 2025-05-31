var rotr32 = (a, b) => ((a >>> b) | (a << (32 - b))) >>> 0;
var debug = false;
export default function pwdgen(uid) {
  uid = Buffer.from(uid, "hex");
  var base = Buffer.from("UUUUUUU(c) Copyright LEGO 2014AA");
  uid.copy(base);
  base[30] = base[31] = 0xaa;

  var v2 = 0;
  for (var i = 0; i < 8; i++) {
    var v4 = rotr32(v2, 25);
    var v5 = rotr32(v2, 10);
    var b = base.readUInt32LE(i * 4);
    v2 = (b + v4 + v5 - v2) >>> 0;
    if (debug) {
      console.log(
        "[%d] %s %s %s %s",
        i,
        v4.toString(16),
        v5.toString(16),
        b.toString(16),
        v2.toString(16)
      );
    }
  }

  var b = Buffer.allocUnsafe(4); //TODO: THis can be optimized
  b.writeUInt32BE(v2, 0);
  v2 = b.readUInt32LE(0);
  return ("00000000" + v2.toString(16)).slice(-8);
}
