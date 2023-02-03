class HTTPError extends Error {
  constructor (code, message) {
    super(message);
    this.message = message;
    this.code = code;
  }
}
module.exports = HTTPError;