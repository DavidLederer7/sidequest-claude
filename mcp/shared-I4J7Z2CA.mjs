import {
  $ZodAny,
  $ZodArray,
  $ZodBase64,
  $ZodBase64URL,
  $ZodBigInt,
  $ZodBigIntFormat,
  $ZodBoolean,
  $ZodCIDRv4,
  $ZodCIDRv6,
  $ZodCUID,
  $ZodCUID2,
  $ZodCatch,
  $ZodCheck,
  $ZodCodec,
  $ZodCreditCard,
  $ZodCustom,
  $ZodCustomStringFormat,
  $ZodDate,
  $ZodDefault,
  $ZodDiscriminatedUnion,
  $ZodE164,
  $ZodEmail,
  $ZodEmoji,
  $ZodEnum,
  $ZodExactOptional,
  $ZodFile,
  $ZodFunction,
  $ZodGUID,
  $ZodIBAN,
  $ZodIPv4,
  $ZodIPv6,
  $ZodISODate,
  $ZodISODateTime,
  $ZodISODuration,
  $ZodISOTime,
  $ZodIntersection,
  $ZodJWT,
  $ZodKSUID,
  $ZodLazy,
  $ZodLiteral,
  $ZodMAC,
  $ZodMap,
  $ZodNaN,
  $ZodNanoID,
  $ZodNever,
  $ZodNonOptional,
  $ZodNull,
  $ZodNullable,
  $ZodNumber,
  $ZodNumberFormat,
  $ZodObject,
  $ZodOptional,
  $ZodPipe,
  $ZodPrefault,
  $ZodPromise,
  $ZodProperties,
  $ZodReadonly,
  $ZodRecord,
  $ZodSet,
  $ZodString,
  $ZodStringFormat,
  $ZodSuccess,
  $ZodSymbol,
  $ZodTemplateLiteral,
  $ZodTransform,
  $ZodTuple,
  $ZodType,
  $ZodULID,
  $ZodURL,
  $ZodUUID,
  $ZodUndefined,
  $ZodUnion,
  $ZodUnknown,
  $ZodVoid,
  $ZodXID,
  $ZodXor,
  $brand,
  $constructor,
  $input,
  $output,
  INVALID,
  NEVER,
  TimePrecision,
  ZodCompileAsyncError,
  ZodCompileUnsupportedError,
  _any,
  _base64,
  _base64url,
  _bigint,
  _boolean,
  _cidrv4,
  _cidrv6,
  _coercedBigint,
  _coercedBoolean,
  _coercedDate,
  _coercedNumber,
  _coercedString,
  _creditCard,
  _cuid,
  _cuid2,
  _custom,
  _date,
  _e164,
  _email,
  _emoji,
  _endsWith,
  _file,
  _float32,
  _float64,
  _gt,
  _gte,
  _guid,
  _iban,
  _includes,
  _int,
  _int32,
  _int64,
  _ipv4,
  _ipv6,
  _isoDate,
  _isoDateTime,
  _isoDuration,
  _isoTime,
  _jwt,
  _ksuid,
  _length,
  _lowercase,
  _lt,
  _lte,
  _mac,
  _maxLength,
  _maxSize,
  _mime,
  _minLength,
  _minSize,
  _multipleOf,
  _nan,
  _nanoid,
  _negative,
  _never,
  _nonnegative,
  _nonpositive,
  _normalize,
  _null,
  _number,
  _overwrite,
  _positive,
  _properties,
  _property,
  _refine,
  _regex,
  _size,
  _startsWith,
  _string,
  _stringFormat,
  _stringbool,
  _superRefine,
  _symbol,
  _toLowerCase,
  _toUpperCase,
  _trim,
  _uint32,
  _uint64,
  _ulid,
  _undefined,
  _unknown,
  _uppercase,
  _url,
  _uuid,
  _uuidv4,
  _uuidv6,
  _uuidv7,
  _void,
  _xid,
  clone,
  compile,
  config,
  core_exports,
  decode,
  decodeAsync,
  describe,
  encode,
  encodeAsync,
  extend,
  flattenError,
  formatError,
  getDiscriminatedOption,
  globalRegistry,
  installLazyProp,
  locales_exports,
  memoizer,
  merge,
  mergeDefs,
  meta,
  normalizeParams,
  omit,
  own,
  parse,
  parseAsync,
  partial,
  pick,
  prettifyError,
  regexes_exports,
  registry,
  required,
  safeDecode,
  safeDecodeAsync,
  safeEncode,
  safeEncodeAsync,
  safeExtend,
  safeParse,
  safeParseAsync,
  shallowClone,
  toJSONSchema,
  toZod,
  treeifyError,
  util_exports,
  validate,
  validateAsync,
  visit,
  withParser
} from "./shared-XD7DXOTJ.mjs";
import {
  __export
} from "./shared-HHCBSOCX.mjs";

// node_modules/zod/v4/mini/external.js
var external_exports = {};
__export(external_exports, {
  $brand: () => $brand,
  $input: () => $input,
  $output: () => $output,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  ZodCompileAsyncError: () => ZodCompileAsyncError,
  ZodCompileUnsupportedError: () => ZodCompileUnsupportedError,
  ZodMiniAny: () => ZodMiniAny,
  ZodMiniArray: () => ZodMiniArray,
  ZodMiniBase64: () => ZodMiniBase64,
  ZodMiniBase64URL: () => ZodMiniBase64URL,
  ZodMiniBigInt: () => ZodMiniBigInt,
  ZodMiniBigIntFormat: () => ZodMiniBigIntFormat,
  ZodMiniBoolean: () => ZodMiniBoolean,
  ZodMiniCIDRv4: () => ZodMiniCIDRv4,
  ZodMiniCIDRv6: () => ZodMiniCIDRv6,
  ZodMiniCUID: () => ZodMiniCUID,
  ZodMiniCUID2: () => ZodMiniCUID2,
  ZodMiniCatch: () => ZodMiniCatch,
  ZodMiniCodec: () => ZodMiniCodec,
  ZodMiniCreditCard: () => ZodMiniCreditCard,
  ZodMiniCustom: () => ZodMiniCustom,
  ZodMiniCustomStringFormat: () => ZodMiniCustomStringFormat,
  ZodMiniDate: () => ZodMiniDate,
  ZodMiniDefault: () => ZodMiniDefault,
  ZodMiniDiscriminatedUnion: () => ZodMiniDiscriminatedUnion,
  ZodMiniE164: () => ZodMiniE164,
  ZodMiniEmail: () => ZodMiniEmail,
  ZodMiniEmoji: () => ZodMiniEmoji,
  ZodMiniEnum: () => ZodMiniEnum,
  ZodMiniExactOptional: () => ZodMiniExactOptional,
  ZodMiniFile: () => ZodMiniFile,
  ZodMiniFunction: () => ZodMiniFunction,
  ZodMiniGUID: () => ZodMiniGUID,
  ZodMiniIBAN: () => ZodMiniIBAN,
  ZodMiniIPv4: () => ZodMiniIPv4,
  ZodMiniIPv6: () => ZodMiniIPv6,
  ZodMiniISODate: () => ZodMiniISODate,
  ZodMiniISODateTime: () => ZodMiniISODateTime,
  ZodMiniISODuration: () => ZodMiniISODuration,
  ZodMiniISOTime: () => ZodMiniISOTime,
  ZodMiniIntersection: () => ZodMiniIntersection,
  ZodMiniJWT: () => ZodMiniJWT,
  ZodMiniKSUID: () => ZodMiniKSUID,
  ZodMiniLazy: () => ZodMiniLazy,
  ZodMiniLiteral: () => ZodMiniLiteral,
  ZodMiniMAC: () => ZodMiniMAC,
  ZodMiniMap: () => ZodMiniMap,
  ZodMiniNaN: () => ZodMiniNaN,
  ZodMiniNanoID: () => ZodMiniNanoID,
  ZodMiniNever: () => ZodMiniNever,
  ZodMiniNonOptional: () => ZodMiniNonOptional,
  ZodMiniNull: () => ZodMiniNull,
  ZodMiniNullable: () => ZodMiniNullable,
  ZodMiniNumber: () => ZodMiniNumber,
  ZodMiniNumberFormat: () => ZodMiniNumberFormat,
  ZodMiniObject: () => ZodMiniObject,
  ZodMiniOptional: () => ZodMiniOptional,
  ZodMiniPipe: () => ZodMiniPipe,
  ZodMiniPrefault: () => ZodMiniPrefault,
  ZodMiniPromise: () => ZodMiniPromise,
  ZodMiniProperties: () => ZodMiniProperties,
  ZodMiniReadonly: () => ZodMiniReadonly,
  ZodMiniRecord: () => ZodMiniRecord,
  ZodMiniSet: () => ZodMiniSet,
  ZodMiniString: () => ZodMiniString,
  ZodMiniStringFormat: () => ZodMiniStringFormat,
  ZodMiniSuccess: () => ZodMiniSuccess,
  ZodMiniSymbol: () => ZodMiniSymbol,
  ZodMiniTemplateLiteral: () => ZodMiniTemplateLiteral,
  ZodMiniTransform: () => ZodMiniTransform,
  ZodMiniTuple: () => ZodMiniTuple,
  ZodMiniType: () => ZodMiniType,
  ZodMiniULID: () => ZodMiniULID,
  ZodMiniURL: () => ZodMiniURL,
  ZodMiniUUID: () => ZodMiniUUID,
  ZodMiniUndefined: () => ZodMiniUndefined,
  ZodMiniUnion: () => ZodMiniUnion,
  ZodMiniUnknown: () => ZodMiniUnknown,
  ZodMiniVoid: () => ZodMiniVoid,
  ZodMiniXID: () => ZodMiniXID,
  ZodMiniXor: () => ZodMiniXor,
  _default: () => _default,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base64,
  base64url: () => base64url,
  bigint: () => bigint,
  boolean: () => boolean,
  catch: () => _catch,
  catchall: () => catchall,
  check: () => check,
  cidrv4: () => cidrv4,
  cidrv6: () => cidrv6,
  clone: () => clone,
  codec: () => codec,
  coerce: () => coerce_exports,
  compile: () => compile,
  config: () => config,
  core: () => core_exports,
  creditCard: () => creditCard,
  cuid: () => cuid,
  cuid2: () => cuid2,
  custom: () => custom,
  date: () => date,
  decode: () => decode,
  decodeAsync: () => decodeAsync,
  deepPartial: () => deepPartial,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e164,
  email: () => email,
  emoji: () => emoji,
  encode: () => encode,
  encodeAsync: () => encodeAsync,
  endsWith: () => _endsWith,
  enum: () => _enum,
  exactOptional: () => exactOptional,
  exactPartial: () => exactPartial,
  extend: () => extend2,
  file: () => file,
  flattenError: () => flattenError,
  float32: () => float32,
  float64: () => float64,
  formatError: () => formatError,
  function: () => _function,
  getDiscriminatedOption: () => getDiscriminatedOption,
  globalRegistry: () => globalRegistry,
  gt: () => _gt,
  gte: () => _gte,
  guid: () => guid,
  hash: () => hash,
  hex: () => hex,
  hostname: () => hostname,
  httpUrl: () => httpUrl,
  iban: () => iban,
  includes: () => _includes,
  input: () => input,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  invertCodec: () => invertCodec,
  ipv4: () => ipv4,
  ipv6: () => ipv6,
  iso: () => iso_exports,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid,
  lazy: () => _lazy,
  length: () => _length,
  literal: () => literal,
  locales: () => locales_exports,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  mac: () => mac,
  map: () => map,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  maximum: () => _lte,
  memoizer: () => memoizer,
  merge: () => merge2,
  meta: () => meta2,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  minimum: () => _gte,
  multipleOf: () => _multipleOf,
  nan: () => nan,
  nanoid: () => nanoid,
  nativeEnum: () => nativeEnum,
  negative: () => _negative,
  never: () => never,
  nonnegative: () => _nonnegative,
  nonoptional: () => nonoptional,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  null: () => _null2,
  nullable: () => nullable,
  nullish: () => nullish,
  number: () => number,
  object: () => object,
  omit: () => omit2,
  optional: () => optional,
  output: () => output,
  overwrite: () => _overwrite,
  parse: () => parse,
  parseAsync: () => parseAsync,
  partial: () => partial2,
  partialRecord: () => partialRecord,
  pick: () => pick2,
  pipe: () => pipe,
  positive: () => _positive,
  prefault: () => prefault,
  prettifyError: () => prettifyError,
  promise: () => promise,
  properties: () => properties,
  property: () => _property,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  regex: () => _regex,
  regexes: () => regexes_exports,
  registry: () => registry,
  required: () => required2,
  safeDecode: () => safeDecode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeEncode: () => safeEncode,
  safeEncodeAsync: () => safeEncodeAsync,
  safeExtend: () => safeExtend2,
  safeParse: () => safeParse,
  safeParseAsync: () => safeParseAsync,
  set: () => set,
  size: () => _size,
  startsWith: () => _startsWith,
  strictObject: () => strictObject,
  string: () => string,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  toJSONSchema: () => toJSONSchema,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  toZod: () => toZod,
  transform: () => transform,
  treeifyError: () => treeifyError,
  trim: () => _trim,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid,
  undefined: () => _undefined2,
  union: () => union,
  unknown: () => unknown,
  uppercase: () => _uppercase,
  url: () => url,
  util: () => util_exports,
  uuid: () => uuid,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  validate: () => validate,
  validateAsync: () => validateAsync,
  void: () => _void2,
  withParser: () => withParser,
  xid: () => xid,
  xor: () => xor
});

// node_modules/zod/v4/mini/schemas.js
var ZodMiniType = /* @__PURE__ */ $constructor("ZodMiniType", (inst, def) => {
  if (!inst._zod)
    throw new Error("Uninitialized schema in ZodMiniType.");
  $ZodType.init(inst, def);
  inst.def = def;
  inst.type = def.type;
}, {
  // `with` is an alias for `check`: the same function object, not a wrapper.
  get with() {
    return this.check;
  },
  set with(value) {
    own(this, "with", value);
  },
  parse(data, params) {
    return parse(this, data, params, { callee: this.parse });
  },
  parseAsync(data, params) {
    return parseAsync(this, data, params, { callee: this.parseAsync });
  },
  safeParse(data, params) {
    return safeParse(this, data, params);
  },
  safeParseAsync(data, params) {
    return safeParseAsync(this, data, params);
  },
  check(...checks) {
    const def = this.def;
    return this.clone({
      ...def,
      checks: [
        ...def.checks ?? [],
        ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
      ]
    }, { parent: true });
  },
  clone(_def, params) {
    return clone(this, _def, params);
  },
  brand() {
    return this;
  },
  register(reg, meta3) {
    reg.add(this, meta3);
    return this;
  },
  apply(fn, ...args) {
    return args.length === 0 ? fn(this) : fn(this, ...args);
  }
});
var ZodMiniString = /* @__PURE__ */ $constructor("ZodMiniString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function string(params) {
  return _string(ZodMiniString, params);
}
var ZodMiniStringFormat = /* @__PURE__ */ $constructor("ZodMiniStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  ZodMiniString.init(inst, def);
});
var ZodMiniEmail = /* @__PURE__ */ $constructor("ZodMiniEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function email(params) {
  return _email(ZodMiniEmail, params);
}
var ZodMiniGUID = /* @__PURE__ */ $constructor("ZodMiniGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function guid(params) {
  return _guid(ZodMiniGUID, params);
}
var ZodMiniUUID = /* @__PURE__ */ $constructor("ZodMiniUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function uuid(params) {
  return _uuid(ZodMiniUUID, params);
}
// @__NO_SIDE_EFFECTS__
function uuidv4(params) {
  return _uuidv4(ZodMiniUUID, params);
}
// @__NO_SIDE_EFFECTS__
function uuidv6(params) {
  return _uuidv6(ZodMiniUUID, params);
}
// @__NO_SIDE_EFFECTS__
function uuidv7(params) {
  return _uuidv7(ZodMiniUUID, params);
}
var ZodMiniURL = /* @__PURE__ */ $constructor("ZodMiniURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function url(params) {
  return _url(ZodMiniURL, params);
}
// @__NO_SIDE_EFFECTS__
function httpUrl(params) {
  return _url(ZodMiniURL, {
    protocol: regexes_exports.httpProtocol,
    hostname: regexes_exports.domain,
    ...normalizeParams(params)
  });
}
var ZodMiniEmoji = /* @__PURE__ */ $constructor("ZodMiniEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function emoji(params) {
  return _emoji(ZodMiniEmoji, params);
}
var ZodMiniNanoID = /* @__PURE__ */ $constructor("ZodMiniNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function nanoid(params) {
  return _nanoid(ZodMiniNanoID, params);
}
var ZodMiniCUID = /* @__PURE__ */ $constructor("ZodMiniCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function cuid(params) {
  return _cuid(ZodMiniCUID, params);
}
var ZodMiniCUID2 = /* @__PURE__ */ $constructor("ZodMiniCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function cuid2(params) {
  return _cuid2(ZodMiniCUID2, params);
}
var ZodMiniULID = /* @__PURE__ */ $constructor("ZodMiniULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function ulid(params) {
  return _ulid(ZodMiniULID, params);
}
var ZodMiniXID = /* @__PURE__ */ $constructor("ZodMiniXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function xid(params) {
  return _xid(ZodMiniXID, params);
}
var ZodMiniKSUID = /* @__PURE__ */ $constructor("ZodMiniKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function ksuid(params) {
  return _ksuid(ZodMiniKSUID, params);
}
var ZodMiniIPv4 = /* @__PURE__ */ $constructor("ZodMiniIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function ipv4(params) {
  return _ipv4(ZodMiniIPv4, params);
}
var ZodMiniIPv6 = /* @__PURE__ */ $constructor("ZodMiniIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function ipv6(params) {
  return _ipv6(ZodMiniIPv6, params);
}
var ZodMiniCIDRv4 = /* @__PURE__ */ $constructor("ZodMiniCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function cidrv4(params) {
  return _cidrv4(ZodMiniCIDRv4, params);
}
var ZodMiniCIDRv6 = /* @__PURE__ */ $constructor("ZodMiniCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function cidrv6(params) {
  return _cidrv6(ZodMiniCIDRv6, params);
}
var ZodMiniMAC = /* @__PURE__ */ $constructor("ZodMiniMAC", (inst, def) => {
  $ZodMAC.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function mac(params) {
  return _mac(ZodMiniMAC, params);
}
var ZodMiniBase64 = /* @__PURE__ */ $constructor("ZodMiniBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function base64(params) {
  return _base64(ZodMiniBase64, params);
}
var ZodMiniBase64URL = /* @__PURE__ */ $constructor("ZodMiniBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function base64url(params) {
  return _base64url(ZodMiniBase64URL, params);
}
var ZodMiniE164 = /* @__PURE__ */ $constructor("ZodMiniE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function e164(params) {
  return _e164(ZodMiniE164, params);
}
var ZodMiniCreditCard = /* @__PURE__ */ $constructor("ZodMiniCreditCard", (inst, def) => {
  $ZodCreditCard.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function creditCard(params) {
  return _creditCard(ZodMiniCreditCard, params);
}
var ZodMiniIBAN = /* @__PURE__ */ $constructor("ZodMiniIBAN", (inst, def) => {
  $ZodIBAN.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function iban(params) {
  return _iban(ZodMiniIBAN, params);
}
var ZodMiniJWT = /* @__PURE__ */ $constructor("ZodMiniJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function jwt(params) {
  return _jwt(ZodMiniJWT, params);
}
var ZodMiniCustomStringFormat = /* @__PURE__ */ $constructor("ZodMiniCustomStringFormat", (inst, def) => {
  $ZodCustomStringFormat.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodMiniCustomStringFormat, format, fnOrRegex, _params);
}
// @__NO_SIDE_EFFECTS__
function hostname(_params) {
  return _stringFormat(ZodMiniCustomStringFormat, "hostname", regexes_exports.hostname, _params);
}
// @__NO_SIDE_EFFECTS__
function hex(_params) {
  return _stringFormat(ZodMiniCustomStringFormat, "hex", regexes_exports.hex, _params);
}
// @__NO_SIDE_EFFECTS__
function hash(alg, params) {
  const enc = params?.enc ?? "hex";
  const format = `${alg}_${enc}`;
  const regex = regexes_exports[format];
  if (!regex)
    throw new Error(`Unrecognized hash format: ${format}`);
  return _stringFormat(ZodMiniCustomStringFormat, format, regex, params);
}
var ZodMiniNumber = /* @__PURE__ */ $constructor("ZodMiniNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function number(params) {
  return _number(ZodMiniNumber, params);
}
var ZodMiniNumberFormat = /* @__PURE__ */ $constructor("ZodMiniNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodMiniNumber.init(inst, def);
});
function int(params) {
  return _int(ZodMiniNumberFormat, params);
}
function float32(params) {
  return _float32(ZodMiniNumberFormat, params);
}
function float64(params) {
  return _float64(ZodMiniNumberFormat, params);
}
function int32(params) {
  return _int32(ZodMiniNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodMiniNumberFormat, params);
}
var ZodMiniBoolean = /* @__PURE__ */ $constructor("ZodMiniBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function boolean(params) {
  return _boolean(ZodMiniBoolean, params);
}
var ZodMiniBigInt = /* @__PURE__ */ $constructor("ZodMiniBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function bigint(params) {
  return _bigint(ZodMiniBigInt, params);
}
var ZodMiniBigIntFormat = /* @__PURE__ */ $constructor("ZodMiniBigIntFormat", (inst, def) => {
  $ZodBigIntFormat.init(inst, def);
  ZodMiniBigInt.init(inst, def);
});
function int64(params) {
  return _int64(ZodMiniBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodMiniBigIntFormat, params);
}
var ZodMiniSymbol = /* @__PURE__ */ $constructor("ZodMiniSymbol", (inst, def) => {
  $ZodSymbol.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function symbol(params) {
  return _symbol(ZodMiniSymbol, params);
}
var ZodMiniUndefined = /* @__PURE__ */ $constructor("ZodMiniUndefined", (inst, def) => {
  $ZodUndefined.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _undefined2(params) {
  return _undefined(ZodMiniUndefined, params);
}
var ZodMiniNull = /* @__PURE__ */ $constructor("ZodMiniNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _null2(params) {
  return _null(ZodMiniNull, params);
}
var ZodMiniAny = /* @__PURE__ */ $constructor("ZodMiniAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function any() {
  return _any(ZodMiniAny);
}
var ZodMiniUnknown = /* @__PURE__ */ $constructor("ZodMiniUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function unknown() {
  return _unknown(ZodMiniUnknown);
}
var ZodMiniNever = /* @__PURE__ */ $constructor("ZodMiniNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function never(params) {
  return _never(ZodMiniNever, params);
}
var ZodMiniVoid = /* @__PURE__ */ $constructor("ZodMiniVoid", (inst, def) => {
  $ZodVoid.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _void2(params) {
  return _void(ZodMiniVoid, params);
}
var ZodMiniDate = /* @__PURE__ */ $constructor("ZodMiniDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function date(params) {
  return _date(ZodMiniDate, params);
}
var ZodMiniArray = /* @__PURE__ */ $constructor("ZodMiniArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function array(element, params) {
  return new ZodMiniArray({
    type: "array",
    element,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function keyof(schema) {
  const shape = schema._zod.def.shape;
  return /* @__PURE__ */ _enum(Object.keys(shape));
}
var ZodMiniObject = /* @__PURE__ */ $constructor("ZodMiniObject", (inst, def) => {
  $ZodObject.init(inst, def);
  ZodMiniType.init(inst, def);
  installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
});
// @__NO_SIDE_EFFECTS__
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...normalizeParams(params)
  };
  return new ZodMiniObject(def);
}
// @__NO_SIDE_EFFECTS__
function strictObject(shape, params) {
  return new ZodMiniObject({
    type: "object",
    shape,
    catchall: /* @__PURE__ */ never(),
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function looseObject(shape, params) {
  return new ZodMiniObject({
    type: "object",
    shape,
    catchall: /* @__PURE__ */ unknown(),
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function extend2(schema, shape) {
  return extend(schema, shape);
}
// @__NO_SIDE_EFFECTS__
function safeExtend2(schema, shape) {
  return safeExtend(schema, shape);
}
// @__NO_SIDE_EFFECTS__
function merge2(a, b) {
  return merge(a, b);
}
// @__NO_SIDE_EFFECTS__
function pick2(schema, mask) {
  return pick(schema, mask);
}
// @__NO_SIDE_EFFECTS__
function omit2(schema, mask) {
  return omit(schema, mask);
}
// @__NO_SIDE_EFFECTS__
function partial2(schema, mask) {
  const def = schema._zod.def;
  if (def.type !== "tuple")
    return partial(ZodMiniOptional, schema, mask);
  if (def.checks?.length)
    throw new Error(".partial() cannot be used on tuple schemas containing refinements");
  return clone(schema, {
    ...def,
    items: def.items.map((item) => new ZodMiniOptional({ type: "optional", innerType: item }))
  });
}
// @__NO_SIDE_EFFECTS__
function exactPartial(schema, mask) {
  return partial(ZodMiniExactOptional, schema, mask, "exactPartial");
}
// @__NO_SIDE_EFFECTS__
function required2(schema, mask) {
  return required(ZodMiniNonOptional, schema, mask);
}
// @__NO_SIDE_EFFECTS__
function catchall(inst, catchall2) {
  return inst.clone(mergeDefs(inst._zod.def, { catchall: catchall2 }));
}
var ZodMiniUnion = /* @__PURE__ */ $constructor("ZodMiniUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function union(options, params) {
  return new ZodMiniUnion({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
var ZodMiniXor = /* @__PURE__ */ $constructor("ZodMiniXor", (inst, def) => {
  ZodMiniUnion.init(inst, def);
  $ZodXor.init(inst, def);
});
function xor(options, params) {
  return new ZodMiniXor({
    type: "union",
    options,
    inclusive: false,
    ...normalizeParams(params)
  });
}
var ZodMiniDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodMiniDiscriminatedUnion", (inst, def) => {
  $ZodDiscriminatedUnion.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function discriminatedUnion(discriminator, options, params) {
  return new ZodMiniDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
var ZodMiniIntersection = /* @__PURE__ */ $constructor("ZodMiniIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function intersection(left, right) {
  return new ZodMiniIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodMiniTuple = /* @__PURE__ */ $constructor("ZodMiniTuple", (inst, def) => {
  $ZodTuple.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodMiniTuple({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
var ZodMiniRecord = /* @__PURE__ */ $constructor("ZodMiniRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function record(keyType, valueType, params) {
  if (!valueType || !valueType._zod) {
    return new ZodMiniRecord({
      type: "record",
      keyType: /* @__PURE__ */ string(),
      valueType: keyType,
      ...normalizeParams(valueType)
    });
  }
  return new ZodMiniRecord({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function partialRecord(keyType, valueType, params) {
  return new ZodMiniRecord({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params),
    partial: true
  });
}
function looseRecord(keyType, valueType, params) {
  return new ZodMiniRecord({
    type: "record",
    keyType,
    valueType,
    mode: "loose",
    ...normalizeParams(params)
  });
}
var ZodMiniMap = /* @__PURE__ */ $constructor("ZodMiniMap", (inst, def) => {
  $ZodMap.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function map(keyType, valueType, params) {
  return new ZodMiniMap({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
var ZodMiniSet = /* @__PURE__ */ $constructor("ZodMiniSet", (inst, def) => {
  $ZodSet.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function set(valueType, params) {
  return new ZodMiniSet({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
var ZodMiniEnum = /* @__PURE__ */ $constructor("ZodMiniEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodMiniType.init(inst, def);
  inst.options = [...inst._zod.values];
});
// @__NO_SIDE_EFFECTS__
function _enum(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodMiniEnum({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function nativeEnum(entries, params) {
  return new ZodMiniEnum({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
var ZodMiniLiteral = /* @__PURE__ */ $constructor("ZodMiniLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function literal(value, params) {
  return new ZodMiniLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
var ZodMiniFile = /* @__PURE__ */ $constructor("ZodMiniFile", (inst, def) => {
  $ZodFile.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function file(params) {
  return _file(ZodMiniFile, params);
}
var ZodMiniTransform = /* @__PURE__ */ $constructor("ZodMiniTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function transform(fn) {
  return new ZodMiniTransform({
    type: "transform",
    transform: fn
  });
}
var ZodMiniOptional = /* @__PURE__ */ $constructor("ZodMiniOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function optional(innerType) {
  return new ZodMiniOptional({
    type: "optional",
    innerType
  });
}
var ZodMiniExactOptional = /* @__PURE__ */ $constructor("ZodMiniExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function exactOptional(innerType) {
  return new ZodMiniExactOptional({
    type: "optional",
    innerType
  });
}
var ZodMiniNullable = /* @__PURE__ */ $constructor("ZodMiniNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function nullable(innerType) {
  return new ZodMiniNullable({
    type: "nullable",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function nullish(innerType) {
  return /* @__PURE__ */ optional(/* @__PURE__ */ nullable(innerType));
}
var ZodMiniDefault = /* @__PURE__ */ $constructor("ZodMiniDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _default(innerType, defaultValue) {
  return new ZodMiniDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
var ZodMiniPrefault = /* @__PURE__ */ $constructor("ZodMiniPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function prefault(innerType, defaultValue) {
  return new ZodMiniPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
var ZodMiniNonOptional = /* @__PURE__ */ $constructor("ZodMiniNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function nonoptional(innerType, params) {
  return new ZodMiniNonOptional({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
var ZodMiniSuccess = /* @__PURE__ */ $constructor("ZodMiniSuccess", (inst, def) => {
  $ZodSuccess.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function success(innerType) {
  return new ZodMiniSuccess({
    type: "success",
    innerType
  });
}
var ZodMiniCatch = /* @__PURE__ */ $constructor("ZodMiniCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _catch(innerType, catchValue) {
  return new ZodMiniCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : util_exports.constantCatch(catchValue)
  });
}
var ZodMiniNaN = /* @__PURE__ */ $constructor("ZodMiniNaN", (inst, def) => {
  $ZodNaN.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function nan(params) {
  return _nan(ZodMiniNaN, params);
}
var ZodMiniPipe = /* @__PURE__ */ $constructor("ZodMiniPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function pipe(in_, out) {
  return new ZodMiniPipe({
    type: "pipe",
    in: in_,
    out
  });
}
var ZodMiniCodec = /* @__PURE__ */ $constructor("ZodMiniCodec", (inst, def) => {
  ZodMiniPipe.init(inst, def);
  $ZodCodec.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function codec(in_, out, params) {
  return new ZodMiniCodec({
    type: "pipe",
    in: in_,
    out,
    transform: params.decode,
    reverseTransform: params.encode
  });
}
// @__NO_SIDE_EFFECTS__
function invertCodec(codec2) {
  const def = codec2._zod.def;
  return new ZodMiniCodec({
    type: "pipe",
    in: def.out,
    out: def.in,
    transform: def.reverseTransform,
    reverseTransform: def.transform
  });
}
var ZodMiniReadonly = /* @__PURE__ */ $constructor("ZodMiniReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function readonly(innerType) {
  return new ZodMiniReadonly({
    type: "readonly",
    innerType
  });
}
var ZodMiniTemplateLiteral = /* @__PURE__ */ $constructor("ZodMiniTemplateLiteral", (inst, def) => {
  $ZodTemplateLiteral.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function templateLiteral(parts, params) {
  return new ZodMiniTemplateLiteral({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
var ZodMiniLazy = /* @__PURE__ */ $constructor("ZodMiniLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _lazy(getter) {
  return new ZodMiniLazy({
    type: "lazy",
    getter
  });
}
var ZodMiniPromise = /* @__PURE__ */ $constructor("ZodMiniPromise", (inst, def) => {
  $ZodPromise.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function promise(innerType) {
  return new ZodMiniPromise({
    type: "promise",
    innerType
  });
}
var ZodMiniCustom = /* @__PURE__ */ $constructor("ZodMiniCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodMiniType.init(inst, def);
});
var ZodMiniProperties = /* @__PURE__ */ $constructor("ZodMiniProperties", (inst, def) => {
  $ZodProperties.init(inst, def);
  ZodMiniType.init(inst, def);
});
function properties(shape, params) {
  return _properties(ZodMiniProperties, shape, params);
}
// @__NO_SIDE_EFFECTS__
function check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
// @__NO_SIDE_EFFECTS__
function custom(fn, _params) {
  return _custom(ZodMiniCustom, fn ?? (() => true), _params);
}
// @__NO_SIDE_EFFECTS__
function refine(fn, _params = {}) {
  return _refine(ZodMiniCustom, fn, _params);
}
// @__NO_SIDE_EFFECTS__
function superRefine(fn, params) {
  return _superRefine(fn, params);
}
var describe2 = describe;
var meta2 = meta;
// @__NO_SIDE_EFFECTS__
function _instanceof(cls, params = {}) {
  const inst = /* @__PURE__ */ custom((data) => data instanceof cls, params);
  inst._zod.bag.Class = cls;
  inst._zod.check = (payload) => {
    if (!(payload.value instanceof cls)) {
      payload.issues.push({
        code: "invalid_type",
        expected: cls.name,
        input: payload.value,
        inst,
        path: [...inst._zod.def.path ?? []]
      });
    }
  };
  return inst;
}
var stringbool = (...args) => _stringbool({
  Codec: ZodMiniCodec,
  Boolean: ZodMiniBoolean,
  String: ZodMiniString
}, ...args);
// @__NO_SIDE_EFFECTS__
function json() {
  const jsonSchema = /* @__PURE__ */ _lazy(() => {
    return /* @__PURE__ */ union([/* @__PURE__ */ string(), /* @__PURE__ */ number(), /* @__PURE__ */ boolean(), /* @__PURE__ */ _null2(), /* @__PURE__ */ array(jsonSchema), /* @__PURE__ */ record(/* @__PURE__ */ string(), jsonSchema)]);
  });
  return jsonSchema;
}
var ZodMiniFunction = /* @__PURE__ */ $constructor("ZodMiniFunction", (inst, def) => {
  $ZodFunction.init(inst, def);
  ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _function(params) {
  return new ZodMiniFunction({
    type: "function",
    input: Array.isArray(params?.input) ? /* @__PURE__ */ tuple(params?.input) : params?.input ?? /* @__PURE__ */ array(/* @__PURE__ */ unknown()),
    output: params?.output ?? /* @__PURE__ */ unknown()
  });
}

// node_modules/zod/v4/mini/deep-partial.js
function deepPartial(schema) {
  return visit(schema, {
    object: (s) => partial2(s),
    // See `classic/deep-partial.ts`.
    union: (s) => {
      const def = s._zod.def;
      return def.discriminator === void 0 ? s : union(def.options);
    }
  });
}

// node_modules/zod/v4/mini/in-out.js
function withChecks(side, checks) {
  if (!checks?.length)
    return side;
  const def = side._zod.def;
  return clone(side, mergeDefs(def, { checks: [...def.checks ?? [], ...checks] }), { parent: true });
}
function outSide(def) {
  return withChecks(def.out, def.checks);
}
function inSide(def) {
  return def.in._zod.traits.has("$ZodTransform") ? outSide(def) : def.in;
}
function input(schema) {
  return visit(schema, {
    pipe: (s) => inSide(s._zod.def),
    // A default value belongs to the output side, so a rewritten inner type leaves it stranded. `.default()` widens the declared input type with `undefined`, and `optional` is what carries that across.
    default: (s, rewritten) => rewritten ? optional(s._zod.def.innerType) : s,
    // A catch value is output-side too, but `.catch()` leaves the declared input type alone, so the inner schema stands on its own.
    catch: (s, rewritten) => rewritten ? s._zod.def.innerType : s
  });
}
function output(schema) {
  return visit(schema, {
    pipe: (s) => outSide(s._zod.def),
    // A prefault value is fed through the schema, which makes it input-side, so a rewritten inner type leaves it stranded.
    prefault: (s, rewritten) => rewritten ? s._zod.def.innerType : s
  });
}

// node_modules/zod/v4/mini/iso.js
var iso_exports = {};
__export(iso_exports, {
  ZodMiniISODate: () => ZodMiniISODate,
  ZodMiniISODateTime: () => ZodMiniISODateTime,
  ZodMiniISODuration: () => ZodMiniISODuration,
  ZodMiniISOTime: () => ZodMiniISOTime,
  date: () => date2,
  datetime: () => datetime,
  duration: () => duration,
  time: () => time
});
var ZodMiniISODateTime = /* @__PURE__ */ $constructor("ZodMiniISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function datetime(params) {
  return _isoDateTime(ZodMiniISODateTime, params);
}
var ZodMiniISODate = /* @__PURE__ */ $constructor("ZodMiniISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function date2(params) {
  return _isoDate(ZodMiniISODate, params);
}
var ZodMiniISOTime = /* @__PURE__ */ $constructor("ZodMiniISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function time(params) {
  return _isoTime(ZodMiniISOTime, params);
}
var ZodMiniISODuration = /* @__PURE__ */ $constructor("ZodMiniISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function duration(params) {
  return _isoDuration(ZodMiniISODuration, params);
}

// node_modules/zod/v4/mini/coerce.js
var coerce_exports = {};
__export(coerce_exports, {
  bigint: () => bigint2,
  boolean: () => boolean2,
  date: () => date3,
  number: () => number2,
  string: () => string2
});
// @__NO_SIDE_EFFECTS__
function string2(params) {
  return _coercedString(ZodMiniString, params);
}
// @__NO_SIDE_EFFECTS__
function number2(params) {
  return _coercedNumber(ZodMiniNumber, params);
}
// @__NO_SIDE_EFFECTS__
function boolean2(params) {
  return _coercedBoolean(ZodMiniBoolean, params);
}
// @__NO_SIDE_EFFECTS__
function bigint2(params) {
  return _coercedBigint(ZodMiniBigInt, params);
}
// @__NO_SIDE_EFFECTS__
function date3(params) {
  return _coercedDate(ZodMiniDate, params);
}

export {
  ZodMiniType,
  ZodMiniString,
  string,
  ZodMiniStringFormat,
  ZodMiniEmail,
  email,
  ZodMiniGUID,
  guid,
  ZodMiniUUID,
  uuid,
  uuidv4,
  uuidv6,
  uuidv7,
  ZodMiniURL,
  url,
  httpUrl,
  ZodMiniEmoji,
  emoji,
  ZodMiniNanoID,
  nanoid,
  ZodMiniCUID,
  cuid,
  ZodMiniCUID2,
  cuid2,
  ZodMiniULID,
  ulid,
  ZodMiniXID,
  xid,
  ZodMiniKSUID,
  ksuid,
  ZodMiniIPv4,
  ipv4,
  ZodMiniIPv6,
  ipv6,
  ZodMiniCIDRv4,
  cidrv4,
  ZodMiniCIDRv6,
  cidrv6,
  ZodMiniMAC,
  mac,
  ZodMiniBase64,
  base64,
  ZodMiniBase64URL,
  base64url,
  ZodMiniE164,
  e164,
  ZodMiniCreditCard,
  creditCard,
  ZodMiniIBAN,
  iban,
  ZodMiniJWT,
  jwt,
  ZodMiniCustomStringFormat,
  stringFormat,
  hostname,
  hex,
  hash,
  ZodMiniNumber,
  number,
  ZodMiniNumberFormat,
  int,
  float32,
  float64,
  int32,
  uint32,
  ZodMiniBoolean,
  boolean,
  ZodMiniBigInt,
  bigint,
  ZodMiniBigIntFormat,
  int64,
  uint64,
  ZodMiniSymbol,
  symbol,
  ZodMiniUndefined,
  _undefined2 as _undefined,
  ZodMiniNull,
  _null2 as _null,
  ZodMiniAny,
  any,
  ZodMiniUnknown,
  unknown,
  ZodMiniNever,
  never,
  ZodMiniVoid,
  _void2 as _void,
  ZodMiniDate,
  date,
  ZodMiniArray,
  array,
  keyof,
  ZodMiniObject,
  object,
  strictObject,
  looseObject,
  extend2 as extend,
  safeExtend2 as safeExtend,
  merge2 as merge,
  pick2 as pick,
  omit2 as omit,
  partial2 as partial,
  exactPartial,
  required2 as required,
  catchall,
  ZodMiniUnion,
  union,
  ZodMiniXor,
  xor,
  ZodMiniDiscriminatedUnion,
  discriminatedUnion,
  ZodMiniIntersection,
  intersection,
  ZodMiniTuple,
  tuple,
  ZodMiniRecord,
  record,
  partialRecord,
  looseRecord,
  ZodMiniMap,
  map,
  ZodMiniSet,
  set,
  ZodMiniEnum,
  _enum,
  nativeEnum,
  ZodMiniLiteral,
  literal,
  ZodMiniFile,
  file,
  ZodMiniTransform,
  transform,
  ZodMiniOptional,
  optional,
  ZodMiniExactOptional,
  exactOptional,
  ZodMiniNullable,
  nullable,
  nullish,
  ZodMiniDefault,
  _default,
  ZodMiniPrefault,
  prefault,
  ZodMiniNonOptional,
  nonoptional,
  ZodMiniSuccess,
  success,
  ZodMiniCatch,
  _catch,
  ZodMiniNaN,
  nan,
  ZodMiniPipe,
  pipe,
  ZodMiniCodec,
  codec,
  invertCodec,
  ZodMiniReadonly,
  readonly,
  ZodMiniTemplateLiteral,
  templateLiteral,
  ZodMiniLazy,
  _lazy,
  ZodMiniPromise,
  promise,
  ZodMiniCustom,
  ZodMiniProperties,
  properties,
  check,
  custom,
  refine,
  superRefine,
  describe2 as describe,
  meta2 as meta,
  _instanceof,
  stringbool,
  json,
  ZodMiniFunction,
  _function,
  deepPartial,
  input,
  output,
  ZodMiniISODateTime,
  ZodMiniISODate,
  ZodMiniISOTime,
  ZodMiniISODuration,
  iso_exports,
  coerce_exports,
  external_exports
};
