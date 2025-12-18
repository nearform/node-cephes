export class ArgumentDomainError extends RangeError {
  constructor(funcName: string) {
    super(`cephes reports "argument domain error" in ${funcName}`);
  }
}

export class FunctionSingularityError extends Error {
  constructor(funcName: string) {
    super(`cephes reports "function singularity" in ${funcName}`);
  }
}
export class OverflowRangeError extends Error {
  constructor(funcName: string) {
    super(`cephes reports "overflow range error" in ${funcName}`);
  }
}
export class UnderflowRangeError extends Error {
  constructor(funcName: string) {
    super(`cephes reports "underflow range error" in ${funcName}`);
  }
}
export class TotalLossOfPrecisionError extends Error {
  constructor(funcName: string) {
    super(`cephes reports "total loss of precision" in ${funcName}`);
  }
}
export class PartialLossOfPrecisionError extends Error {
  constructor(funcName: string) {
    super(`cephes reports "partial loss of precision" in ${funcName}`);
  }
}
export class UnixDomainErrorCode extends Error {
  constructor(funcName: string) {
    super(`cephes reports "Unix domain error code" in ${funcName}`);
  }
}
export class UnixRangeErrorCode extends Error {
  constructor(funcName: string) {
    super(`cephes reports "Unix range error code" in ${funcName}`);
  }
}

export class UnknownCephesError extends Error {
  constructor(funcName: string) {
    super(`cephes reports "unknown error" in ${funcName}`);
  }
}
