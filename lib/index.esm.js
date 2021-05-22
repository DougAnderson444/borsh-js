const __create = Object.create
const __defProp = Object.defineProperty
const __getOwnPropDesc = Object.getOwnPropertyDescriptor
const __getOwnPropNames = Object.getOwnPropertyNames
const __getProtoOf = Object.getPrototypeOf
const __hasOwnProp = Object.prototype.hasOwnProperty
const __markAsModule = (target) => __defProp(target, '__esModule', { value: true })
const __commonJS = (cb, mod) => function __require () {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports
}
const __reExport = (target, module, desc) => {
  if (module && typeof module === 'object' || typeof module === 'function') {
    for (const key of __getOwnPropNames(module)) {
      if (!__hasOwnProp.call(target, key) && key !== 'default') { __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable }) }
    }
  }
  return target
}
const __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, 'default', module && module.__esModule && 'default' in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module)
}
const __decorateClass = (decorators, target, key, kind) => {
  let result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--) {
    if (decorator = decorators[i]) { result = (kind ? decorator(target, key, result) : decorator(result)) || result }
  }
  if (kind && result) { __defProp(target, key, result) }
  return result
}

// (disabled):node_modules/buffer/index.js
const require_buffer = __commonJS({
  '(disabled):node_modules/buffer/index.js' () {
  }
})

// node_modules/bn.js/lib/bn.js
const require_bn = __commonJS({
  'node_modules/bn.js/lib/bn.js' (exports, module) {
    (function (module2, exports2) {
      'use strict'
      function assert (val, msg) {
        if (!val) { throw new Error(msg || 'Assertion failed') }
      }
      function inherits (ctor, superCtor) {
        ctor.super_ = superCtor
        const TempCtor = function () {
        }
        TempCtor.prototype = superCtor.prototype
        ctor.prototype = new TempCtor()
        ctor.prototype.constructor = ctor
      }
      function BN2 (number, base, endian) {
        if (BN2.isBN(number)) {
          return number
        }
        this.negative = 0
        this.words = null
        this.length = 0
        this.red = null
        if (number !== null) {
          if (base === 'le' || base === 'be') {
            endian = base
            base = 10
          }
          this._init(number || 0, base || 10, endian || 'be')
        }
      }
      if (typeof module2 === 'object') {
        module2.exports = BN2
      } else {
        exports2.BN = BN2
      }
      BN2.BN = BN2
      BN2.wordSize = 26
      let Buffer2
      try {
        if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {
          Buffer2 = window.Buffer
        } else {
          Buffer2 = require_buffer().Buffer
        }
      } catch (e) {
      }
      BN2.isBN = function isBN (num) {
        if (num instanceof BN2) {
          return true
        }
        return num !== null && typeof num === 'object' && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words)
      }
      BN2.max = function max (left, right) {
        if (left.cmp(right) > 0) { return left }
        return right
      }
      BN2.min = function min (left, right) {
        if (left.cmp(right) < 0) { return left }
        return right
      }
      BN2.prototype._init = function init (number, base, endian) {
        if (typeof number === 'number') {
          return this._initNumber(number, base, endian)
        }
        if (typeof number === 'object') {
          return this._initArray(number, base, endian)
        }
        if (base === 'hex') {
          base = 16
        }
        assert(base === (base | 0) && base >= 2 && base <= 36)
        number = number.toString().replace(/\s+/g, '')
        let start = 0
        if (number[0] === '-') {
          start++
          this.negative = 1
        }
        if (start < number.length) {
          if (base === 16) {
            this._parseHex(number, start, endian)
          } else {
            this._parseBase(number, base, start)
            if (endian === 'le') {
              this._initArray(this.toArray(), base, endian)
            }
          }
        }
      }
      BN2.prototype._initNumber = function _initNumber (number, base, endian) {
        if (number < 0) {
          this.negative = 1
          number = -number
        }
        if (number < 67108864) {
          this.words = [number & 67108863]
          this.length = 1
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ]
          this.length = 2
        } else {
          assert(number < 9007199254740992)
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ]
          this.length = 3
        }
        if (endian !== 'le') { return }
        this._initArray(this.toArray(), base, endian)
      }
      BN2.prototype._initArray = function _initArray (number, base, endian) {
        assert(typeof number.length === 'number')
        if (number.length <= 0) {
          this.words = [0]
          this.length = 1
          return this
        }
        this.length = Math.ceil(number.length / 3)
        this.words = new Array(this.length)
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0
        }
        let j, w
        let off = 0
        if (endian === 'be') {
          for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
            w = number[i] | number[i - 1] << 8 | number[i - 2] << 16
            this.words[j] |= w << off & 67108863
            this.words[j + 1] = w >>> 26 - off & 67108863
            off += 24
            if (off >= 26) {
              off -= 26
              j++
            }
          }
        } else if (endian === 'le') {
          for (i = 0, j = 0; i < number.length; i += 3) {
            w = number[i] | number[i + 1] << 8 | number[i + 2] << 16
            this.words[j] |= w << off & 67108863
            this.words[j + 1] = w >>> 26 - off & 67108863
            off += 24
            if (off >= 26) {
              off -= 26
              j++
            }
          }
        }
        return this._strip()
      }
      function parseHex4Bits (string, index) {
        const c = string.charCodeAt(index)
        if (c >= 48 && c <= 57) {
          return c - 48
        } else if (c >= 65 && c <= 70) {
          return c - 55
        } else if (c >= 97 && c <= 102) {
          return c - 87
        } else {
          assert(false, 'Invalid character in ' + string)
        }
      }
      function parseHexByte (string, lowerBound, index) {
        let r = parseHex4Bits(string, index)
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string, index - 1) << 4
        }
        return r
      }
      BN2.prototype._parseHex = function _parseHex (number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6)
        this.words = new Array(this.length)
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0
        }
        let off = 0
        let j = 0
        let w
        if (endian === 'be') {
          for (i = number.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number, start, i) << off
            this.words[j] |= w & 67108863
            if (off >= 18) {
              off -= 18
              j += 1
              this.words[j] |= w >>> 26
            } else {
              off += 8
            }
          }
        } else {
          const parseLength = number.length - start
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
            w = parseHexByte(number, start, i) << off
            this.words[j] |= w & 67108863
            if (off >= 18) {
              off -= 18
              j += 1
              this.words[j] |= w >>> 26
            } else {
              off += 8
            }
          }
        }
        this._strip()
      }
      function parseBase (str, start, end, mul) {
        let r = 0
        let b = 0
        const len = Math.min(str.length, end)
        for (let i = start; i < len; i++) {
          const c = str.charCodeAt(i) - 48
          r *= mul
          if (c >= 49) {
            b = c - 49 + 10
          } else if (c >= 17) {
            b = c - 17 + 10
          } else {
            b = c
          }
          assert(c >= 0 && b < mul, 'Invalid character')
          r += b
        }
        return r
      }
      BN2.prototype._parseBase = function _parseBase (number, base, start) {
        this.words = [0]
        this.length = 1
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++
        }
        limbLen--
        limbPow = limbPow / base | 0
        const total = number.length - start
        const mod = total % limbLen
        const end = Math.min(total, total - mod) + start
        let word = 0
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number, i, i + limbLen, base)
          this.imuln(limbPow)
          if (this.words[0] + word < 67108864) {
            this.words[0] += word
          } else {
            this._iaddn(word)
          }
        }
        if (mod !== 0) {
          let pow = 1
          word = parseBase(number, i, number.length, base)
          for (i = 0; i < mod; i++) {
            pow *= base
          }
          this.imuln(pow)
          if (this.words[0] + word < 67108864) {
            this.words[0] += word
          } else {
            this._iaddn(word)
          }
        }
        this._strip()
      }
      BN2.prototype.copy = function copy (dest) {
        dest.words = new Array(this.length)
        for (let i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i]
        }
        dest.length = this.length
        dest.negative = this.negative
        dest.red = this.red
      }
      function move (dest, src) {
        dest.words = src.words
        dest.length = src.length
        dest.negative = src.negative
        dest.red = src.red
      }
      BN2.prototype._move = function _move (dest) {
        move(dest, this)
      }
      BN2.prototype.clone = function clone () {
        const r = new BN2(null)
        this.copy(r)
        return r
      }
      BN2.prototype._expand = function _expand (size) {
        while (this.length < size) {
          this.words[this.length++] = 0
        }
        return this
      }
      BN2.prototype._strip = function strip () {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--
        }
        return this._normSign()
      }
      BN2.prototype._normSign = function _normSign () {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0
        }
        return this
      }
      if (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function') {
        try {
          BN2.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspect
        } catch (e) {
          BN2.prototype.inspect = inspect
        }
      } else {
        BN2.prototype.inspect = inspect
      }
      function inspect () {
        return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
      }
      const zeros = [
        '',
        '0',
        '00',
        '000',
        '0000',
        '00000',
        '000000',
        '0000000',
        '00000000',
        '000000000',
        '0000000000',
        '00000000000',
        '000000000000',
        '0000000000000',
        '00000000000000',
        '000000000000000',
        '0000000000000000',
        '00000000000000000',
        '000000000000000000',
        '0000000000000000000',
        '00000000000000000000',
        '000000000000000000000',
        '0000000000000000000000',
        '00000000000000000000000',
        '000000000000000000000000',
        '0000000000000000000000000'
      ]
      const groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ]
      const groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ]
      BN2.prototype.toString = function toString (base, padding) {
        base = base || 10
        padding = padding | 0 || 1
        let out
        if (base === 16 || base === 'hex') {
          out = ''
          let off = 0
          let carry = 0
          for (let i = 0; i < this.length; i++) {
            const w = this.words[i]
            const word = ((w << off | carry) & 16777215).toString(16)
            carry = w >>> 24 - off & 16777215
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out
            } else {
              out = word + out
            }
            off += 2
            if (off >= 26) {
              off -= 26
              i--
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out
          }
          while (out.length % padding !== 0) {
            out = '0' + out
          }
          if (this.negative !== 0) {
            out = '-' + out
          }
          return out
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          const groupSize = groupSizes[base]
          const groupBase = groupBases[base]
          out = ''
          let c = this.clone()
          c.negative = 0
          while (!c.isZero()) {
            const r = c.modrn(groupBase).toString(base)
            c = c.idivn(groupBase)
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out
            } else {
              out = r + out
            }
          }
          if (this.isZero()) {
            out = '0' + out
          }
          while (out.length % padding !== 0) {
            out = '0' + out
          }
          if (this.negative !== 0) {
            out = '-' + out
          }
          return out
        }
        assert(false, 'Base should be between 2 and 36')
      }
      BN2.prototype.toNumber = function toNumber () {
        let ret = this.words[0]
        if (this.length === 2) {
          ret += this.words[1] * 67108864
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864
        } else if (this.length > 2) {
          assert(false, 'Number can only safely store up to 53 bits')
        }
        return this.negative !== 0 ? -ret : ret
      }
      BN2.prototype.toJSON = function toJSON () {
        return this.toString(16, 2)
      }
      if (Buffer2) {
        BN2.prototype.toBuffer = function toBuffer (endian, length) {
          return this.toArrayLike(Buffer2, endian, length)
        }
      }
      BN2.prototype.toArray = function toArray (endian, length) {
        return this.toArrayLike(Array, endian, length)
      }
      const allocate = function allocate2 (ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size)
        }
        return new ArrayType(size)
      }
      BN2.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
        this._strip()
        const byteLength = this.byteLength()
        const reqLength = length || Math.max(1, byteLength)
        assert(byteLength <= reqLength, 'byte array longer than desired length')
        assert(reqLength > 0, 'Requested array length <= 0')
        const res = allocate(ArrayType, reqLength)
        const postfix = endian === 'le' ? 'LE' : 'BE'
        this['_toArrayLike' + postfix](res, byteLength)
        return res
      }
      BN2.prototype._toArrayLikeLE = function _toArrayLikeLE (res, byteLength) {
        let position = 0
        let carry = 0
        for (let i = 0, shift = 0; i < this.length; i++) {
          const word = this.words[i] << shift | carry
          res[position++] = word & 255
          if (position < res.length) {
            res[position++] = word >> 8 & 255
          }
          if (position < res.length) {
            res[position++] = word >> 16 & 255
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = word >> 24 & 255
            }
            carry = 0
            shift = 0
          } else {
            carry = word >>> 24
            shift += 2
          }
        }
        if (position < res.length) {
          res[position++] = carry
          while (position < res.length) {
            res[position++] = 0
          }
        }
      }
      BN2.prototype._toArrayLikeBE = function _toArrayLikeBE (res, byteLength) {
        let position = res.length - 1
        let carry = 0
        for (let i = 0, shift = 0; i < this.length; i++) {
          const word = this.words[i] << shift | carry
          res[position--] = word & 255
          if (position >= 0) {
            res[position--] = word >> 8 & 255
          }
          if (position >= 0) {
            res[position--] = word >> 16 & 255
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = word >> 24 & 255
            }
            carry = 0
            shift = 0
          } else {
            carry = word >>> 24
            shift += 2
          }
        }
        if (position >= 0) {
          res[position--] = carry
          while (position >= 0) {
            res[position--] = 0
          }
        }
      }
      if (Math.clz32) {
        BN2.prototype._countBits = function _countBits (w) {
          return 32 - Math.clz32(w)
        }
      } else {
        BN2.prototype._countBits = function _countBits (w) {
          let t = w
          let r = 0
          if (t >= 4096) {
            r += 13
            t >>>= 13
          }
          if (t >= 64) {
            r += 7
            t >>>= 7
          }
          if (t >= 8) {
            r += 4
            t >>>= 4
          }
          if (t >= 2) {
            r += 2
            t >>>= 2
          }
          return r + t
        }
      }
      BN2.prototype._zeroBits = function _zeroBits (w) {
        if (w === 0) { return 26 }
        let t = w
        let r = 0
        if ((t & 8191) === 0) {
          r += 13
          t >>>= 13
        }
        if ((t & 127) === 0) {
          r += 7
          t >>>= 7
        }
        if ((t & 15) === 0) {
          r += 4
          t >>>= 4
        }
        if ((t & 3) === 0) {
          r += 2
          t >>>= 2
        }
        if ((t & 1) === 0) {
          r++
        }
        return r
      }
      BN2.prototype.bitLength = function bitLength () {
        const w = this.words[this.length - 1]
        const hi = this._countBits(w)
        return (this.length - 1) * 26 + hi
      }
      function toBitArray (num) {
        const w = new Array(num.bitLength())
        for (let bit = 0; bit < w.length; bit++) {
          const off = bit / 26 | 0
          const wbit = bit % 26
          w[bit] = num.words[off] >>> wbit & 1
        }
        return w
      }
      BN2.prototype.zeroBits = function zeroBits () {
        if (this.isZero()) { return 0 }
        let r = 0
        for (let i = 0; i < this.length; i++) {
          const b = this._zeroBits(this.words[i])
          r += b
          if (b !== 26) { break }
        }
        return r
      }
      BN2.prototype.byteLength = function byteLength () {
        return Math.ceil(this.bitLength() / 8)
      }
      BN2.prototype.toTwos = function toTwos (width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1)
        }
        return this.clone()
      }
      BN2.prototype.fromTwos = function fromTwos (width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg()
        }
        return this.clone()
      }
      BN2.prototype.isNeg = function isNeg () {
        return this.negative !== 0
      }
      BN2.prototype.neg = function neg () {
        return this.clone().ineg()
      }
      BN2.prototype.ineg = function ineg () {
        if (!this.isZero()) {
          this.negative ^= 1
        }
        return this
      }
      BN2.prototype.iuor = function iuor (num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0
        }
        for (let i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i]
        }
        return this._strip()
      }
      BN2.prototype.ior = function ior (num) {
        assert((this.negative | num.negative) === 0)
        return this.iuor(num)
      }
      BN2.prototype.or = function or (num) {
        if (this.length > num.length) { return this.clone().ior(num) }
        return num.clone().ior(this)
      }
      BN2.prototype.uor = function uor (num) {
        if (this.length > num.length) { return this.clone().iuor(num) }
        return num.clone().iuor(this)
      }
      BN2.prototype.iuand = function iuand (num) {
        let b
        if (this.length > num.length) {
          b = num
        } else {
          b = this
        }
        for (let i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i]
        }
        this.length = b.length
        return this._strip()
      }
      BN2.prototype.iand = function iand (num) {
        assert((this.negative | num.negative) === 0)
        return this.iuand(num)
      }
      BN2.prototype.and = function and (num) {
        if (this.length > num.length) { return this.clone().iand(num) }
        return num.clone().iand(this)
      }
      BN2.prototype.uand = function uand (num) {
        if (this.length > num.length) { return this.clone().iuand(num) }
        return num.clone().iuand(this)
      }
      BN2.prototype.iuxor = function iuxor (num) {
        let a
        let b
        if (this.length > num.length) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i]
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i]
          }
        }
        this.length = a.length
        return this._strip()
      }
      BN2.prototype.ixor = function ixor (num) {
        assert((this.negative | num.negative) === 0)
        return this.iuxor(num)
      }
      BN2.prototype.xor = function xor (num) {
        if (this.length > num.length) { return this.clone().ixor(num) }
        return num.clone().ixor(this)
      }
      BN2.prototype.uxor = function uxor (num) {
        if (this.length > num.length) { return this.clone().iuxor(num) }
        return num.clone().iuxor(this)
      }
      BN2.prototype.inotn = function inotn (width) {
        assert(typeof width === 'number' && width >= 0)
        let bytesNeeded = Math.ceil(width / 26) | 0
        const bitsLeft = width % 26
        this._expand(bytesNeeded)
        if (bitsLeft > 0) {
          bytesNeeded--
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft
        }
        return this._strip()
      }
      BN2.prototype.notn = function notn (width) {
        return this.clone().inotn(width)
      }
      BN2.prototype.setn = function setn (bit, val) {
        assert(typeof bit === 'number' && bit >= 0)
        const off = bit / 26 | 0
        const wbit = bit % 26
        this._expand(off + 1)
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit)
        }
        return this._strip()
      }
      BN2.prototype.iadd = function iadd (num) {
        let r
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0
          r = this.isub(num)
          this.negative ^= 1
          return this._normSign()
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0
          r = this.isub(num)
          num.negative = 1
          return r._normSign()
        }
        let a, b
        if (this.length > num.length) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }
        let carry = 0
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry
          this.words[i] = r & 67108863
          carry = r >>> 26
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry
          this.words[i] = r & 67108863
          carry = r >>> 26
        }
        this.length = a.length
        if (carry !== 0) {
          this.words[this.length] = carry
          this.length++
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i]
          }
        }
        return this
      }
      BN2.prototype.add = function add (num) {
        let res
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0
          res = this.sub(num)
          num.negative ^= 1
          return res
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0
          res = num.sub(this)
          this.negative = 1
          return res
        }
        if (this.length > num.length) { return this.clone().iadd(num) }
        return num.clone().iadd(this)
      }
      BN2.prototype.isub = function isub (num) {
        if (num.negative !== 0) {
          num.negative = 0
          var r = this.iadd(num)
          num.negative = 1
          return r._normSign()
        } else if (this.negative !== 0) {
          this.negative = 0
          this.iadd(num)
          this.negative = 1
          return this._normSign()
        }
        const cmp = this.cmp(num)
        if (cmp === 0) {
          this.negative = 0
          this.length = 1
          this.words[0] = 0
          return this
        }
        let a, b
        if (cmp > 0) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }
        let carry = 0
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry
          carry = r >> 26
          this.words[i] = r & 67108863
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry
          carry = r >> 26
          this.words[i] = r & 67108863
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i]
          }
        }
        this.length = Math.max(this.length, i)
        if (a !== this) {
          this.negative = 1
        }
        return this._strip()
      }
      BN2.prototype.sub = function sub (num) {
        return this.clone().isub(num)
      }
      function smallMulTo (self, num, out) {
        out.negative = num.negative ^ self.negative
        let len = self.length + num.length | 0
        out.length = len
        len = len - 1 | 0
        let a = self.words[0] | 0
        let b = num.words[0] | 0
        let r = a * b
        const lo = r & 67108863
        let carry = r / 67108864 | 0
        out.words[0] = lo
        for (var k = 1; k < len; k++) {
          let ncarry = carry >>> 26
          let rword = carry & 67108863
          const maxJ = Math.min(k, num.length - 1)
          for (let j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            const i = k - j | 0
            a = self.words[i] | 0
            b = num.words[j] | 0
            r = a * b + rword
            ncarry += r / 67108864 | 0
            rword = r & 67108863
          }
          out.words[k] = rword | 0
          carry = ncarry | 0
        }
        if (carry !== 0) {
          out.words[k] = carry | 0
        } else {
          out.length--
        }
        return out._strip()
      }
      let comb10MulTo = function comb10MulTo2 (self, num, out) {
        const a = self.words
        const b = num.words
        const o = out.words
        let c = 0
        let lo
        let mid
        let hi
        const a0 = a[0] | 0
        const al0 = a0 & 8191
        const ah0 = a0 >>> 13
        const a1 = a[1] | 0
        const al1 = a1 & 8191
        const ah1 = a1 >>> 13
        const a2 = a[2] | 0
        const al2 = a2 & 8191
        const ah2 = a2 >>> 13
        const a3 = a[3] | 0
        const al3 = a3 & 8191
        const ah3 = a3 >>> 13
        const a4 = a[4] | 0
        const al4 = a4 & 8191
        const ah4 = a4 >>> 13
        const a5 = a[5] | 0
        const al5 = a5 & 8191
        const ah5 = a5 >>> 13
        const a6 = a[6] | 0
        const al6 = a6 & 8191
        const ah6 = a6 >>> 13
        const a7 = a[7] | 0
        const al7 = a7 & 8191
        const ah7 = a7 >>> 13
        const a8 = a[8] | 0
        const al8 = a8 & 8191
        const ah8 = a8 >>> 13
        const a9 = a[9] | 0
        const al9 = a9 & 8191
        const ah9 = a9 >>> 13
        const b0 = b[0] | 0
        const bl0 = b0 & 8191
        const bh0 = b0 >>> 13
        const b1 = b[1] | 0
        const bl1 = b1 & 8191
        const bh1 = b1 >>> 13
        const b2 = b[2] | 0
        const bl2 = b2 & 8191
        const bh2 = b2 >>> 13
        const b3 = b[3] | 0
        const bl3 = b3 & 8191
        const bh3 = b3 >>> 13
        const b4 = b[4] | 0
        const bl4 = b4 & 8191
        const bh4 = b4 >>> 13
        const b5 = b[5] | 0
        const bl5 = b5 & 8191
        const bh5 = b5 >>> 13
        const b6 = b[6] | 0
        const bl6 = b6 & 8191
        const bh6 = b6 >>> 13
        const b7 = b[7] | 0
        const bl7 = b7 & 8191
        const bh7 = b7 >>> 13
        const b8 = b[8] | 0
        const bl8 = b8 & 8191
        const bh8 = b8 >>> 13
        const b9 = b[9] | 0
        const bl9 = b9 & 8191
        const bh9 = b9 >>> 13
        out.negative = self.negative ^ num.negative
        out.length = 19
        lo = Math.imul(al0, bl0)
        mid = Math.imul(al0, bh0)
        mid = mid + Math.imul(ah0, bl0) | 0
        hi = Math.imul(ah0, bh0)
        let w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0
        w0 &= 67108863
        lo = Math.imul(al1, bl0)
        mid = Math.imul(al1, bh0)
        mid = mid + Math.imul(ah1, bl0) | 0
        hi = Math.imul(ah1, bh0)
        lo = lo + Math.imul(al0, bl1) | 0
        mid = mid + Math.imul(al0, bh1) | 0
        mid = mid + Math.imul(ah0, bl1) | 0
        hi = hi + Math.imul(ah0, bh1) | 0
        let w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0
        w1 &= 67108863
        lo = Math.imul(al2, bl0)
        mid = Math.imul(al2, bh0)
        mid = mid + Math.imul(ah2, bl0) | 0
        hi = Math.imul(ah2, bh0)
        lo = lo + Math.imul(al1, bl1) | 0
        mid = mid + Math.imul(al1, bh1) | 0
        mid = mid + Math.imul(ah1, bl1) | 0
        hi = hi + Math.imul(ah1, bh1) | 0
        lo = lo + Math.imul(al0, bl2) | 0
        mid = mid + Math.imul(al0, bh2) | 0
        mid = mid + Math.imul(ah0, bl2) | 0
        hi = hi + Math.imul(ah0, bh2) | 0
        let w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0
        w2 &= 67108863
        lo = Math.imul(al3, bl0)
        mid = Math.imul(al3, bh0)
        mid = mid + Math.imul(ah3, bl0) | 0
        hi = Math.imul(ah3, bh0)
        lo = lo + Math.imul(al2, bl1) | 0
        mid = mid + Math.imul(al2, bh1) | 0
        mid = mid + Math.imul(ah2, bl1) | 0
        hi = hi + Math.imul(ah2, bh1) | 0
        lo = lo + Math.imul(al1, bl2) | 0
        mid = mid + Math.imul(al1, bh2) | 0
        mid = mid + Math.imul(ah1, bl2) | 0
        hi = hi + Math.imul(ah1, bh2) | 0
        lo = lo + Math.imul(al0, bl3) | 0
        mid = mid + Math.imul(al0, bh3) | 0
        mid = mid + Math.imul(ah0, bl3) | 0
        hi = hi + Math.imul(ah0, bh3) | 0
        let w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0
        w3 &= 67108863
        lo = Math.imul(al4, bl0)
        mid = Math.imul(al4, bh0)
        mid = mid + Math.imul(ah4, bl0) | 0
        hi = Math.imul(ah4, bh0)
        lo = lo + Math.imul(al3, bl1) | 0
        mid = mid + Math.imul(al3, bh1) | 0
        mid = mid + Math.imul(ah3, bl1) | 0
        hi = hi + Math.imul(ah3, bh1) | 0
        lo = lo + Math.imul(al2, bl2) | 0
        mid = mid + Math.imul(al2, bh2) | 0
        mid = mid + Math.imul(ah2, bl2) | 0
        hi = hi + Math.imul(ah2, bh2) | 0
        lo = lo + Math.imul(al1, bl3) | 0
        mid = mid + Math.imul(al1, bh3) | 0
        mid = mid + Math.imul(ah1, bl3) | 0
        hi = hi + Math.imul(ah1, bh3) | 0
        lo = lo + Math.imul(al0, bl4) | 0
        mid = mid + Math.imul(al0, bh4) | 0
        mid = mid + Math.imul(ah0, bl4) | 0
        hi = hi + Math.imul(ah0, bh4) | 0
        let w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0
        w4 &= 67108863
        lo = Math.imul(al5, bl0)
        mid = Math.imul(al5, bh0)
        mid = mid + Math.imul(ah5, bl0) | 0
        hi = Math.imul(ah5, bh0)
        lo = lo + Math.imul(al4, bl1) | 0
        mid = mid + Math.imul(al4, bh1) | 0
        mid = mid + Math.imul(ah4, bl1) | 0
        hi = hi + Math.imul(ah4, bh1) | 0
        lo = lo + Math.imul(al3, bl2) | 0
        mid = mid + Math.imul(al3, bh2) | 0
        mid = mid + Math.imul(ah3, bl2) | 0
        hi = hi + Math.imul(ah3, bh2) | 0
        lo = lo + Math.imul(al2, bl3) | 0
        mid = mid + Math.imul(al2, bh3) | 0
        mid = mid + Math.imul(ah2, bl3) | 0
        hi = hi + Math.imul(ah2, bh3) | 0
        lo = lo + Math.imul(al1, bl4) | 0
        mid = mid + Math.imul(al1, bh4) | 0
        mid = mid + Math.imul(ah1, bl4) | 0
        hi = hi + Math.imul(ah1, bh4) | 0
        lo = lo + Math.imul(al0, bl5) | 0
        mid = mid + Math.imul(al0, bh5) | 0
        mid = mid + Math.imul(ah0, bl5) | 0
        hi = hi + Math.imul(ah0, bh5) | 0
        let w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0
        w5 &= 67108863
        lo = Math.imul(al6, bl0)
        mid = Math.imul(al6, bh0)
        mid = mid + Math.imul(ah6, bl0) | 0
        hi = Math.imul(ah6, bh0)
        lo = lo + Math.imul(al5, bl1) | 0
        mid = mid + Math.imul(al5, bh1) | 0
        mid = mid + Math.imul(ah5, bl1) | 0
        hi = hi + Math.imul(ah5, bh1) | 0
        lo = lo + Math.imul(al4, bl2) | 0
        mid = mid + Math.imul(al4, bh2) | 0
        mid = mid + Math.imul(ah4, bl2) | 0
        hi = hi + Math.imul(ah4, bh2) | 0
        lo = lo + Math.imul(al3, bl3) | 0
        mid = mid + Math.imul(al3, bh3) | 0
        mid = mid + Math.imul(ah3, bl3) | 0
        hi = hi + Math.imul(ah3, bh3) | 0
        lo = lo + Math.imul(al2, bl4) | 0
        mid = mid + Math.imul(al2, bh4) | 0
        mid = mid + Math.imul(ah2, bl4) | 0
        hi = hi + Math.imul(ah2, bh4) | 0
        lo = lo + Math.imul(al1, bl5) | 0
        mid = mid + Math.imul(al1, bh5) | 0
        mid = mid + Math.imul(ah1, bl5) | 0
        hi = hi + Math.imul(ah1, bh5) | 0
        lo = lo + Math.imul(al0, bl6) | 0
        mid = mid + Math.imul(al0, bh6) | 0
        mid = mid + Math.imul(ah0, bl6) | 0
        hi = hi + Math.imul(ah0, bh6) | 0
        let w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0
        w6 &= 67108863
        lo = Math.imul(al7, bl0)
        mid = Math.imul(al7, bh0)
        mid = mid + Math.imul(ah7, bl0) | 0
        hi = Math.imul(ah7, bh0)
        lo = lo + Math.imul(al6, bl1) | 0
        mid = mid + Math.imul(al6, bh1) | 0
        mid = mid + Math.imul(ah6, bl1) | 0
        hi = hi + Math.imul(ah6, bh1) | 0
        lo = lo + Math.imul(al5, bl2) | 0
        mid = mid + Math.imul(al5, bh2) | 0
        mid = mid + Math.imul(ah5, bl2) | 0
        hi = hi + Math.imul(ah5, bh2) | 0
        lo = lo + Math.imul(al4, bl3) | 0
        mid = mid + Math.imul(al4, bh3) | 0
        mid = mid + Math.imul(ah4, bl3) | 0
        hi = hi + Math.imul(ah4, bh3) | 0
        lo = lo + Math.imul(al3, bl4) | 0
        mid = mid + Math.imul(al3, bh4) | 0
        mid = mid + Math.imul(ah3, bl4) | 0
        hi = hi + Math.imul(ah3, bh4) | 0
        lo = lo + Math.imul(al2, bl5) | 0
        mid = mid + Math.imul(al2, bh5) | 0
        mid = mid + Math.imul(ah2, bl5) | 0
        hi = hi + Math.imul(ah2, bh5) | 0
        lo = lo + Math.imul(al1, bl6) | 0
        mid = mid + Math.imul(al1, bh6) | 0
        mid = mid + Math.imul(ah1, bl6) | 0
        hi = hi + Math.imul(ah1, bh6) | 0
        lo = lo + Math.imul(al0, bl7) | 0
        mid = mid + Math.imul(al0, bh7) | 0
        mid = mid + Math.imul(ah0, bl7) | 0
        hi = hi + Math.imul(ah0, bh7) | 0
        let w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0
        w7 &= 67108863
        lo = Math.imul(al8, bl0)
        mid = Math.imul(al8, bh0)
        mid = mid + Math.imul(ah8, bl0) | 0
        hi = Math.imul(ah8, bh0)
        lo = lo + Math.imul(al7, bl1) | 0
        mid = mid + Math.imul(al7, bh1) | 0
        mid = mid + Math.imul(ah7, bl1) | 0
        hi = hi + Math.imul(ah7, bh1) | 0
        lo = lo + Math.imul(al6, bl2) | 0
        mid = mid + Math.imul(al6, bh2) | 0
        mid = mid + Math.imul(ah6, bl2) | 0
        hi = hi + Math.imul(ah6, bh2) | 0
        lo = lo + Math.imul(al5, bl3) | 0
        mid = mid + Math.imul(al5, bh3) | 0
        mid = mid + Math.imul(ah5, bl3) | 0
        hi = hi + Math.imul(ah5, bh3) | 0
        lo = lo + Math.imul(al4, bl4) | 0
        mid = mid + Math.imul(al4, bh4) | 0
        mid = mid + Math.imul(ah4, bl4) | 0
        hi = hi + Math.imul(ah4, bh4) | 0
        lo = lo + Math.imul(al3, bl5) | 0
        mid = mid + Math.imul(al3, bh5) | 0
        mid = mid + Math.imul(ah3, bl5) | 0
        hi = hi + Math.imul(ah3, bh5) | 0
        lo = lo + Math.imul(al2, bl6) | 0
        mid = mid + Math.imul(al2, bh6) | 0
        mid = mid + Math.imul(ah2, bl6) | 0
        hi = hi + Math.imul(ah2, bh6) | 0
        lo = lo + Math.imul(al1, bl7) | 0
        mid = mid + Math.imul(al1, bh7) | 0
        mid = mid + Math.imul(ah1, bl7) | 0
        hi = hi + Math.imul(ah1, bh7) | 0
        lo = lo + Math.imul(al0, bl8) | 0
        mid = mid + Math.imul(al0, bh8) | 0
        mid = mid + Math.imul(ah0, bl8) | 0
        hi = hi + Math.imul(ah0, bh8) | 0
        let w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0
        w8 &= 67108863
        lo = Math.imul(al9, bl0)
        mid = Math.imul(al9, bh0)
        mid = mid + Math.imul(ah9, bl0) | 0
        hi = Math.imul(ah9, bh0)
        lo = lo + Math.imul(al8, bl1) | 0
        mid = mid + Math.imul(al8, bh1) | 0
        mid = mid + Math.imul(ah8, bl1) | 0
        hi = hi + Math.imul(ah8, bh1) | 0
        lo = lo + Math.imul(al7, bl2) | 0
        mid = mid + Math.imul(al7, bh2) | 0
        mid = mid + Math.imul(ah7, bl2) | 0
        hi = hi + Math.imul(ah7, bh2) | 0
        lo = lo + Math.imul(al6, bl3) | 0
        mid = mid + Math.imul(al6, bh3) | 0
        mid = mid + Math.imul(ah6, bl3) | 0
        hi = hi + Math.imul(ah6, bh3) | 0
        lo = lo + Math.imul(al5, bl4) | 0
        mid = mid + Math.imul(al5, bh4) | 0
        mid = mid + Math.imul(ah5, bl4) | 0
        hi = hi + Math.imul(ah5, bh4) | 0
        lo = lo + Math.imul(al4, bl5) | 0
        mid = mid + Math.imul(al4, bh5) | 0
        mid = mid + Math.imul(ah4, bl5) | 0
        hi = hi + Math.imul(ah4, bh5) | 0
        lo = lo + Math.imul(al3, bl6) | 0
        mid = mid + Math.imul(al3, bh6) | 0
        mid = mid + Math.imul(ah3, bl6) | 0
        hi = hi + Math.imul(ah3, bh6) | 0
        lo = lo + Math.imul(al2, bl7) | 0
        mid = mid + Math.imul(al2, bh7) | 0
        mid = mid + Math.imul(ah2, bl7) | 0
        hi = hi + Math.imul(ah2, bh7) | 0
        lo = lo + Math.imul(al1, bl8) | 0
        mid = mid + Math.imul(al1, bh8) | 0
        mid = mid + Math.imul(ah1, bl8) | 0
        hi = hi + Math.imul(ah1, bh8) | 0
        lo = lo + Math.imul(al0, bl9) | 0
        mid = mid + Math.imul(al0, bh9) | 0
        mid = mid + Math.imul(ah0, bl9) | 0
        hi = hi + Math.imul(ah0, bh9) | 0
        let w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0
        w9 &= 67108863
        lo = Math.imul(al9, bl1)
        mid = Math.imul(al9, bh1)
        mid = mid + Math.imul(ah9, bl1) | 0
        hi = Math.imul(ah9, bh1)
        lo = lo + Math.imul(al8, bl2) | 0
        mid = mid + Math.imul(al8, bh2) | 0
        mid = mid + Math.imul(ah8, bl2) | 0
        hi = hi + Math.imul(ah8, bh2) | 0
        lo = lo + Math.imul(al7, bl3) | 0
        mid = mid + Math.imul(al7, bh3) | 0
        mid = mid + Math.imul(ah7, bl3) | 0
        hi = hi + Math.imul(ah7, bh3) | 0
        lo = lo + Math.imul(al6, bl4) | 0
        mid = mid + Math.imul(al6, bh4) | 0
        mid = mid + Math.imul(ah6, bl4) | 0
        hi = hi + Math.imul(ah6, bh4) | 0
        lo = lo + Math.imul(al5, bl5) | 0
        mid = mid + Math.imul(al5, bh5) | 0
        mid = mid + Math.imul(ah5, bl5) | 0
        hi = hi + Math.imul(ah5, bh5) | 0
        lo = lo + Math.imul(al4, bl6) | 0
        mid = mid + Math.imul(al4, bh6) | 0
        mid = mid + Math.imul(ah4, bl6) | 0
        hi = hi + Math.imul(ah4, bh6) | 0
        lo = lo + Math.imul(al3, bl7) | 0
        mid = mid + Math.imul(al3, bh7) | 0
        mid = mid + Math.imul(ah3, bl7) | 0
        hi = hi + Math.imul(ah3, bh7) | 0
        lo = lo + Math.imul(al2, bl8) | 0
        mid = mid + Math.imul(al2, bh8) | 0
        mid = mid + Math.imul(ah2, bl8) | 0
        hi = hi + Math.imul(ah2, bh8) | 0
        lo = lo + Math.imul(al1, bl9) | 0
        mid = mid + Math.imul(al1, bh9) | 0
        mid = mid + Math.imul(ah1, bl9) | 0
        hi = hi + Math.imul(ah1, bh9) | 0
        let w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0
        w10 &= 67108863
        lo = Math.imul(al9, bl2)
        mid = Math.imul(al9, bh2)
        mid = mid + Math.imul(ah9, bl2) | 0
        hi = Math.imul(ah9, bh2)
        lo = lo + Math.imul(al8, bl3) | 0
        mid = mid + Math.imul(al8, bh3) | 0
        mid = mid + Math.imul(ah8, bl3) | 0
        hi = hi + Math.imul(ah8, bh3) | 0
        lo = lo + Math.imul(al7, bl4) | 0
        mid = mid + Math.imul(al7, bh4) | 0
        mid = mid + Math.imul(ah7, bl4) | 0
        hi = hi + Math.imul(ah7, bh4) | 0
        lo = lo + Math.imul(al6, bl5) | 0
        mid = mid + Math.imul(al6, bh5) | 0
        mid = mid + Math.imul(ah6, bl5) | 0
        hi = hi + Math.imul(ah6, bh5) | 0
        lo = lo + Math.imul(al5, bl6) | 0
        mid = mid + Math.imul(al5, bh6) | 0
        mid = mid + Math.imul(ah5, bl6) | 0
        hi = hi + Math.imul(ah5, bh6) | 0
        lo = lo + Math.imul(al4, bl7) | 0
        mid = mid + Math.imul(al4, bh7) | 0
        mid = mid + Math.imul(ah4, bl7) | 0
        hi = hi + Math.imul(ah4, bh7) | 0
        lo = lo + Math.imul(al3, bl8) | 0
        mid = mid + Math.imul(al3, bh8) | 0
        mid = mid + Math.imul(ah3, bl8) | 0
        hi = hi + Math.imul(ah3, bh8) | 0
        lo = lo + Math.imul(al2, bl9) | 0
        mid = mid + Math.imul(al2, bh9) | 0
        mid = mid + Math.imul(ah2, bl9) | 0
        hi = hi + Math.imul(ah2, bh9) | 0
        let w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0
        w11 &= 67108863
        lo = Math.imul(al9, bl3)
        mid = Math.imul(al9, bh3)
        mid = mid + Math.imul(ah9, bl3) | 0
        hi = Math.imul(ah9, bh3)
        lo = lo + Math.imul(al8, bl4) | 0
        mid = mid + Math.imul(al8, bh4) | 0
        mid = mid + Math.imul(ah8, bl4) | 0
        hi = hi + Math.imul(ah8, bh4) | 0
        lo = lo + Math.imul(al7, bl5) | 0
        mid = mid + Math.imul(al7, bh5) | 0
        mid = mid + Math.imul(ah7, bl5) | 0
        hi = hi + Math.imul(ah7, bh5) | 0
        lo = lo + Math.imul(al6, bl6) | 0
        mid = mid + Math.imul(al6, bh6) | 0
        mid = mid + Math.imul(ah6, bl6) | 0
        hi = hi + Math.imul(ah6, bh6) | 0
        lo = lo + Math.imul(al5, bl7) | 0
        mid = mid + Math.imul(al5, bh7) | 0
        mid = mid + Math.imul(ah5, bl7) | 0
        hi = hi + Math.imul(ah5, bh7) | 0
        lo = lo + Math.imul(al4, bl8) | 0
        mid = mid + Math.imul(al4, bh8) | 0
        mid = mid + Math.imul(ah4, bl8) | 0
        hi = hi + Math.imul(ah4, bh8) | 0
        lo = lo + Math.imul(al3, bl9) | 0
        mid = mid + Math.imul(al3, bh9) | 0
        mid = mid + Math.imul(ah3, bl9) | 0
        hi = hi + Math.imul(ah3, bh9) | 0
        let w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0
        w12 &= 67108863
        lo = Math.imul(al9, bl4)
        mid = Math.imul(al9, bh4)
        mid = mid + Math.imul(ah9, bl4) | 0
        hi = Math.imul(ah9, bh4)
        lo = lo + Math.imul(al8, bl5) | 0
        mid = mid + Math.imul(al8, bh5) | 0
        mid = mid + Math.imul(ah8, bl5) | 0
        hi = hi + Math.imul(ah8, bh5) | 0
        lo = lo + Math.imul(al7, bl6) | 0
        mid = mid + Math.imul(al7, bh6) | 0
        mid = mid + Math.imul(ah7, bl6) | 0
        hi = hi + Math.imul(ah7, bh6) | 0
        lo = lo + Math.imul(al6, bl7) | 0
        mid = mid + Math.imul(al6, bh7) | 0
        mid = mid + Math.imul(ah6, bl7) | 0
        hi = hi + Math.imul(ah6, bh7) | 0
        lo = lo + Math.imul(al5, bl8) | 0
        mid = mid + Math.imul(al5, bh8) | 0
        mid = mid + Math.imul(ah5, bl8) | 0
        hi = hi + Math.imul(ah5, bh8) | 0
        lo = lo + Math.imul(al4, bl9) | 0
        mid = mid + Math.imul(al4, bh9) | 0
        mid = mid + Math.imul(ah4, bl9) | 0
        hi = hi + Math.imul(ah4, bh9) | 0
        let w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0
        w13 &= 67108863
        lo = Math.imul(al9, bl5)
        mid = Math.imul(al9, bh5)
        mid = mid + Math.imul(ah9, bl5) | 0
        hi = Math.imul(ah9, bh5)
        lo = lo + Math.imul(al8, bl6) | 0
        mid = mid + Math.imul(al8, bh6) | 0
        mid = mid + Math.imul(ah8, bl6) | 0
        hi = hi + Math.imul(ah8, bh6) | 0
        lo = lo + Math.imul(al7, bl7) | 0
        mid = mid + Math.imul(al7, bh7) | 0
        mid = mid + Math.imul(ah7, bl7) | 0
        hi = hi + Math.imul(ah7, bh7) | 0
        lo = lo + Math.imul(al6, bl8) | 0
        mid = mid + Math.imul(al6, bh8) | 0
        mid = mid + Math.imul(ah6, bl8) | 0
        hi = hi + Math.imul(ah6, bh8) | 0
        lo = lo + Math.imul(al5, bl9) | 0
        mid = mid + Math.imul(al5, bh9) | 0
        mid = mid + Math.imul(ah5, bl9) | 0
        hi = hi + Math.imul(ah5, bh9) | 0
        let w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0
        w14 &= 67108863
        lo = Math.imul(al9, bl6)
        mid = Math.imul(al9, bh6)
        mid = mid + Math.imul(ah9, bl6) | 0
        hi = Math.imul(ah9, bh6)
        lo = lo + Math.imul(al8, bl7) | 0
        mid = mid + Math.imul(al8, bh7) | 0
        mid = mid + Math.imul(ah8, bl7) | 0
        hi = hi + Math.imul(ah8, bh7) | 0
        lo = lo + Math.imul(al7, bl8) | 0
        mid = mid + Math.imul(al7, bh8) | 0
        mid = mid + Math.imul(ah7, bl8) | 0
        hi = hi + Math.imul(ah7, bh8) | 0
        lo = lo + Math.imul(al6, bl9) | 0
        mid = mid + Math.imul(al6, bh9) | 0
        mid = mid + Math.imul(ah6, bl9) | 0
        hi = hi + Math.imul(ah6, bh9) | 0
        let w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0
        w15 &= 67108863
        lo = Math.imul(al9, bl7)
        mid = Math.imul(al9, bh7)
        mid = mid + Math.imul(ah9, bl7) | 0
        hi = Math.imul(ah9, bh7)
        lo = lo + Math.imul(al8, bl8) | 0
        mid = mid + Math.imul(al8, bh8) | 0
        mid = mid + Math.imul(ah8, bl8) | 0
        hi = hi + Math.imul(ah8, bh8) | 0
        lo = lo + Math.imul(al7, bl9) | 0
        mid = mid + Math.imul(al7, bh9) | 0
        mid = mid + Math.imul(ah7, bl9) | 0
        hi = hi + Math.imul(ah7, bh9) | 0
        let w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0
        w16 &= 67108863
        lo = Math.imul(al9, bl8)
        mid = Math.imul(al9, bh8)
        mid = mid + Math.imul(ah9, bl8) | 0
        hi = Math.imul(ah9, bh8)
        lo = lo + Math.imul(al8, bl9) | 0
        mid = mid + Math.imul(al8, bh9) | 0
        mid = mid + Math.imul(ah8, bl9) | 0
        hi = hi + Math.imul(ah8, bh9) | 0
        let w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0
        w17 &= 67108863
        lo = Math.imul(al9, bl9)
        mid = Math.imul(al9, bh9)
        mid = mid + Math.imul(ah9, bl9) | 0
        hi = Math.imul(ah9, bh9)
        let w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0
        w18 &= 67108863
        o[0] = w0
        o[1] = w1
        o[2] = w2
        o[3] = w3
        o[4] = w4
        o[5] = w5
        o[6] = w6
        o[7] = w7
        o[8] = w8
        o[9] = w9
        o[10] = w10
        o[11] = w11
        o[12] = w12
        o[13] = w13
        o[14] = w14
        o[15] = w15
        o[16] = w16
        o[17] = w17
        o[18] = w18
        if (c !== 0) {
          o[19] = c
          out.length++
        }
        return out
      }
      if (!Math.imul) {
        comb10MulTo = smallMulTo
      }
      function bigMulTo (self, num, out) {
        out.negative = num.negative ^ self.negative
        out.length = self.length + num.length
        let carry = 0
        let hncarry = 0
        for (var k = 0; k < out.length - 1; k++) {
          let ncarry = hncarry
          hncarry = 0
          let rword = carry & 67108863
          const maxJ = Math.min(k, num.length - 1)
          for (let j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            const i = k - j
            const a = self.words[i] | 0
            const b = num.words[j] | 0
            const r = a * b
            let lo = r & 67108863
            ncarry = ncarry + (r / 67108864 | 0) | 0
            lo = lo + rword | 0
            rword = lo & 67108863
            ncarry = ncarry + (lo >>> 26) | 0
            hncarry += ncarry >>> 26
            ncarry &= 67108863
          }
          out.words[k] = rword
          carry = ncarry
          ncarry = hncarry
        }
        if (carry !== 0) {
          out.words[k] = carry
        } else {
          out.length--
        }
        return out._strip()
      }
      function jumboMulTo (self, num, out) {
        return bigMulTo(self, num, out)
      }
      BN2.prototype.mulTo = function mulTo (num, out) {
        let res
        const len = this.length + num.length
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out)
        } else if (len < 63) {
          res = smallMulTo(this, num, out)
        } else if (len < 1024) {
          res = bigMulTo(this, num, out)
        } else {
          res = jumboMulTo(this, num, out)
        }
        return res
      }
      function FFTM (x, y) {
        this.x = x
        this.y = y
      }
      FFTM.prototype.makeRBT = function makeRBT (N) {
        const t = new Array(N)
        const l = BN2.prototype._countBits(N) - 1
        for (let i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N)
        }
        return t
      }
      FFTM.prototype.revBin = function revBin (x, l, N) {
        if (x === 0 || x === N - 1) { return x }
        let rb = 0
        for (let i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1
          x >>= 1
        }
        return rb
      }
      FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
        for (let i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]]
          itws[i] = iws[rbt[i]]
        }
      }
      FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N)
        for (let s = 1; s < N; s <<= 1) {
          const l = s << 1
          const rtwdf = Math.cos(2 * Math.PI / l)
          const itwdf = Math.sin(2 * Math.PI / l)
          for (let p = 0; p < N; p += l) {
            let rtwdf_ = rtwdf
            let itwdf_ = itwdf
            for (let j = 0; j < s; j++) {
              const re = rtws[p + j]
              const ie = itws[p + j]
              let ro = rtws[p + j + s]
              let io = itws[p + j + s]
              let rx = rtwdf_ * ro - itwdf_ * io
              io = rtwdf_ * io + itwdf_ * ro
              ro = rx
              rtws[p + j] = re + ro
              itws[p + j] = ie + io
              rtws[p + j + s] = re - ro
              itws[p + j + s] = ie - io
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_
                rtwdf_ = rx
              }
            }
          }
        }
      }
      FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
        let N = Math.max(m, n) | 1
        const odd = N & 1
        let i = 0
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++
        }
        return 1 << i + 1 + odd
      }
      FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
        if (N <= 1) { return }
        for (let i = 0; i < N / 2; i++) {
          let t = rws[i]
          rws[i] = rws[N - i - 1]
          rws[N - i - 1] = t
          t = iws[i]
          iws[i] = -iws[N - i - 1]
          iws[N - i - 1] = -t
        }
      }
      FFTM.prototype.normalize13b = function normalize13b (ws, N) {
        let carry = 0
        for (let i = 0; i < N / 2; i++) {
          const w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry
          ws[i] = w & 67108863
          if (w < 67108864) {
            carry = 0
          } else {
            carry = w / 67108864 | 0
          }
        }
        return ws
      }
      FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
        let carry = 0
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0)
          rws[2 * i] = carry & 8191
          carry = carry >>> 13
          rws[2 * i + 1] = carry & 8191
          carry = carry >>> 13
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0
        }
        assert(carry === 0)
        assert((carry & ~8191) === 0)
      }
      FFTM.prototype.stub = function stub (N) {
        const ph = new Array(N)
        for (let i = 0; i < N; i++) {
          ph[i] = 0
        }
        return ph
      }
      FFTM.prototype.mulp = function mulp (x, y, out) {
        const N = 2 * this.guessLen13b(x.length, y.length)
        const rbt = this.makeRBT(N)
        const _ = this.stub(N)
        const rws = new Array(N)
        const rwst = new Array(N)
        const iwst = new Array(N)
        const nrws = new Array(N)
        const nrwst = new Array(N)
        const niwst = new Array(N)
        const rmws = out.words
        rmws.length = N
        this.convert13b(x.words, x.length, rws, N)
        this.convert13b(y.words, y.length, nrws, N)
        this.transform(rws, _, rwst, iwst, N, rbt)
        this.transform(nrws, _, nrwst, niwst, N, rbt)
        for (let i = 0; i < N; i++) {
          const rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i]
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i]
          rwst[i] = rx
        }
        this.conjugate(rwst, iwst, N)
        this.transform(rwst, iwst, rmws, _, N, rbt)
        this.conjugate(rmws, _, N)
        this.normalize13b(rmws, N)
        out.negative = x.negative ^ y.negative
        out.length = x.length + y.length
        return out._strip()
      }
      BN2.prototype.mul = function mul (num) {
        const out = new BN2(null)
        out.words = new Array(this.length + num.length)
        return this.mulTo(num, out)
      }
      BN2.prototype.mulf = function mulf (num) {
        const out = new BN2(null)
        out.words = new Array(this.length + num.length)
        return jumboMulTo(this, num, out)
      }
      BN2.prototype.imul = function imul (num) {
        return this.clone().mulTo(num, this)
      }
      BN2.prototype.imuln = function imuln (num) {
        const isNegNum = num < 0
        if (isNegNum) { num = -num }
        assert(typeof num === 'number')
        assert(num < 67108864)
        let carry = 0
        for (var i = 0; i < this.length; i++) {
          const w = (this.words[i] | 0) * num
          const lo = (w & 67108863) + (carry & 67108863)
          carry >>= 26
          carry += w / 67108864 | 0
          carry += lo >>> 26
          this.words[i] = lo & 67108863
        }
        if (carry !== 0) {
          this.words[i] = carry
          this.length++
        }
        return isNegNum ? this.ineg() : this
      }
      BN2.prototype.muln = function muln (num) {
        return this.clone().imuln(num)
      }
      BN2.prototype.sqr = function sqr () {
        return this.mul(this)
      }
      BN2.prototype.isqr = function isqr () {
        return this.imul(this.clone())
      }
      BN2.prototype.pow = function pow (num) {
        const w = toBitArray(num)
        if (w.length === 0) { return new BN2(1) }
        let res = this
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0) { break }
        }
        if (++i < w.length) {
          for (let q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0) { continue }
            res = res.mul(q)
          }
        }
        return res
      }
      BN2.prototype.iushln = function iushln (bits) {
        assert(typeof bits === 'number' && bits >= 0)
        const r = bits % 26
        const s = (bits - r) / 26
        const carryMask = 67108863 >>> 26 - r << 26 - r
        let i
        if (r !== 0) {
          let carry = 0
          for (i = 0; i < this.length; i++) {
            const newCarry = this.words[i] & carryMask
            const c = (this.words[i] | 0) - newCarry << r
            this.words[i] = c | carry
            carry = newCarry >>> 26 - r
          }
          if (carry) {
            this.words[i] = carry
            this.length++
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i]
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0
          }
          this.length += s
        }
        return this._strip()
      }
      BN2.prototype.ishln = function ishln (bits) {
        assert(this.negative === 0)
        return this.iushln(bits)
      }
      BN2.prototype.iushrn = function iushrn (bits, hint, extended) {
        assert(typeof bits === 'number' && bits >= 0)
        let h
        if (hint) {
          h = (hint - hint % 26) / 26
        } else {
          h = 0
        }
        const r = bits % 26
        const s = Math.min((bits - r) / 26, this.length)
        const mask = 67108863 ^ 67108863 >>> r << r
        const maskedWords = extended
        h -= s
        h = Math.max(0, h)
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i]
          }
          maskedWords.length = s
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s]
          }
        } else {
          this.words[0] = 0
          this.length = 1
        }
        let carry = 0
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          const word = this.words[i] | 0
          this.words[i] = carry << 26 - r | word >>> r
          carry = word & mask
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry
        }
        if (this.length === 0) {
          this.words[0] = 0
          this.length = 1
        }
        return this._strip()
      }
      BN2.prototype.ishrn = function ishrn (bits, hint, extended) {
        assert(this.negative === 0)
        return this.iushrn(bits, hint, extended)
      }
      BN2.prototype.shln = function shln (bits) {
        return this.clone().ishln(bits)
      }
      BN2.prototype.ushln = function ushln (bits) {
        return this.clone().iushln(bits)
      }
      BN2.prototype.shrn = function shrn (bits) {
        return this.clone().ishrn(bits)
      }
      BN2.prototype.ushrn = function ushrn (bits) {
        return this.clone().iushrn(bits)
      }
      BN2.prototype.testn = function testn (bit) {
        assert(typeof bit === 'number' && bit >= 0)
        const r = bit % 26
        const s = (bit - r) / 26
        const q = 1 << r
        if (this.length <= s) { return false }
        const w = this.words[s]
        return !!(w & q)
      }
      BN2.prototype.imaskn = function imaskn (bits) {
        assert(typeof bits === 'number' && bits >= 0)
        const r = bits % 26
        let s = (bits - r) / 26
        assert(this.negative === 0, 'imaskn works only with positive numbers')
        if (this.length <= s) {
          return this
        }
        if (r !== 0) {
          s++
        }
        this.length = Math.min(s, this.length)
        if (r !== 0) {
          const mask = 67108863 ^ 67108863 >>> r << r
          this.words[this.length - 1] &= mask
        }
        return this._strip()
      }
      BN2.prototype.maskn = function maskn (bits) {
        return this.clone().imaskn(bits)
      }
      BN2.prototype.iaddn = function iaddn (num) {
        assert(typeof num === 'number')
        assert(num < 67108864)
        if (num < 0) { return this.isubn(-num) }
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) <= num) {
            this.words[0] = num - (this.words[0] | 0)
            this.negative = 0
            return this
          }
          this.negative = 0
          this.isubn(num)
          this.negative = 1
          return this
        }
        return this._iaddn(num)
      }
      BN2.prototype._iaddn = function _iaddn (num) {
        this.words[0] += num
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864
          if (i === this.length - 1) {
            this.words[i + 1] = 1
          } else {
            this.words[i + 1]++
          }
        }
        this.length = Math.max(this.length, i + 1)
        return this
      }
      BN2.prototype.isubn = function isubn (num) {
        assert(typeof num === 'number')
        assert(num < 67108864)
        if (num < 0) { return this.iaddn(-num) }
        if (this.negative !== 0) {
          this.negative = 0
          this.iaddn(num)
          this.negative = 1
          return this
        }
        this.words[0] -= num
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0]
          this.negative = 1
        } else {
          for (let i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864
            this.words[i + 1] -= 1
          }
        }
        return this._strip()
      }
      BN2.prototype.addn = function addn (num) {
        return this.clone().iaddn(num)
      }
      BN2.prototype.subn = function subn (num) {
        return this.clone().isubn(num)
      }
      BN2.prototype.iabs = function iabs () {
        this.negative = 0
        return this
      }
      BN2.prototype.abs = function abs () {
        return this.clone().iabs()
      }
      BN2.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
        const len = num.length + shift
        let i
        this._expand(len)
        let w
        let carry = 0
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry
          const right = (num.words[i] | 0) * mul
          w -= right & 67108863
          carry = (w >> 26) - (right / 67108864 | 0)
          this.words[i + shift] = w & 67108863
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry
          carry = w >> 26
          this.words[i + shift] = w & 67108863
        }
        if (carry === 0) { return this._strip() }
        assert(carry === -1)
        carry = 0
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry
          carry = w >> 26
          this.words[i] = w & 67108863
        }
        this.negative = 1
        return this._strip()
      }
      BN2.prototype._wordDiv = function _wordDiv (num, mode) {
        let shift = this.length - num.length
        let a = this.clone()
        let b = num
        let bhi = b.words[b.length - 1] | 0
        const bhiBits = this._countBits(bhi)
        shift = 26 - bhiBits
        if (shift !== 0) {
          b = b.ushln(shift)
          a.iushln(shift)
          bhi = b.words[b.length - 1] | 0
        }
        const m = a.length - b.length
        let q
        if (mode !== 'mod') {
          q = new BN2(null)
          q.length = m + 1
          q.words = new Array(q.length)
          for (let i = 0; i < q.length; i++) {
            q.words[i] = 0
          }
        }
        const diff = a.clone()._ishlnsubmul(b, 1, m)
        if (diff.negative === 0) {
          a = diff
          if (q) {
            q.words[m] = 1
          }
        }
        for (let j = m - 1; j >= 0; j--) {
          let qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0)
          qj = Math.min(qj / bhi | 0, 67108863)
          a._ishlnsubmul(b, qj, j)
          while (a.negative !== 0) {
            qj--
            a.negative = 0
            a._ishlnsubmul(b, 1, j)
            if (!a.isZero()) {
              a.negative ^= 1
            }
          }
          if (q) {
            q.words[j] = qj
          }
        }
        if (q) {
          q._strip()
        }
        a._strip()
        if (mode !== 'div' && shift !== 0) {
          a.iushrn(shift)
        }
        return {
          div: q || null,
          mod: a
        }
      }
      BN2.prototype.divmod = function divmod (num, mode, positive) {
        assert(!num.isZero())
        if (this.isZero()) {
          return {
            div: new BN2(0),
            mod: new BN2(0)
          }
        }
        let div, mod, res
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode)
          if (mode !== 'mod') {
            div = res.div.neg()
          }
          if (mode !== 'div') {
            mod = res.mod.neg()
            if (positive && mod.negative !== 0) {
              mod.iadd(num)
            }
          }
          return {
            div,
            mod
          }
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode)
          if (mode !== 'mod') {
            div = res.div.neg()
          }
          return {
            div,
            mod: res.mod
          }
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode)
          if (mode !== 'div') {
            mod = res.mod.neg()
            if (positive && mod.negative !== 0) {
              mod.isub(num)
            }
          }
          return {
            div: res.div,
            mod
          }
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN2(0),
            mod: this
          }
        }
        if (num.length === 1) {
          if (mode === 'div') {
            return {
              div: this.divn(num.words[0]),
              mod: null
            }
          }
          if (mode === 'mod') {
            return {
              div: null,
              mod: new BN2(this.modrn(num.words[0]))
            }
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN2(this.modrn(num.words[0]))
          }
        }
        return this._wordDiv(num, mode)
      }
      BN2.prototype.div = function div (num) {
        return this.divmod(num, 'div', false).div
      }
      BN2.prototype.mod = function mod (num) {
        return this.divmod(num, 'mod', false).mod
      }
      BN2.prototype.umod = function umod (num) {
        return this.divmod(num, 'mod', true).mod
      }
      BN2.prototype.divRound = function divRound (num) {
        const dm = this.divmod(num)
        if (dm.mod.isZero()) { return dm.div }
        const mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod
        const half = num.ushrn(1)
        const r2 = num.andln(1)
        const cmp = mod.cmp(half)
        if (cmp < 0 || r2 === 1 && cmp === 0) { return dm.div }
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1)
      }
      BN2.prototype.modrn = function modrn (num) {
        const isNegNum = num < 0
        if (isNegNum) { num = -num }
        assert(num <= 67108863)
        const p = (1 << 26) % num
        let acc = 0
        for (let i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num
        }
        return isNegNum ? -acc : acc
      }
      BN2.prototype.modn = function modn (num) {
        return this.modrn(num)
      }
      BN2.prototype.idivn = function idivn (num) {
        const isNegNum = num < 0
        if (isNegNum) { num = -num }
        assert(num <= 67108863)
        let carry = 0
        for (let i = this.length - 1; i >= 0; i--) {
          const w = (this.words[i] | 0) + carry * 67108864
          this.words[i] = w / num | 0
          carry = w % num
        }
        this._strip()
        return isNegNum ? this.ineg() : this
      }
      BN2.prototype.divn = function divn (num) {
        return this.clone().idivn(num)
      }
      BN2.prototype.egcd = function egcd (p) {
        assert(p.negative === 0)
        assert(!p.isZero())
        let x = this
        const y = p.clone()
        if (x.negative !== 0) {
          x = x.umod(p)
        } else {
          x = x.clone()
        }
        const A = new BN2(1)
        const B = new BN2(0)
        const C = new BN2(0)
        const D = new BN2(1)
        let g = 0
        while (x.isEven() && y.isEven()) {
          x.iushrn(1)
          y.iushrn(1)
          ++g
        }
        const yp = y.clone()
        const xp = x.clone()
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
            ;
          if (i > 0) {
            x.iushrn(i)
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp)
                B.isub(xp)
              }
              A.iushrn(1)
              B.iushrn(1)
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
            ;
          if (j > 0) {
            y.iushrn(j)
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp)
                D.isub(xp)
              }
              C.iushrn(1)
              D.iushrn(1)
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y)
            A.isub(C)
            B.isub(D)
          } else {
            y.isub(x)
            C.isub(A)
            D.isub(B)
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        }
      }
      BN2.prototype._invmp = function _invmp (p) {
        assert(p.negative === 0)
        assert(!p.isZero())
        let a = this
        const b = p.clone()
        if (a.negative !== 0) {
          a = a.umod(p)
        } else {
          a = a.clone()
        }
        const x1 = new BN2(1)
        const x2 = new BN2(0)
        const delta = b.clone()
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
            ;
          if (i > 0) {
            a.iushrn(i)
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta)
              }
              x1.iushrn(1)
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
            ;
          if (j > 0) {
            b.iushrn(j)
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta)
              }
              x2.iushrn(1)
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b)
            x1.isub(x2)
          } else {
            b.isub(a)
            x2.isub(x1)
          }
        }
        let res
        if (a.cmpn(1) === 0) {
          res = x1
        } else {
          res = x2
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p)
        }
        return res
      }
      BN2.prototype.gcd = function gcd (num) {
        if (this.isZero()) { return num.abs() }
        if (num.isZero()) { return this.abs() }
        let a = this.clone()
        let b = num.clone()
        a.negative = 0
        b.negative = 0
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1)
          b.iushrn(1)
        }
        do {
          while (a.isEven()) {
            a.iushrn(1)
          }
          while (b.isEven()) {
            b.iushrn(1)
          }
          const r = a.cmp(b)
          if (r < 0) {
            const t = a
            a = b
            b = t
          } else if (r === 0 || b.cmpn(1) === 0) {
            break
          }
          a.isub(b)
        } while (true)
        return b.iushln(shift)
      }
      BN2.prototype.invm = function invm (num) {
        return this.egcd(num).a.umod(num)
      }
      BN2.prototype.isEven = function isEven () {
        return (this.words[0] & 1) === 0
      }
      BN2.prototype.isOdd = function isOdd () {
        return (this.words[0] & 1) === 1
      }
      BN2.prototype.andln = function andln (num) {
        return this.words[0] & num
      }
      BN2.prototype.bincn = function bincn (bit) {
        assert(typeof bit === 'number')
        const r = bit % 26
        const s = (bit - r) / 26
        const q = 1 << r
        if (this.length <= s) {
          this._expand(s + 1)
          this.words[s] |= q
          return this
        }
        let carry = q
        for (var i = s; carry !== 0 && i < this.length; i++) {
          let w = this.words[i] | 0
          w += carry
          carry = w >>> 26
          w &= 67108863
          this.words[i] = w
        }
        if (carry !== 0) {
          this.words[i] = carry
          this.length++
        }
        return this
      }
      BN2.prototype.isZero = function isZero () {
        return this.length === 1 && this.words[0] === 0
      }
      BN2.prototype.cmpn = function cmpn (num) {
        const negative = num < 0
        if (this.negative !== 0 && !negative) { return -1 }
        if (this.negative === 0 && negative) { return 1 }
        this._strip()
        let res
        if (this.length > 1) {
          res = 1
        } else {
          if (negative) {
            num = -num
          }
          assert(num <= 67108863, 'Number is too big')
          const w = this.words[0] | 0
          res = w === num ? 0 : w < num ? -1 : 1
        }
        if (this.negative !== 0) { return -res | 0 }
        return res
      }
      BN2.prototype.cmp = function cmp (num) {
        if (this.negative !== 0 && num.negative === 0) { return -1 }
        if (this.negative === 0 && num.negative !== 0) { return 1 }
        const res = this.ucmp(num)
        if (this.negative !== 0) { return -res | 0 }
        return res
      }
      BN2.prototype.ucmp = function ucmp (num) {
        if (this.length > num.length) { return 1 }
        if (this.length < num.length) { return -1 }
        let res = 0
        for (let i = this.length - 1; i >= 0; i--) {
          const a = this.words[i] | 0
          const b = num.words[i] | 0
          if (a === b) { continue }
          if (a < b) {
            res = -1
          } else if (a > b) {
            res = 1
          }
          break
        }
        return res
      }
      BN2.prototype.gtn = function gtn (num) {
        return this.cmpn(num) === 1
      }
      BN2.prototype.gt = function gt (num) {
        return this.cmp(num) === 1
      }
      BN2.prototype.gten = function gten (num) {
        return this.cmpn(num) >= 0
      }
      BN2.prototype.gte = function gte (num) {
        return this.cmp(num) >= 0
      }
      BN2.prototype.ltn = function ltn (num) {
        return this.cmpn(num) === -1
      }
      BN2.prototype.lt = function lt (num) {
        return this.cmp(num) === -1
      }
      BN2.prototype.lten = function lten (num) {
        return this.cmpn(num) <= 0
      }
      BN2.prototype.lte = function lte (num) {
        return this.cmp(num) <= 0
      }
      BN2.prototype.eqn = function eqn (num) {
        return this.cmpn(num) === 0
      }
      BN2.prototype.eq = function eq (num) {
        return this.cmp(num) === 0
      }
      BN2.red = function red (num) {
        return new Red(num)
      }
      BN2.prototype.toRed = function toRed (ctx) {
        assert(!this.red, 'Already a number in reduction context')
        assert(this.negative === 0, 'red works only with positives')
        return ctx.convertTo(this)._forceRed(ctx)
      }
      BN2.prototype.fromRed = function fromRed () {
        assert(this.red, 'fromRed works only with numbers in reduction context')
        return this.red.convertFrom(this)
      }
      BN2.prototype._forceRed = function _forceRed (ctx) {
        this.red = ctx
        return this
      }
      BN2.prototype.forceRed = function forceRed (ctx) {
        assert(!this.red, 'Already a number in reduction context')
        return this._forceRed(ctx)
      }
      BN2.prototype.redAdd = function redAdd (num) {
        assert(this.red, 'redAdd works only with red numbers')
        return this.red.add(this, num)
      }
      BN2.prototype.redIAdd = function redIAdd (num) {
        assert(this.red, 'redIAdd works only with red numbers')
        return this.red.iadd(this, num)
      }
      BN2.prototype.redSub = function redSub (num) {
        assert(this.red, 'redSub works only with red numbers')
        return this.red.sub(this, num)
      }
      BN2.prototype.redISub = function redISub (num) {
        assert(this.red, 'redISub works only with red numbers')
        return this.red.isub(this, num)
      }
      BN2.prototype.redShl = function redShl (num) {
        assert(this.red, 'redShl works only with red numbers')
        return this.red.shl(this, num)
      }
      BN2.prototype.redMul = function redMul (num) {
        assert(this.red, 'redMul works only with red numbers')
        this.red._verify2(this, num)
        return this.red.mul(this, num)
      }
      BN2.prototype.redIMul = function redIMul (num) {
        assert(this.red, 'redMul works only with red numbers')
        this.red._verify2(this, num)
        return this.red.imul(this, num)
      }
      BN2.prototype.redSqr = function redSqr () {
        assert(this.red, 'redSqr works only with red numbers')
        this.red._verify1(this)
        return this.red.sqr(this)
      }
      BN2.prototype.redISqr = function redISqr () {
        assert(this.red, 'redISqr works only with red numbers')
        this.red._verify1(this)
        return this.red.isqr(this)
      }
      BN2.prototype.redSqrt = function redSqrt () {
        assert(this.red, 'redSqrt works only with red numbers')
        this.red._verify1(this)
        return this.red.sqrt(this)
      }
      BN2.prototype.redInvm = function redInvm () {
        assert(this.red, 'redInvm works only with red numbers')
        this.red._verify1(this)
        return this.red.invm(this)
      }
      BN2.prototype.redNeg = function redNeg () {
        assert(this.red, 'redNeg works only with red numbers')
        this.red._verify1(this)
        return this.red.neg(this)
      }
      BN2.prototype.redPow = function redPow (num) {
        assert(this.red && !num.red, 'redPow(normalNum)')
        this.red._verify1(this)
        return this.red.pow(this, num)
      }
      const primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      }
      function MPrime (name, p) {
        this.name = name
        this.p = new BN2(p, 16)
        this.n = this.p.bitLength()
        this.k = new BN2(1).iushln(this.n).isub(this.p)
        this.tmp = this._tmp()
      }
      MPrime.prototype._tmp = function _tmp () {
        const tmp = new BN2(null)
        tmp.words = new Array(Math.ceil(this.n / 13))
        return tmp
      }
      MPrime.prototype.ireduce = function ireduce (num) {
        let r = num
        let rlen
        do {
          this.split(r, this.tmp)
          r = this.imulK(r)
          r = r.iadd(this.tmp)
          rlen = r.bitLength()
        } while (rlen > this.n)
        const cmp = rlen < this.n ? -1 : r.ucmp(this.p)
        if (cmp === 0) {
          r.words[0] = 0
          r.length = 1
        } else if (cmp > 0) {
          r.isub(this.p)
        } else {
          if (r.strip !== void 0) {
            r.strip()
          } else {
            r._strip()
          }
        }
        return r
      }
      MPrime.prototype.split = function split (input, out) {
        input.iushrn(this.n, 0, out)
      }
      MPrime.prototype.imulK = function imulK (num) {
        return num.imul(this.k)
      }
      function K256 () {
        MPrime.call(this, 'k256', 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f')
      }
      inherits(K256, MPrime)
      K256.prototype.split = function split (input, output) {
        const mask = 4194303
        const outLen = Math.min(input.length, 9)
        for (var i = 0; i < outLen; i++) {
          output.words[i] = input.words[i]
        }
        output.length = outLen
        if (input.length <= 9) {
          input.words[0] = 0
          input.length = 1
          return
        }
        let prev = input.words[9]
        output.words[output.length++] = prev & mask
        for (i = 10; i < input.length; i++) {
          const next = input.words[i] | 0
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22
          prev = next
        }
        prev >>>= 22
        input.words[i - 10] = prev
        if (prev === 0 && input.length > 10) {
          input.length -= 10
        } else {
          input.length -= 9
        }
      }
      K256.prototype.imulK = function imulK (num) {
        num.words[num.length] = 0
        num.words[num.length + 1] = 0
        num.length += 2
        let lo = 0
        for (let i = 0; i < num.length; i++) {
          const w = num.words[i] | 0
          lo += w * 977
          num.words[i] = lo & 67108863
          lo = w * 64 + (lo / 67108864 | 0)
        }
        if (num.words[num.length - 1] === 0) {
          num.length--
          if (num.words[num.length - 1] === 0) {
            num.length--
          }
        }
        return num
      }
      function P224 () {
        MPrime.call(this, 'p224', 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001')
      }
      inherits(P224, MPrime)
      function P192 () {
        MPrime.call(this, 'p192', 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff')
      }
      inherits(P192, MPrime)
      function P25519 () {
        MPrime.call(this, '25519', '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed')
      }
      inherits(P25519, MPrime)
      P25519.prototype.imulK = function imulK (num) {
        let carry = 0
        for (let i = 0; i < num.length; i++) {
          let hi = (num.words[i] | 0) * 19 + carry
          const lo = hi & 67108863
          hi >>>= 26
          num.words[i] = lo
          carry = hi
        }
        if (carry !== 0) {
          num.words[num.length++] = carry
        }
        return num
      }
      BN2._prime = function prime (name) {
        if (primes[name]) { return primes[name] }
        let prime2
        if (name === 'k256') {
          prime2 = new K256()
        } else if (name === 'p224') {
          prime2 = new P224()
        } else if (name === 'p192') {
          prime2 = new P192()
        } else if (name === 'p25519') {
          prime2 = new P25519()
        } else {
          throw new Error('Unknown prime ' + name)
        }
        primes[name] = prime2
        return prime2
      }
      function Red (m) {
        if (typeof m === 'string') {
          const prime = BN2._prime(m)
          this.m = prime.p
          this.prime = prime
        } else {
          assert(m.gtn(1), 'modulus must be greater than 1')
          this.m = m
          this.prime = null
        }
      }
      Red.prototype._verify1 = function _verify1 (a) {
        assert(a.negative === 0, 'red works only with positives')
        assert(a.red, 'red works only with red numbers')
      }
      Red.prototype._verify2 = function _verify2 (a, b) {
        assert((a.negative | b.negative) === 0, 'red works only with positives')
        assert(a.red && a.red === b.red, 'red works only with red numbers')
      }
      Red.prototype.imod = function imod (a) {
        if (this.prime) { return this.prime.ireduce(a)._forceRed(this) }
        move(a, a.umod(this.m)._forceRed(this))
        return a
      }
      Red.prototype.neg = function neg (a) {
        if (a.isZero()) {
          return a.clone()
        }
        return this.m.sub(a)._forceRed(this)
      }
      Red.prototype.add = function add (a, b) {
        this._verify2(a, b)
        const res = a.add(b)
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m)
        }
        return res._forceRed(this)
      }
      Red.prototype.iadd = function iadd (a, b) {
        this._verify2(a, b)
        const res = a.iadd(b)
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m)
        }
        return res
      }
      Red.prototype.sub = function sub (a, b) {
        this._verify2(a, b)
        const res = a.sub(b)
        if (res.cmpn(0) < 0) {
          res.iadd(this.m)
        }
        return res._forceRed(this)
      }
      Red.prototype.isub = function isub (a, b) {
        this._verify2(a, b)
        const res = a.isub(b)
        if (res.cmpn(0) < 0) {
          res.iadd(this.m)
        }
        return res
      }
      Red.prototype.shl = function shl (a, num) {
        this._verify1(a)
        return this.imod(a.ushln(num))
      }
      Red.prototype.imul = function imul (a, b) {
        this._verify2(a, b)
        return this.imod(a.imul(b))
      }
      Red.prototype.mul = function mul (a, b) {
        this._verify2(a, b)
        return this.imod(a.mul(b))
      }
      Red.prototype.isqr = function isqr (a) {
        return this.imul(a, a.clone())
      }
      Red.prototype.sqr = function sqr (a) {
        return this.mul(a, a)
      }
      Red.prototype.sqrt = function sqrt (a) {
        if (a.isZero()) { return a.clone() }
        const mod3 = this.m.andln(3)
        assert(mod3 % 2 === 1)
        if (mod3 === 3) {
          const pow = this.m.add(new BN2(1)).iushrn(2)
          return this.pow(a, pow)
        }
        const q = this.m.subn(1)
        let s = 0
        while (!q.isZero() && q.andln(1) === 0) {
          s++
          q.iushrn(1)
        }
        assert(!q.isZero())
        const one = new BN2(1).toRed(this)
        const nOne = one.redNeg()
        const lpow = this.m.subn(1).iushrn(1)
        let z = this.m.bitLength()
        z = new BN2(2 * z * z).toRed(this)
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne)
        }
        let c = this.pow(z, q)
        let r = this.pow(a, q.addn(1).iushrn(1))
        let t = this.pow(a, q)
        let m = s
        while (t.cmp(one) !== 0) {
          let tmp = t
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr()
          }
          assert(i < m)
          const b = this.pow(c, new BN2(1).iushln(m - i - 1))
          r = r.redMul(b)
          c = b.redSqr()
          t = t.redMul(c)
          m = i
        }
        return r
      }
      Red.prototype.invm = function invm (a) {
        const inv = a._invmp(this.m)
        if (inv.negative !== 0) {
          inv.negative = 0
          return this.imod(inv).redNeg()
        } else {
          return this.imod(inv)
        }
      }
      Red.prototype.pow = function pow (a, num) {
        if (num.isZero()) { return new BN2(1).toRed(this) }
        if (num.cmpn(1) === 0) { return a.clone() }
        const windowSize = 4
        const wnd = new Array(1 << windowSize)
        wnd[0] = new BN2(1).toRed(this)
        wnd[1] = a
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a)
        }
        let res = wnd[0]
        let current = 0
        let currentLen = 0
        let start = num.bitLength() % 26
        if (start === 0) {
          start = 26
        }
        for (i = num.length - 1; i >= 0; i--) {
          const word = num.words[i]
          for (let j = start - 1; j >= 0; j--) {
            const bit = word >> j & 1
            if (res !== wnd[0]) {
              res = this.sqr(res)
            }
            if (bit === 0 && current === 0) {
              currentLen = 0
              continue
            }
            current <<= 1
            current |= bit
            currentLen++
            if (currentLen !== windowSize && (i !== 0 || j !== 0)) { continue }
            res = this.mul(res, wnd[current])
            currentLen = 0
            current = 0
          }
          start = 26
        }
        return res
      }
      Red.prototype.convertTo = function convertTo (num) {
        const r = num.umod(this.m)
        return r === num ? r.clone() : r
      }
      Red.prototype.convertFrom = function convertFrom (num) {
        const res = num.clone()
        res.red = null
        return res
      }
      BN2.mont = function mont (num) {
        return new Mont(num)
      }
      function Mont (m) {
        Red.call(this, m)
        this.shift = this.m.bitLength()
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26
        }
        this.r = new BN2(1).iushln(this.shift)
        this.r2 = this.imod(this.r.sqr())
        this.rinv = this.r._invmp(this.m)
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)
        this.minv = this.minv.umod(this.r)
        this.minv = this.r.sub(this.minv)
      }
      inherits(Mont, Red)
      Mont.prototype.convertTo = function convertTo (num) {
        return this.imod(num.ushln(this.shift))
      }
      Mont.prototype.convertFrom = function convertFrom (num) {
        const r = this.imod(num.mul(this.rinv))
        r.red = null
        return r
      }
      Mont.prototype.imul = function imul (a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0
          a.length = 1
          return a
        }
        const t = a.imul(b)
        const c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
        const u = t.isub(c).iushrn(this.shift)
        let res = u
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m)
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m)
        }
        return res._forceRed(this)
      }
      Mont.prototype.mul = function mul (a, b) {
        if (a.isZero() || b.isZero()) { return new BN2(0)._forceRed(this) }
        const t = a.mul(b)
        const c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
        const u = t.isub(c).iushrn(this.shift)
        let res = u
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m)
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m)
        }
        return res._forceRed(this)
      }
      Mont.prototype.invm = function invm (a) {
        const res = this.imod(a._invmp(this.m).mul(this.r2))
        return res._forceRed(this)
      }
    })(typeof module === 'undefined' || module, exports)
  }
})

// node_modules/base64-js/index.js
const require_base64_js = __commonJS({
  'node_modules/base64-js/index.js' (exports) {
    'use strict'
    exports.byteLength = byteLength
    exports.toByteArray = toByteArray
    exports.fromByteArray = fromByteArray
    const lookup = []
    const revLookup = []
    const Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
    const code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    for (let i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i]
      revLookup[code.charCodeAt(i)] = i
    }
    revLookup['-'.charCodeAt(0)] = 62
    revLookup['_'.charCodeAt(0)] = 63
    function getLens (b64) {
      const len2 = b64.length
      if (len2 % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4')
      }
      let validLen = b64.indexOf('=')
      if (validLen === -1) { validLen = len2 }
      const placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4
      return [validLen, placeHoldersLen]
    }
    function byteLength (b64) {
      const lens = getLens(b64)
      const validLen = lens[0]
      const placeHoldersLen = lens[1]
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen
    }
    function _byteLength (b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen
    }
    function toByteArray (b64) {
      let tmp
      const lens = getLens(b64)
      const validLen = lens[0]
      const placeHoldersLen = lens[1]
      const arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))
      let curByte = 0
      const len2 = placeHoldersLen > 0 ? validLen - 4 : validLen
      let i2
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)]
        arr[curByte++] = tmp >> 16 & 255
        arr[curByte++] = tmp >> 8 & 255
        arr[curByte++] = tmp & 255
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4
        arr[curByte++] = tmp & 255
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2
        arr[curByte++] = tmp >> 8 & 255
        arr[curByte++] = tmp & 255
      }
      return arr
    }
    function tripletToBase64 (num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63]
    }
    function encodeChunk (uint8, start, end) {
      let tmp
      const output = []
      for (let i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255)
        output.push(tripletToBase64(tmp))
      }
      return output.join('')
    }
    function fromByteArray (uint8) {
      let tmp
      const len2 = uint8.length
      const extraBytes = len2 % 3
      const parts = []
      const maxChunkLength = 16383
      for (let i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength))
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1]
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + '==')
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1]
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + '=')
      }
      return parts.join('')
    }
  }
})

// node_modules/ieee754/index.js
const require_ieee754 = __commonJS({
  'node_modules/ieee754/index.js' (exports) {
    exports.read = function (buffer, offset, isLE, mLen, nBytes) {
      let e, m
      const eLen = nBytes * 8 - mLen - 1
      const eMax = (1 << eLen) - 1
      const eBias = eMax >> 1
      let nBits = -7
      let i = isLE ? nBytes - 1 : 0
      const d = isLE ? -1 : 1
      let s = buffer[offset + i]
      i += d
      e = s & (1 << -nBits) - 1
      s >>= -nBits
      nBits += eLen
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1
      e >>= -nBits
      nBits += mLen
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity
      } else {
        m = m + Math.pow(2, mLen)
        e = e - eBias
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
    }
    exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      let e, m, c
      let eLen = nBytes * 8 - mLen - 1
      const eMax = (1 << eLen) - 1
      const eBias = eMax >> 1
      const rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0
      let i = isLE ? 0 : nBytes - 1
      const d = isLE ? 1 : -1
      const s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
      value = Math.abs(value)
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0
        e = eMax
      } else {
        e = Math.floor(Math.log(value) / Math.LN2)
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--
          c *= 2
        }
        if (e + eBias >= 1) {
          value += rt / c
        } else {
          value += rt * Math.pow(2, 1 - eBias)
        }
        if (value * c >= 2) {
          e++
          c /= 2
        }
        if (e + eBias >= eMax) {
          m = 0
          e = eMax
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen)
          e = e + eBias
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
          e = 0
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m
      eLen += mLen
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128
    }
  }
})

// node_modules/buffer/index.js
const require_buffer2 = __commonJS({
  'node_modules/buffer/index.js' (exports) {
    'use strict'
    const base64 = require_base64_js()
    const ieee754 = require_ieee754()
    const customInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : null
    exports.Buffer = Buffer2
    exports.SlowBuffer = SlowBuffer
    exports.INSPECT_MAX_BYTES = 50
    const K_MAX_LENGTH = 2147483647
    exports.kMaxLength = K_MAX_LENGTH
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport()
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error('This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.')
    }
    function typedArraySupport () {
      try {
        const arr = new Uint8Array(1)
        const proto = {
          foo: function () {
            return 42
          }
        }
        Object.setPrototypeOf(proto, Uint8Array.prototype)
        Object.setPrototypeOf(arr, proto)
        return arr.foo() === 42
      } catch (e) {
        return false
      }
    }
    Object.defineProperty(Buffer2.prototype, 'parent', {
      enumerable: true,
      get: function () {
        if (!Buffer2.isBuffer(this)) { return void 0 }
        return this.buffer
      }
    })
    Object.defineProperty(Buffer2.prototype, 'offset', {
      enumerable: true,
      get: function () {
        if (!Buffer2.isBuffer(this)) { return void 0 }
        return this.byteOffset
      }
    })
    function createBuffer (length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"')
      }
      const buf = new Uint8Array(length)
      Object.setPrototypeOf(buf, Buffer2.prototype)
      return buf
    }
    function Buffer2 (arg, encodingOrOffset, length) {
      if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
          throw new TypeError('The "string" argument must be of type string. Received type number')
        }
        return allocUnsafe(arg)
      }
      return from(arg, encodingOrOffset, length)
    }
    Buffer2.poolSize = 8192
    function from (value, encodingOrOffset, length) {
      if (typeof value === 'string') {
        return fromString(value, encodingOrOffset)
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value)
      }
      if (value == null) {
        throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof value)
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length)
      }
      if (typeof SharedArrayBuffer !== 'undefined' && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length)
      }
      if (typeof value === 'number') {
        throw new TypeError('The "value" argument must not be of type number. Received type number')
      }
      const valueOf = value.valueOf && value.valueOf()
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length)
      }
      const b = fromObject(value)
      if (b) { return b }
      if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') {
        return Buffer2.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
      }
      throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof value)
    }
    Buffer2.from = function (value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length)
    }
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype)
    Object.setPrototypeOf(Buffer2, Uint8Array)
    function assertSize (size) {
      if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be of type number')
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"')
      }
    }
    function alloc (size, fill, encoding2) {
      assertSize(size)
      if (size <= 0) {
        return createBuffer(size)
      }
      if (fill !== void 0) {
        return typeof encoding2 === 'string' ? createBuffer(size).fill(fill, encoding2) : createBuffer(size).fill(fill)
      }
      return createBuffer(size)
    }
    Buffer2.alloc = function (size, fill, encoding2) {
      return alloc(size, fill, encoding2)
    }
    function allocUnsafe (size) {
      assertSize(size)
      return createBuffer(size < 0 ? 0 : checked(size) | 0)
    }
    Buffer2.allocUnsafe = function (size) {
      return allocUnsafe(size)
    }
    Buffer2.allocUnsafeSlow = function (size) {
      return allocUnsafe(size)
    }
    function fromString (string, encoding2) {
      if (typeof encoding2 !== 'string' || encoding2 === '') {
        encoding2 = 'utf8'
      }
      if (!Buffer2.isEncoding(encoding2)) {
        throw new TypeError('Unknown encoding: ' + encoding2)
      }
      const length = byteLength(string, encoding2) | 0
      let buf = createBuffer(length)
      const actual = buf.write(string, encoding2)
      if (actual !== length) {
        buf = buf.slice(0, actual)
      }
      return buf
    }
    function fromArrayLike (array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0
      const buf = createBuffer(length)
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255
      }
      return buf
    }
    function fromArrayView (arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView)
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
      }
      return fromArrayLike(arrayView)
    }
    function fromArrayBuffer (array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds')
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds')
      }
      let buf
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array)
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset)
      } else {
        buf = new Uint8Array(array, byteOffset, length)
      }
      Object.setPrototypeOf(buf, Buffer2.prototype)
      return buf
    }
    function fromObject (obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0
        const buf = createBuffer(len)
        if (buf.length === 0) {
          return buf
        }
        obj.copy(buf, 0, 0, len)
        return buf
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
          return createBuffer(0)
        }
        return fromArrayLike(obj)
      }
      if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data)
      }
    }
    function checked (length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
      }
      return length | 0
    }
    function SlowBuffer (length) {
      if (+length != length) {
        length = 0
      }
      return Buffer2.alloc(+length)
    }
    Buffer2.isBuffer = function isBuffer (b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype
    }
    Buffer2.compare = function compare (a, b) {
      if (isInstance(a, Uint8Array)) { a = Buffer2.from(a, a.offset, a.byteLength) }
      if (isInstance(b, Uint8Array)) { b = Buffer2.from(b, b.offset, b.byteLength) }
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array')
      }
      if (a === b) { return 0 }
      let x = a.length
      let y = b.length
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i]
          y = b[i]
          break
        }
      }
      if (x < y) { return -1 }
      if (y < x) { return 1 }
      return 0
    }
    Buffer2.isEncoding = function isEncoding (encoding2) {
      switch (String(encoding2).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return true
        default:
          return false
      }
    }
    Buffer2.concat = function concat (list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
      if (list.length === 0) {
        return Buffer2.alloc(0)
      }
      let i
      if (length === void 0) {
        length = 0
        for (i = 0; i < list.length; ++i) {
          length += list[i].length
        }
      }
      const buffer = Buffer2.allocUnsafe(length)
      let pos = 0
      for (i = 0; i < list.length; ++i) {
        let buf = list[i]
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer2.isBuffer(buf)) { buf = Buffer2.from(buf) }
            buf.copy(buffer, pos)
          } else {
            Uint8Array.prototype.set.call(buffer, buf, pos)
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers')
        } else {
          buf.copy(buffer, pos)
        }
        pos += buf.length
      }
      return buffer
    }
    function byteLength (string, encoding2) {
      if (Buffer2.isBuffer(string)) {
        return string.length
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength
      }
      if (typeof string !== 'string') {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string)
      }
      const len = string.length
      const mustMatch = arguments.length > 2 && arguments[2] === true
      if (!mustMatch && len === 0) { return 0 }
      let loweredCase = false
      for (; ;) {
        switch (encoding2) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return len
          case 'utf8':
          case 'utf-8':
            return utf8ToBytes(string).length
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return len * 2
          case 'hex':
            return len >>> 1
          case 'base64':
            return base64ToBytes(string).length
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length
            }
            encoding2 = ('' + encoding2).toLowerCase()
            loweredCase = true
        }
      }
    }
    Buffer2.byteLength = byteLength
    function slowToString (encoding2, start, end) {
      let loweredCase = false
      if (start === void 0 || start < 0) {
        start = 0
      }
      if (start > this.length) {
        return ''
      }
      if (end === void 0 || end > this.length) {
        end = this.length
      }
      if (end <= 0) {
        return ''
      }
      end >>>= 0
      start >>>= 0
      if (end <= start) {
        return ''
      }
      if (!encoding2) { encoding2 = 'utf8' }
      while (true) {
        switch (encoding2) {
          case 'hex':
            return hexSlice(this, start, end)
          case 'utf8':
          case 'utf-8':
            return utf8Slice(this, start, end)
          case 'ascii':
            return asciiSlice(this, start, end)
          case 'latin1':
          case 'binary':
            return latin1Slice(this, start, end)
          case 'base64':
            return base64Slice(this, start, end)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return utf16leSlice(this, start, end)
          default:
            if (loweredCase) { throw new TypeError('Unknown encoding: ' + encoding2) }
            encoding2 = (encoding2 + '').toLowerCase()
            loweredCase = true
        }
      }
    }
    Buffer2.prototype._isBuffer = true
    function swap (b, n, m) {
      const i = b[n]
      b[n] = b[m]
      b[m] = i
    }
    Buffer2.prototype.swap16 = function swap16 () {
      const len = this.length
      if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits')
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1)
      }
      return this
    }
    Buffer2.prototype.swap32 = function swap32 () {
      const len = this.length
      if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits')
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3)
        swap(this, i + 1, i + 2)
      }
      return this
    }
    Buffer2.prototype.swap64 = function swap64 () {
      const len = this.length
      if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits')
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7)
        swap(this, i + 1, i + 6)
        swap(this, i + 2, i + 5)
        swap(this, i + 3, i + 4)
      }
      return this
    }
    Buffer2.prototype.toString = function toString () {
      const length = this.length
      if (length === 0) { return '' }
      if (arguments.length === 0) { return utf8Slice(this, 0, length) }
      return slowToString.apply(this, arguments)
    }
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString
    Buffer2.prototype.equals = function equals (b) {
      if (!Buffer2.isBuffer(b)) { throw new TypeError('Argument must be a Buffer') }
      if (this === b) { return true }
      return Buffer2.compare(this, b) === 0
    }
    Buffer2.prototype.inspect = function inspect () {
      let str = ''
      const max = exports.INSPECT_MAX_BYTES
      str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
      if (this.length > max) { str += ' ... ' }
      return '<Buffer ' + str + '>'
    }
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect
    }
    Buffer2.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength)
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target)
      }
      if (start === void 0) {
        start = 0
      }
      if (end === void 0) {
        end = target ? target.length : 0
      }
      if (thisStart === void 0) {
        thisStart = 0
      }
      if (thisEnd === void 0) {
        thisEnd = this.length
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index')
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0
      }
      if (thisStart >= thisEnd) {
        return -1
      }
      if (start >= end) {
        return 1
      }
      start >>>= 0
      end >>>= 0
      thisStart >>>= 0
      thisEnd >>>= 0
      if (this === target) { return 0 }
      let x = thisEnd - thisStart
      let y = end - start
      const len = Math.min(x, y)
      const thisCopy = this.slice(thisStart, thisEnd)
      const targetCopy = target.slice(start, end)
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i]
          y = targetCopy[i]
          break
        }
      }
      if (x < y) { return -1 }
      if (y < x) { return 1 }
      return 0
    }
    function bidirectionalIndexOf (buffer, val, byteOffset, encoding2, dir) {
      if (buffer.length === 0) { return -1 }
      if (typeof byteOffset === 'string') {
        encoding2 = byteOffset
        byteOffset = 0
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648
      }
      byteOffset = +byteOffset
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1
      }
      if (byteOffset < 0) { byteOffset = buffer.length + byteOffset }
      if (byteOffset >= buffer.length) {
        if (dir) { return -1 } else { byteOffset = buffer.length - 1 }
      } else if (byteOffset < 0) {
        if (dir) { byteOffset = 0 } else { return -1 }
      }
      if (typeof val === 'string') {
        val = Buffer2.from(val, encoding2)
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding2, dir)
      } else if (typeof val === 'number') {
        val = val & 255
        if (typeof Uint8Array.prototype.indexOf === 'function') {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding2, dir)
      }
      throw new TypeError('val must be string, number or Buffer')
    }
    function arrayIndexOf (arr, val, byteOffset, encoding2, dir) {
      let indexSize = 1
      let arrLength = arr.length
      let valLength = val.length
      if (encoding2 !== void 0) {
        encoding2 = String(encoding2).toLowerCase()
        if (encoding2 === 'ucs2' || encoding2 === 'ucs-2' || encoding2 === 'utf16le' || encoding2 === 'utf-16le') {
          if (arr.length < 2 || val.length < 2) {
            return -1
          }
          indexSize = 2
          arrLength /= 2
          valLength /= 2
          byteOffset /= 2
        }
      }
      function read (buf, i2) {
        if (indexSize === 1) {
          return buf[i2]
        } else {
          return buf.readUInt16BE(i2 * indexSize)
        }
      }
      let i
      if (dir) {
        let foundIndex = -1
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) { foundIndex = i }
            if (i - foundIndex + 1 === valLength) { return foundIndex * indexSize }
          } else {
            if (foundIndex !== -1) { i -= i - foundIndex }
            foundIndex = -1
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) { byteOffset = arrLength - valLength }
        for (i = byteOffset; i >= 0; i--) {
          let found = true
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false
              break
            }
          }
          if (found) { return i }
        }
      }
      return -1
    }
    Buffer2.prototype.includes = function includes (val, byteOffset, encoding2) {
      return this.indexOf(val, byteOffset, encoding2) !== -1
    }
    Buffer2.prototype.indexOf = function indexOf (val, byteOffset, encoding2) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding2, true)
    }
    Buffer2.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding2) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding2, false)
    }
    function hexWrite (buf, string, offset, length) {
      offset = Number(offset) || 0
      const remaining = buf.length - offset
      if (!length) {
        length = remaining
      } else {
        length = Number(length)
        if (length > remaining) {
          length = remaining
        }
      }
      const strLen = string.length
      if (length > strLen / 2) {
        length = strLen / 2
      }
      let i
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16)
        if (numberIsNaN(parsed)) { return i }
        buf[offset + i] = parsed
      }
      return i
    }
    function utf8Write (buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
    }
    function asciiWrite (buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length)
    }
    function base64Write (buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length)
    }
    function ucs2Write (buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
    }
    Buffer2.prototype.write = function write (string, offset, length, encoding2) {
      if (offset === void 0) {
        encoding2 = 'utf8'
        length = this.length
        offset = 0
      } else if (length === void 0 && typeof offset === 'string') {
        encoding2 = offset
        length = this.length
        offset = 0
      } else if (isFinite(offset)) {
        offset = offset >>> 0
        if (isFinite(length)) {
          length = length >>> 0
          if (encoding2 === void 0) { encoding2 = 'utf8' }
        } else {
          encoding2 = length
          length = void 0
        }
      } else {
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')
      }
      const remaining = this.length - offset
      if (length === void 0 || length > remaining) { length = remaining }
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds')
      }
      if (!encoding2) { encoding2 = 'utf8' }
      let loweredCase = false
      for (; ;) {
        switch (encoding2) {
          case 'hex':
            return hexWrite(this, string, offset, length)
          case 'utf8':
          case 'utf-8':
            return utf8Write(this, string, offset, length)
          case 'ascii':
          case 'latin1':
          case 'binary':
            return asciiWrite(this, string, offset, length)
          case 'base64':
            return base64Write(this, string, offset, length)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, string, offset, length)
          default:
            if (loweredCase) { throw new TypeError('Unknown encoding: ' + encoding2) }
            encoding2 = ('' + encoding2).toLowerCase()
            loweredCase = true
        }
      }
    }
    Buffer2.prototype.toJSON = function toJSON () {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
      }
    }
    function base64Slice (buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf)
      } else {
        return base64.fromByteArray(buf.slice(start, end))
      }
    }
    function utf8Slice (buf, start, end) {
      end = Math.min(buf.length, end)
      const res = []
      let i = start
      while (i < end) {
        const firstByte = buf[i]
        let codePoint = null
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte
              }
              break
            case 2:
              secondByte = buf[i + 1]
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint
                }
              }
              break
            case 3:
              secondByte = buf[i + 1]
              thirdByte = buf[i + 2]
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint
                }
              }
              break
            case 4:
              secondByte = buf[i + 1]
              thirdByte = buf[i + 2]
              fourthByte = buf[i + 3]
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533
          bytesPerSequence = 1
        } else if (codePoint > 65535) {
          codePoint -= 65536
          res.push(codePoint >>> 10 & 1023 | 55296)
          codePoint = 56320 | codePoint & 1023
        }
        res.push(codePoint)
        i += bytesPerSequence
      }
      return decodeCodePointsArray(res)
    }
    const MAX_ARGUMENTS_LENGTH = 4096
    function decodeCodePointsArray (codePoints) {
      const len = codePoints.length
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints)
      }
      let res = ''
      let i = 0
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH))
      }
      return res
    }
    function asciiSlice (buf, start, end) {
      let ret = ''
      end = Math.min(buf.length, end)
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127)
      }
      return ret
    }
    function latin1Slice (buf, start, end) {
      let ret = ''
      end = Math.min(buf.length, end)
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i])
      }
      return ret
    }
    function hexSlice (buf, start, end) {
      const len = buf.length
      if (!start || start < 0) { start = 0 }
      if (!end || end < 0 || end > len) { end = len }
      let out = ''
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]]
      }
      return out
    }
    function utf16leSlice (buf, start, end) {
      const bytes = buf.slice(start, end)
      let res = ''
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
      }
      return res
    }
    Buffer2.prototype.slice = function slice (start, end) {
      const len = this.length
      start = ~~start
      end = end === void 0 ? len : ~~end
      if (start < 0) {
        start += len
        if (start < 0) { start = 0 }
      } else if (start > len) {
        start = len
      }
      if (end < 0) {
        end += len
        if (end < 0) { end = 0 }
      } else if (end > len) {
        end = len
      }
      if (end < start) { end = start }
      const newBuf = this.subarray(start, end)
      Object.setPrototypeOf(newBuf, Buffer2.prototype)
      return newBuf
    }
    function checkOffset (offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) { throw new RangeError('offset is not uint') }
      if (offset + ext > length) { throw new RangeError('Trying to access beyond buffer length') }
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE (offset, byteLength2, noAssert) {
      offset = offset >>> 0
      byteLength2 = byteLength2 >>> 0
      if (!noAssert) { checkOffset(offset, byteLength2, this.length) }
      let val = this[offset]
      let mul = 1
      let i = 0
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul
      }
      return val
    }
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE (offset, byteLength2, noAssert) {
      offset = offset >>> 0
      byteLength2 = byteLength2 >>> 0
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length)
      }
      let val = this[offset + --byteLength2]
      let mul = 1
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul
      }
      return val
    }
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 1, this.length) }
      return this[offset]
    }
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 2, this.length) }
      return this[offset] | this[offset + 1] << 8
    }
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 2, this.length) }
      return this[offset] << 8 | this[offset + 1]
    }
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 4, this.length) }
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216
    }
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 4, this.length) }
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3])
    }
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
      offset = offset >>> 0
      validateNumber(offset, 'offset')
      const first = this[offset]
      const last = this[offset + 7]
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8)
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24
      return BigInt(lo) + (BigInt(hi) << BigInt(32))
    })
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
      offset = offset >>> 0
      validateNumber(offset, 'offset')
      const first = this[offset]
      const last = this[offset + 7]
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8)
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset]
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last
      return (BigInt(hi) << BigInt(32)) + BigInt(lo)
    })
    Buffer2.prototype.readIntLE = function readIntLE (offset, byteLength2, noAssert) {
      offset = offset >>> 0
      byteLength2 = byteLength2 >>> 0
      if (!noAssert) { checkOffset(offset, byteLength2, this.length) }
      let val = this[offset]
      let mul = 1
      let i = 0
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul
      }
      mul *= 128
      if (val >= mul) { val -= Math.pow(2, 8 * byteLength2) }
      return val
    }
    Buffer2.prototype.readIntBE = function readIntBE (offset, byteLength2, noAssert) {
      offset = offset >>> 0
      byteLength2 = byteLength2 >>> 0
      if (!noAssert) { checkOffset(offset, byteLength2, this.length) }
      let i = byteLength2
      let mul = 1
      let val = this[offset + --i]
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul
      }
      mul *= 128
      if (val >= mul) { val -= Math.pow(2, 8 * byteLength2) }
      return val
    }
    Buffer2.prototype.readInt8 = function readInt8 (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 1, this.length) }
      if (!(this[offset] & 128)) { return this[offset] }
      return (255 - this[offset] + 1) * -1
    }
    Buffer2.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 2, this.length) }
      const val = this[offset] | this[offset + 1] << 8
      return val & 32768 ? val | 4294901760 : val
    }
    Buffer2.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 2, this.length) }
      const val = this[offset + 1] | this[offset] << 8
      return val & 32768 ? val | 4294901760 : val
    }
    Buffer2.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 4, this.length) }
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24
    }
    Buffer2.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 4, this.length) }
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]
    }
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
      offset = offset >>> 0
      validateNumber(offset, 'offset')
      const first = this[offset]
      const last = this[offset + 7]
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8)
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24)
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24)
    })
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
      offset = offset >>> 0
      validateNumber(offset, 'offset')
      const first = this[offset]
      const last = this[offset + 7]
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8)
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset]
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last)
    })
    Buffer2.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 4, this.length) }
      return ieee754.read(this, offset, true, 23, 4)
    }
    Buffer2.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 4, this.length) }
      return ieee754.read(this, offset, false, 23, 4)
    }
    Buffer2.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 8, this.length) }
      return ieee754.read(this, offset, true, 52, 8)
    }
    Buffer2.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) { checkOffset(offset, 8, this.length) }
      return ieee754.read(this, offset, false, 52, 8)
    }
    function checkInt (buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) { throw new TypeError('"buffer" argument must be a Buffer instance') }
      if (value > max || value < min) { throw new RangeError('"value" argument is out of bounds') }
      if (offset + ext > buf.length) { throw new RangeError('Index out of range') }
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength2, noAssert) {
      value = +value
      offset = offset >>> 0
      byteLength2 = byteLength2 >>> 0
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1
        checkInt(this, value, offset, byteLength2, maxBytes, 0)
      }
      let mul = 1
      let i = 0
      this[offset] = value & 255
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255
      }
      return offset + byteLength2
    }
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength2, noAssert) {
      value = +value
      offset = offset >>> 0
      byteLength2 = byteLength2 >>> 0
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1
        checkInt(this, value, offset, byteLength2, maxBytes, 0)
      }
      let i = byteLength2 - 1
      let mul = 1
      this[offset + i] = value & 255
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255
      }
      return offset + byteLength2
    }
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) { checkInt(this, value, offset, 1, 255, 0) }
      this[offset] = value & 255
      return offset + 1
    }
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) { checkInt(this, value, offset, 2, 65535, 0) }
      this[offset] = value & 255
      this[offset + 1] = value >>> 8
      return offset + 2
    }
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) { checkInt(this, value, offset, 2, 65535, 0) }
      this[offset] = value >>> 8
      this[offset + 1] = value & 255
      return offset + 2
    }
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) { checkInt(this, value, offset, 4, 4294967295, 0) }
      this[offset + 3] = value >>> 24
      this[offset + 2] = value >>> 16
      this[offset + 1] = value >>> 8
      this[offset] = value & 255
      return offset + 4
    }
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) { checkInt(this, value, offset, 4, 4294967295, 0) }
      this[offset] = value >>> 24
      this[offset + 1] = value >>> 16
      this[offset + 2] = value >>> 8
      this[offset + 3] = value & 255
      return offset + 4
    }
    function wrtBigUInt64LE (buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7)
      let lo = Number(value & BigInt(4294967295))
      buf[offset++] = lo
      lo = lo >> 8
      buf[offset++] = lo
      lo = lo >> 8
      buf[offset++] = lo
      lo = lo >> 8
      buf[offset++] = lo
      let hi = Number(value >> BigInt(32) & BigInt(4294967295))
      buf[offset++] = hi
      hi = hi >> 8
      buf[offset++] = hi
      hi = hi >> 8
      buf[offset++] = hi
      hi = hi >> 8
      buf[offset++] = hi
      return offset
    }
    function wrtBigUInt64BE (buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7)
      let lo = Number(value & BigInt(4294967295))
      buf[offset + 7] = lo
      lo = lo >> 8
      buf[offset + 6] = lo
      lo = lo >> 8
      buf[offset + 5] = lo
      lo = lo >> 8
      buf[offset + 4] = lo
      let hi = Number(value >> BigInt(32) & BigInt(4294967295))
      buf[offset + 3] = hi
      hi = hi >> 8
      buf[offset + 2] = hi
      hi = hi >> 8
      buf[offset + 1] = hi
      hi = hi >> 8
      buf[offset] = hi
      return offset + 8
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
    })
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
    })
    Buffer2.prototype.writeIntLE = function writeIntLE (value, offset, byteLength2, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1)
        checkInt(this, value, offset, byteLength2, limit - 1, -limit)
      }
      let i = 0
      let mul = 1
      let sub = 0
      this[offset] = value & 255
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1
        }
        this[offset + i] = (value / mul >> 0) - sub & 255
      }
      return offset + byteLength2
    }
    Buffer2.prototype.writeIntBE = function writeIntBE (value, offset, byteLength2, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1)
        checkInt(this, value, offset, byteLength2, limit - 1, -limit)
      }
      let i = byteLength2 - 1
      let mul = 1
      let sub = 0
      this[offset + i] = value & 255
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1
        }
        this[offset + i] = (value / mul >> 0) - sub & 255
      }
      return offset + byteLength2
    }
    Buffer2.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) { checkInt(this, value, offset, 1, 127, -128) }
      if (value < 0) { value = 255 + value + 1 }
      this[offset] = value & 255
      return offset + 1
    }
    Buffer2.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) { checkInt(this, value, offset, 2, 32767, -32768) }
      this[offset] = value & 255
      this[offset + 1] = value >>> 8
      return offset + 2
    }
    Buffer2.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) { checkInt(this, value, offset, 2, 32767, -32768) }
      this[offset] = value >>> 8
      this[offset + 1] = value & 255
      return offset + 2
    }
    Buffer2.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) { checkInt(this, value, offset, 4, 2147483647, -2147483648) }
      this[offset] = value & 255
      this[offset + 1] = value >>> 8
      this[offset + 2] = value >>> 16
      this[offset + 3] = value >>> 24
      return offset + 4
    }
    Buffer2.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) { checkInt(this, value, offset, 4, 2147483647, -2147483648) }
      if (value < 0) { value = 4294967295 + value + 1 }
      this[offset] = value >>> 24
      this[offset + 1] = value >>> 16
      this[offset + 2] = value >>> 8
      this[offset + 3] = value & 255
      return offset + 4
    }
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
    })
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
    })
    function checkIEEE754 (buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) { throw new RangeError('Index out of range') }
      if (offset < 0) { throw new RangeError('Index out of range') }
    }
    function writeFloat (buf, value, offset, littleEndian, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22)
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4)
      return offset + 4
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert)
    }
    Buffer2.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert)
    }
    function writeDouble (buf, value, offset, littleEndian, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292)
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8)
      return offset + 8
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert)
    }
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert)
    }
    Buffer2.prototype.copy = function copy (target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) { throw new TypeError('argument should be a Buffer') }
      if (!start) { start = 0 }
      if (!end && end !== 0) { end = this.length }
      if (targetStart >= target.length) { targetStart = target.length }
      if (!targetStart) { targetStart = 0 }
      if (end > 0 && end < start) { end = start }
      if (end === start) { return 0 }
      if (target.length === 0 || this.length === 0) { return 0 }
      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds')
      }
      if (start < 0 || start >= this.length) { throw new RangeError('Index out of range') }
      if (end < 0) { throw new RangeError('sourceEnd out of bounds') }
      if (end > this.length) { end = this.length }
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start
      }
      const len = end - start
      if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
        this.copyWithin(targetStart, start, end)
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart)
      }
      return len
    }
    Buffer2.prototype.fill = function fill (val, start, end, encoding2) {
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding2 = start
          start = 0
          end = this.length
        } else if (typeof end === 'string') {
          encoding2 = end
          end = this.length
        }
        if (encoding2 !== void 0 && typeof encoding2 !== 'string') {
          throw new TypeError('encoding must be a string')
        }
        if (typeof encoding2 === 'string' && !Buffer2.isEncoding(encoding2)) {
          throw new TypeError('Unknown encoding: ' + encoding2)
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0)
          if (encoding2 === 'utf8' && code < 128 || encoding2 === 'latin1') {
            val = code
          }
        }
      } else if (typeof val === 'number') {
        val = val & 255
      } else if (typeof val === 'boolean') {
        val = Number(val)
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index')
      }
      if (end <= start) {
        return this
      }
      start = start >>> 0
      end = end === void 0 ? this.length : end >>> 0
      if (!val) { val = 0 }
      let i
      if (typeof val === 'number') {
        for (i = start; i < end; ++i) {
          this[i] = val
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding2)
        const len = bytes.length
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"')
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len]
        }
      }
      return this
    }
    const errors = {}
    function E (sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor () {
          super()
          Object.defineProperty(this, 'message', {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          })
          this.name = `${this.name} [${sym}]`
          this.stack
          delete this.name
        }

        get code () {
          return sym
        }

        set code (value) {
          Object.defineProperty(this, 'code', {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          })
        }

        toString () {
          return `${this.name} [${sym}]: ${this.message}`
        }
      }
    }
    E('ERR_BUFFER_OUT_OF_BOUNDS', function (name) {
      if (name) {
        return `${name} is outside of buffer bounds`
      }
      return 'Attempt to access memory outside buffer bounds'
    }, RangeError)
    E('ERR_INVALID_ARG_TYPE', function (name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`
    }, TypeError)
    E('ERR_OUT_OF_RANGE', function (str, range, input) {
      let msg = `The value of "${str}" is out of range.`
      let received = input
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input))
      } else if (typeof input === 'bigint') {
        received = String(input)
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received)
        }
        received += 'n'
      }
      msg += ` It must be ${range}. Received ${received}`
      return msg
    }, RangeError)
    function addNumericalSeparator (val) {
      let res = ''
      let i = val.length
      const start = val[0] === '-' ? 1 : 0
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`
      }
      return `${val.slice(0, i)}${res}`
    }
    function checkBounds (buf, offset, byteLength2) {
      validateNumber(offset, 'offset')
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1))
      }
    }
    function checkIntBI (value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === 'bigint' ? 'n' : ''
        let range
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`
        }
        throw new errors.ERR_OUT_OF_RANGE('value', range, value)
      }
      checkBounds(buf, offset, byteLength2)
    }
    function validateNumber (value, name) {
      if (typeof value !== 'number') {
        throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
      }
    }
    function boundsError (value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type)
        throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
      }
      throw new errors.ERR_OUT_OF_RANGE(type || 'offset', `>= ${type ? 1 : 0} and <= ${length}`, value)
    }
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g
    function base64clean (str) {
      str = str.split('=')[0]
      str = str.trim().replace(INVALID_BASE64_RE, '')
      if (str.length < 2) { return '' }
      while (str.length % 4 !== 0) {
        str = str + '='
      }
      return str
    }
    function utf8ToBytes (string, units) {
      units = units || Infinity
      let codePoint
      const length = string.length
      let leadSurrogate = null
      const bytes = []
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i)
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) { bytes.push(239, 191, 189) }
              continue
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) { bytes.push(239, 191, 189) }
              continue
            }
            leadSurrogate = codePoint
            continue
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) { bytes.push(239, 191, 189) }
            leadSurrogate = codePoint
            continue
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) { bytes.push(239, 191, 189) }
        }
        leadSurrogate = null
        if (codePoint < 128) {
          if ((units -= 1) < 0) { break }
          bytes.push(codePoint)
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) { break }
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128)
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) { break }
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128)
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) { break }
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128)
        } else {
          throw new Error('Invalid code point')
        }
      }
      return bytes
    }
    function asciiToBytes (str) {
      const byteArray = []
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255)
      }
      return byteArray
    }
    function utf16leToBytes (str, units) {
      let c, hi, lo
      const byteArray = []
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) { break }
        c = str.charCodeAt(i)
        hi = c >> 8
        lo = c % 256
        byteArray.push(lo)
        byteArray.push(hi)
      }
      return byteArray
    }
    function base64ToBytes (str) {
      return base64.toByteArray(base64clean(str))
    }
    function blitBuffer (src, dst, offset, length) {
      let i
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) { break }
        dst[i + offset] = src[i]
      }
      return i
    }
    function isInstance (obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name
    }
    function numberIsNaN (obj) {
      return obj !== obj
    }
    var hexSliceLookupTable = (function () {
      const alphabet = '0123456789abcdef'
      const table = new Array(256)
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j]
        }
      }
      return table
    }())
    function defineBigIntMethod (fn) {
      return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
    }
    function BufferBigIntNotDefined () {
      throw new Error('BigInt not supported')
    }
  }
})

// node_modules/safe-buffer/index.js
const require_safe_buffer = __commonJS({
  'node_modules/safe-buffer/index.js' (exports, module) {
    const buffer = require_buffer2()
    const Buffer2 = buffer.Buffer
    function copyProps (src, dst) {
      for (const key in src) {
        dst[key] = src[key]
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer
    } else {
      copyProps(buffer, exports)
      exports.Buffer = SafeBuffer
    }
    function SafeBuffer (arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length)
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype)
    copyProps(Buffer2, SafeBuffer)
    SafeBuffer.from = function (arg, encodingOrOffset, length) {
      if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number')
      }
      return Buffer2(arg, encodingOrOffset, length)
    }
    SafeBuffer.alloc = function (size, fill, encoding2) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      const buf = Buffer2(size)
      if (fill !== void 0) {
        if (typeof encoding2 === 'string') {
          buf.fill(fill, encoding2)
        } else {
          buf.fill(fill)
        }
      } else {
        buf.fill(0)
      }
      return buf
    }
    SafeBuffer.allocUnsafe = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      return Buffer2(size)
    }
    SafeBuffer.allocUnsafeSlow = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      return buffer.SlowBuffer(size)
    }
  }
})

// node_modules/base-x/src/index.js
const require_src = __commonJS({
  'node_modules/base-x/src/index.js' (exports, module) {
    'use strict'
    const _Buffer = require_safe_buffer().Buffer
    function base (ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError('Alphabet too long')
      }
      const BASE_MAP = new Uint8Array(256)
      for (let j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255
      }
      for (let i = 0; i < ALPHABET.length; i++) {
        const x = ALPHABET.charAt(i)
        const xc = x.charCodeAt(0)
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + ' is ambiguous')
        }
        BASE_MAP[xc] = i
      }
      const BASE = ALPHABET.length
      const LEADER = ALPHABET.charAt(0)
      const FACTOR = Math.log(BASE) / Math.log(256)
      const iFACTOR = Math.log(256) / Math.log(BASE)
      function encode (source) {
        if (Array.isArray(source) || source instanceof Uint8Array) {
          source = _Buffer.from(source)
        }
        if (!_Buffer.isBuffer(source)) {
          throw new TypeError('Expected Buffer')
        }
        if (source.length === 0) {
          return ''
        }
        let zeroes = 0
        let length = 0
        let pbegin = 0
        const pend = source.length
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++
          zeroes++
        }
        const size = (pend - pbegin) * iFACTOR + 1 >>> 0
        const b58 = new Uint8Array(size)
        while (pbegin !== pend) {
          let carry = source[pbegin]
          let i2 = 0
          for (let it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
            carry += 256 * b58[it1] >>> 0
            b58[it1] = carry % BASE >>> 0
            carry = carry / BASE >>> 0
          }
          if (carry !== 0) {
            throw new Error('Non-zero carry')
          }
          length = i2
          pbegin++
        }
        let it2 = size - length
        while (it2 !== size && b58[it2] === 0) {
          it2++
        }
        let str = LEADER.repeat(zeroes)
        for (; it2 < size; ++it2) {
          str += ALPHABET.charAt(b58[it2])
        }
        return str
      }
      function decodeUnsafe (source) {
        if (typeof source !== 'string') {
          throw new TypeError('Expected String')
        }
        if (source.length === 0) {
          return _Buffer.alloc(0)
        }
        let psz = 0
        if (source[psz] === ' ') {
          return
        }
        let zeroes = 0
        let length = 0
        while (source[psz] === LEADER) {
          zeroes++
          psz++
        }
        const size = (source.length - psz) * FACTOR + 1 >>> 0
        const b256 = new Uint8Array(size)
        while (source[psz]) {
          let carry = BASE_MAP[source.charCodeAt(psz)]
          if (carry === 255) {
            return
          }
          let i2 = 0
          for (let it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
            carry += BASE * b256[it3] >>> 0
            b256[it3] = carry % 256 >>> 0
            carry = carry / 256 >>> 0
          }
          if (carry !== 0) {
            throw new Error('Non-zero carry')
          }
          length = i2
          psz++
        }
        if (source[psz] === ' ') {
          return
        }
        let it4 = size - length
        while (it4 !== size && b256[it4] === 0) {
          it4++
        }
        const vch = _Buffer.allocUnsafe(zeroes + (size - it4))
        vch.fill(0, 0, zeroes)
        let j2 = zeroes
        while (it4 !== size) {
          vch[j2++] = b256[it4++]
        }
        return vch
      }
      function decode (string) {
        const buffer = decodeUnsafe(string)
        if (buffer) {
          return buffer
        }
        throw new Error('Non-base' + BASE + ' character')
      }
      return {
        encode,
        decodeUnsafe,
        decode
      }
    }
    module.exports = base
  }
})

// node_modules/bs58/index.js
const require_bs58 = __commonJS({
  'node_modules/bs58/index.js' (exports, module) {
    const basex = require_src()
    const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    module.exports = basex(ALPHABET)
  }
})

// node_modules/text-encoding-utf-8/lib/encoding.lib.js
const require_encoding_lib = __commonJS({
  'node_modules/text-encoding-utf-8/lib/encoding.lib.js' (exports) {
    'use strict'
    function inRange (a, min, max) {
      return min <= a && a <= max
    }
    function ToDictionary (o) {
      if (o === void 0) { return {} }
      if (o === Object(o)) { return o }
      throw TypeError('Could not convert argument to dictionary')
    }
    function stringToCodePoints (string) {
      const s = String(string)
      const n = s.length
      let i = 0
      const u = []
      while (i < n) {
        const c = s.charCodeAt(i)
        if (c < 55296 || c > 57343) {
          u.push(c)
        } else if (c >= 56320 && c <= 57343) {
          u.push(65533)
        } else if (c >= 55296 && c <= 56319) {
          if (i === n - 1) {
            u.push(65533)
          } else {
            const d = string.charCodeAt(i + 1)
            if (d >= 56320 && d <= 57343) {
              const a = c & 1023
              const b = d & 1023
              u.push(65536 + (a << 10) + b)
              i += 1
            } else {
              u.push(65533)
            }
          }
        }
        i += 1
      }
      return u
    }
    function codePointsToString (code_points) {
      let s = ''
      for (let i = 0; i < code_points.length; ++i) {
        let cp = code_points[i]
        if (cp <= 65535) {
          s += String.fromCharCode(cp)
        } else {
          cp -= 65536
          s += String.fromCharCode((cp >> 10) + 55296, (cp & 1023) + 56320)
        }
      }
      return s
    }
    const end_of_stream = -1
    function Stream (tokens) {
      this.tokens = [].slice.call(tokens)
    }
    Stream.prototype = {
      endOfStream: function () {
        return !this.tokens.length
      },
      read: function () {
        if (!this.tokens.length) { return end_of_stream }
        return this.tokens.shift()
      },
      prepend: function (token) {
        if (Array.isArray(token)) {
          const tokens = token
          while (tokens.length) { this.tokens.unshift(tokens.pop()) }
        } else {
          this.tokens.unshift(token)
        }
      },
      push: function (token) {
        if (Array.isArray(token)) {
          const tokens = token
          while (tokens.length) { this.tokens.push(tokens.shift()) }
        } else {
          this.tokens.push(token)
        }
      }
    }
    const finished = -1
    function decoderError (fatal, opt_code_point) {
      if (fatal) { throw TypeError('Decoder error') }
      return opt_code_point || 65533
    }
    const DEFAULT_ENCODING = 'utf-8'
    function TextDecoder3 (encoding2, options) {
      if (!(this instanceof TextDecoder3)) {
        return new TextDecoder3(encoding2, options)
      }
      encoding2 = encoding2 !== void 0 ? String(encoding2).toLowerCase() : DEFAULT_ENCODING
      if (encoding2 !== DEFAULT_ENCODING) {
        throw new Error('Encoding not supported. Only utf-8 is supported')
      }
      options = ToDictionary(options)
      this._streaming = false
      this._BOMseen = false
      this._decoder = null
      this._fatal = Boolean(options.fatal)
      this._ignoreBOM = Boolean(options.ignoreBOM)
      Object.defineProperty(this, 'encoding', { value: 'utf-8' })
      Object.defineProperty(this, 'fatal', { value: this._fatal })
      Object.defineProperty(this, 'ignoreBOM', { value: this._ignoreBOM })
    }
    TextDecoder3.prototype = {
      decode: function decode (input, options) {
        let bytes
        if (typeof input === 'object' && input instanceof ArrayBuffer) {
          bytes = new Uint8Array(input)
        } else if (typeof input === 'object' && 'buffer' in input && input.buffer instanceof ArrayBuffer) {
          bytes = new Uint8Array(input.buffer, input.byteOffset, input.byteLength)
        } else {
          bytes = new Uint8Array(0)
        }
        options = ToDictionary(options)
        if (!this._streaming) {
          this._decoder = new UTF8Decoder({ fatal: this._fatal })
          this._BOMseen = false
        }
        this._streaming = Boolean(options.stream)
        const input_stream = new Stream(bytes)
        const code_points = []
        let result
        while (!input_stream.endOfStream()) {
          result = this._decoder.handler(input_stream, input_stream.read())
          if (result === finished) { break }
          if (result === null) { continue }
          if (Array.isArray(result)) { code_points.push.apply(code_points, result) } else { code_points.push(result) }
        }
        if (!this._streaming) {
          do {
            result = this._decoder.handler(input_stream, input_stream.read())
            if (result === finished) { break }
            if (result === null) { continue }
            if (Array.isArray(result)) { code_points.push.apply(code_points, result) } else { code_points.push(result) }
          } while (!input_stream.endOfStream())
          this._decoder = null
        }
        if (code_points.length) {
          if (['utf-8'].indexOf(this.encoding) !== -1 && !this._ignoreBOM && !this._BOMseen) {
            if (code_points[0] === 65279) {
              this._BOMseen = true
              code_points.shift()
            } else {
              this._BOMseen = true
            }
          }
        }
        return codePointsToString(code_points)
      }
    }
    function TextEncoder (encoding2, options) {
      if (!(this instanceof TextEncoder)) { return new TextEncoder(encoding2, options) }
      encoding2 = encoding2 !== void 0 ? String(encoding2).toLowerCase() : DEFAULT_ENCODING
      if (encoding2 !== DEFAULT_ENCODING) {
        throw new Error('Encoding not supported. Only utf-8 is supported')
      }
      options = ToDictionary(options)
      this._streaming = false
      this._encoder = null
      this._options = { fatal: Boolean(options.fatal) }
      Object.defineProperty(this, 'encoding', { value: 'utf-8' })
    }
    TextEncoder.prototype = {
      encode: function encode (opt_string, options) {
        opt_string = opt_string ? String(opt_string) : ''
        options = ToDictionary(options)
        if (!this._streaming) { this._encoder = new UTF8Encoder(this._options) }
        this._streaming = Boolean(options.stream)
        const bytes = []
        const input_stream = new Stream(stringToCodePoints(opt_string))
        let result
        while (!input_stream.endOfStream()) {
          result = this._encoder.handler(input_stream, input_stream.read())
          if (result === finished) { break }
          if (Array.isArray(result)) { bytes.push.apply(bytes, result) } else { bytes.push(result) }
        }
        if (!this._streaming) {
          while (true) {
            result = this._encoder.handler(input_stream, input_stream.read())
            if (result === finished) { break }
            if (Array.isArray(result)) { bytes.push.apply(bytes, result) } else { bytes.push(result) }
          }
          this._encoder = null
        }
        return new Uint8Array(bytes)
      }
    }
    function UTF8Decoder (options) {
      const fatal = options.fatal
      let utf8_code_point = 0; let utf8_bytes_seen = 0; let utf8_bytes_needed = 0; let utf8_lower_boundary = 128; let utf8_upper_boundary = 191
      this.handler = function (stream, bite) {
        if (bite === end_of_stream && utf8_bytes_needed !== 0) {
          utf8_bytes_needed = 0
          return decoderError(fatal)
        }
        if (bite === end_of_stream) { return finished }
        if (utf8_bytes_needed === 0) {
          if (inRange(bite, 0, 127)) {
            return bite
          }
          if (inRange(bite, 194, 223)) {
            utf8_bytes_needed = 1
            utf8_code_point = bite - 192
          } else if (inRange(bite, 224, 239)) {
            if (bite === 224) { utf8_lower_boundary = 160 }
            if (bite === 237) { utf8_upper_boundary = 159 }
            utf8_bytes_needed = 2
            utf8_code_point = bite - 224
          } else if (inRange(bite, 240, 244)) {
            if (bite === 240) { utf8_lower_boundary = 144 }
            if (bite === 244) { utf8_upper_boundary = 143 }
            utf8_bytes_needed = 3
            utf8_code_point = bite - 240
          } else {
            return decoderError(fatal)
          }
          utf8_code_point = utf8_code_point << 6 * utf8_bytes_needed
          return null
        }
        if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {
          utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0
          utf8_lower_boundary = 128
          utf8_upper_boundary = 191
          stream.prepend(bite)
          return decoderError(fatal)
        }
        utf8_lower_boundary = 128
        utf8_upper_boundary = 191
        utf8_bytes_seen += 1
        utf8_code_point += bite - 128 << 6 * (utf8_bytes_needed - utf8_bytes_seen)
        if (utf8_bytes_seen !== utf8_bytes_needed) { return null }
        const code_point = utf8_code_point
        utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0
        return code_point
      }
    }
    function UTF8Encoder (options) {
      const fatal = options.fatal
      this.handler = function (stream, code_point) {
        if (code_point === end_of_stream) { return finished }
        if (inRange(code_point, 0, 127)) { return code_point }
        let count, offset
        if (inRange(code_point, 128, 2047)) {
          count = 1
          offset = 192
        } else if (inRange(code_point, 2048, 65535)) {
          count = 2
          offset = 224
        } else if (inRange(code_point, 65536, 1114111)) {
          count = 3
          offset = 240
        }
        const bytes = [(code_point >> 6 * count) + offset]
        while (count > 0) {
          const temp = code_point >> 6 * (count - 1)
          bytes.push(128 | temp & 63)
          count -= 1
        }
        return bytes
      }
    }
    exports.TextEncoder = TextEncoder
    exports.TextDecoder = TextDecoder3
  }
})

// borsh-ts/index.ts
const import_bn = __toModule(require_bn())
const import_bs58 = __toModule(require_bs58())
const encoding = __toModule(require_encoding_lib())
const TextDecoder2 = typeof global.TextDecoder !== 'function' ? encoding.TextDecoder : global.TextDecoder
const textDecoder = new TextDecoder2('utf-8', { fatal: true })
function baseEncode (value) {
  if (typeof value === 'string') {
    value = Buffer.from(value, 'utf8')
  }
  return import_bs58.default.encode(Buffer.from(value))
}
function baseDecode (value) {
  return Buffer.from(import_bs58.default.decode(value))
}
const INITIAL_LENGTH = 1024
const BorshError = class extends Error {
  constructor (message) {
    super(message)
    this.fieldPath = []
    this.originalMessage = message
  }

  addToFieldPath (fieldName) {
    this.fieldPath.splice(0, 0, fieldName)
    this.message = this.originalMessage + ': ' + this.fieldPath.join('.')
  }
}
const BinaryWriter = class {
  constructor () {
    this.buf = Buffer.alloc(INITIAL_LENGTH)
    this.length = 0
  }

  maybeResize () {
    if (this.buf.length < 16 + this.length) {
      this.buf = Buffer.concat([this.buf, Buffer.alloc(INITIAL_LENGTH)])
    }
  }

  writeU8 (value) {
    this.maybeResize()
    this.buf.writeUInt8(value, this.length)
    this.length += 1
  }

  writeU16 (value) {
    this.maybeResize()
    this.buf.writeUInt16LE(value, this.length)
    this.length += 2
  }

  writeU32 (value) {
    this.maybeResize()
    this.buf.writeUInt32LE(value, this.length)
    this.length += 4
  }

  writeU64 (value) {
    this.maybeResize()
    this.writeBuffer(Buffer.from(new import_bn.default(value).toArray('le', 8)))
  }

  writeU128 (value) {
    this.maybeResize()
    this.writeBuffer(Buffer.from(new import_bn.default(value).toArray('le', 16)))
  }

  writeU256 (value) {
    this.maybeResize()
    this.writeBuffer(Buffer.from(new import_bn.default(value).toArray('le', 32)))
  }

  writeU512 (value) {
    this.maybeResize()
    this.writeBuffer(Buffer.from(new import_bn.default(value).toArray('le', 64)))
  }

  writeBuffer (buffer) {
    this.buf = Buffer.concat([Buffer.from(this.buf.subarray(0, this.length)), buffer, Buffer.alloc(INITIAL_LENGTH)])
    this.length += buffer.length
  }

  writeString (str) {
    this.maybeResize()
    const b = Buffer.from(str, 'utf8')
    this.writeU32(b.length)
    this.writeBuffer(b)
  }

  writeFixedArray (array) {
    this.writeBuffer(Buffer.from(array))
  }

  writeArray (array, fn) {
    this.maybeResize()
    this.writeU32(array.length)
    for (const elem of array) {
      this.maybeResize()
      fn(elem)
    }
  }

  toArray () {
    return this.buf.subarray(0, this.length)
  }
}
function handlingRangeError (target, propertyKey, propertyDescriptor) {
  const originalMethod = propertyDescriptor.value
  propertyDescriptor.value = function (...args) {
    try {
      return originalMethod.apply(this, args)
    } catch (e) {
      if (e instanceof RangeError) {
        const code = e.code
        if (['ERR_BUFFER_OUT_OF_BOUNDS', 'ERR_OUT_OF_RANGE'].indexOf(code) >= 0) {
          throw new BorshError('Reached the end of buffer when deserializing')
        }
      }
      throw e
    }
  }
}
const BinaryReader = class {
  constructor (buf) {
    this.buf = buf
    this.offset = 0
  }

  readU8 () {
    const value = this.buf.readUInt8(this.offset)
    this.offset += 1
    return value
  }

  readU16 () {
    const value = this.buf.readUInt16LE(this.offset)
    this.offset += 2
    return value
  }

  readU32 () {
    const value = this.buf.readUInt32LE(this.offset)
    this.offset += 4
    return value
  }

  readU64 () {
    const buf = this.readBuffer(8)
    return new import_bn.default(buf, 'le')
  }

  readU128 () {
    const buf = this.readBuffer(16)
    return new import_bn.default(buf, 'le')
  }

  readU256 () {
    const buf = this.readBuffer(32)
    return new import_bn.default(buf, 'le')
  }

  readU512 () {
    const buf = this.readBuffer(64)
    return new import_bn.default(buf, 'le')
  }

  readBuffer (len) {
    if (this.offset + len > this.buf.length) {
      throw new BorshError(`Expected buffer length ${len} isn't within bounds`)
    }
    const result = this.buf.slice(this.offset, this.offset + len)
    this.offset += len
    return result
  }

  readString () {
    const len = this.readU32()
    const buf = this.readBuffer(len)
    try {
      return textDecoder.decode(buf)
    } catch (e) {
      throw new BorshError(`Error decoding UTF-8 string: ${e}`)
    }
  }

  readFixedArray (len) {
    return new Uint8Array(this.readBuffer(len))
  }

  readArray (fn) {
    const len = this.readU32()
    const result = Array()
    for (let i = 0; i < len; ++i) {
      result.push(fn())
    }
    return result
  }
}
__decorateClass([
  handlingRangeError
], BinaryReader.prototype, 'readU8', 1)
__decorateClass([
  handlingRangeError
], BinaryReader.prototype, 'readU16', 1)
__decorateClass([
  handlingRangeError
], BinaryReader.prototype, 'readU32', 1)
__decorateClass([
  handlingRangeError
], BinaryReader.prototype, 'readU64', 1)
__decorateClass([
  handlingRangeError
], BinaryReader.prototype, 'readU128', 1)
__decorateClass([
  handlingRangeError
], BinaryReader.prototype, 'readU256', 1)
__decorateClass([
  handlingRangeError
], BinaryReader.prototype, 'readU512', 1)
__decorateClass([
  handlingRangeError
], BinaryReader.prototype, 'readString', 1)
__decorateClass([
  handlingRangeError
], BinaryReader.prototype, 'readFixedArray', 1)
__decorateClass([
  handlingRangeError
], BinaryReader.prototype, 'readArray', 1)
function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
function serializeField (schema, fieldName, value, fieldType, writer) {
  try {
    if (typeof fieldType === 'string') {
      writer[`write${capitalizeFirstLetter(fieldType)}`](value)
    } else if (fieldType instanceof Array) {
      if (typeof fieldType[0] === 'number') {
        if (value.length !== fieldType[0]) {
          throw new BorshError(`Expecting byte array of length ${fieldType[0]}, but got ${value.length} bytes`)
        }
        writer.writeFixedArray(value)
      } else {
        writer.writeArray(value, (item) => {
          serializeField(schema, fieldName, item, fieldType[0], writer)
        })
      }
    } else if (fieldType.kind !== void 0) {
      switch (fieldType.kind) {
        case 'option': {
          if (value === null || value === void 0) {
            writer.writeU8(0)
          } else {
            writer.writeU8(1)
            serializeField(schema, fieldName, value, fieldType.type, writer)
          }
          break
        }
        default:
          throw new BorshError(`FieldType ${fieldType} unrecognized`)
      }
    } else {
      serializeStruct(schema, value, writer)
    }
  } catch (error) {
    if (error instanceof BorshError) {
      error.addToFieldPath(fieldName)
    }
    throw error
  }
}
function serializeStruct (schema, obj, writer) {
  const structSchema = schema.get(obj.constructor)
  if (!structSchema) {
    throw new BorshError(`Class ${obj.constructor.name} is missing in schema`)
  }
  if (structSchema.kind === 'struct') {
    structSchema.fields.map(([fieldName, fieldType]) => {
      serializeField(schema, fieldName, obj[fieldName], fieldType, writer)
    })
  } else if (structSchema.kind === 'enum') {
    const name = obj[structSchema.field]
    for (let idx = 0; idx < structSchema.values.length; ++idx) {
      const [fieldName, fieldType] = structSchema.values[idx]
      if (fieldName === name) {
        writer.writeU8(idx)
        serializeField(schema, fieldName, obj[fieldName], fieldType, writer)
        break
      }
    }
  } else {
    throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${obj.constructor.name}`)
  }
}
function serialize (schema, obj) {
  const writer = new BinaryWriter()
  serializeStruct(schema, obj, writer)
  return writer.toArray()
}
function deserializeField (schema, fieldName, fieldType, reader) {
  try {
    if (typeof fieldType === 'string') {
      return reader[`read${capitalizeFirstLetter(fieldType)}`]()
    }
    if (fieldType instanceof Array) {
      if (typeof fieldType[0] === 'number') {
        return reader.readFixedArray(fieldType[0])
      }
      return reader.readArray(() => deserializeField(schema, fieldName, fieldType[0], reader))
    }
    if (fieldType.kind === 'option') {
      const option = reader.readU8()
      if (option) {
        return deserializeField(schema, fieldName, fieldType.type, reader)
      }
      return void 0
    }
    return deserializeStruct(schema, fieldType, reader)
  } catch (error) {
    if (error instanceof BorshError) {
      error.addToFieldPath(fieldName)
    }
    throw error
  }
}
function deserializeStruct (schema, classType, reader) {
  const structSchema = schema.get(classType)
  if (!structSchema) {
    throw new BorshError(`Class ${classType.name} is missing in schema`)
  }
  if (structSchema.kind === 'struct') {
    const result = {}
    for (const [fieldName, fieldType] of schema.get(classType).fields) {
      result[fieldName] = deserializeField(schema, fieldName, fieldType, reader)
    }
    return new classType(result)
  }
  if (structSchema.kind === 'enum') {
    const idx = reader.readU8()
    if (idx >= structSchema.values.length) {
      throw new BorshError(`Enum index: ${idx} is out of range`)
    }
    const [fieldName, fieldType] = structSchema.values[idx]
    const fieldValue = deserializeField(schema, fieldName, fieldType, reader)
    return new classType({ [fieldName]: fieldValue })
  }
  throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${classType.constructor.name}`)
}
function deserialize (schema, classType, buffer) {
  const reader = new BinaryReader(buffer)
  const result = deserializeStruct(schema, classType, reader)
  if (reader.offset < buffer.length) {
    throw new BorshError(`Unexpected ${buffer.length - reader.offset} bytes after deserialized data`)
  }
  return result
}
function deserializeUnchecked (schema, classType, buffer) {
  const reader = new BinaryReader(buffer)
  return deserializeStruct(schema, classType, reader)
}
export {
  BinaryReader,
  BinaryWriter,
  BorshError,
  baseDecode,
  baseEncode,
  deserialize,
  deserializeUnchecked,
  serialize
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
// # sourceMappingURL=index.esm.js.map
