import fetch from "isomorphic-fetch";

export const makeRequest = (url) =>
    fetch(url)
        .then(
            response => response.ok ? response.json() : Promise.reject(new UnsuccessfulRequestError(response)),
            e => Promise.reject(new NetworkError(e))
        );


export function UnsuccessfulRequestError(response) {
    this.response = response;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        this.stack = (new Error()).stack;
    }
}

UnsuccessfulRequestError.prototype = Object.create(Error.prototype);
UnsuccessfulRequestError.prototype.constructor = UnsuccessfulRequestError;

export function NetworkError(cause) {
    this.cause = cause;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        this.stack = (new Error()).stack;
    }
}

NetworkError.prototype = Object.create(Error.prototype);
NetworkError.prototype.constructor = NetworkError;