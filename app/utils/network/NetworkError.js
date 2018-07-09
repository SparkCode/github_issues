export default function NetworkError(cause) {
  this.cause = cause;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
}

NetworkError.prototype = Object.create(Error.prototype);
NetworkError.prototype.constructor = NetworkError;
