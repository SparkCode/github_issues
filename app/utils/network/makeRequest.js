import fetch from 'isomorphic-fetch';
import UnsuccessfulRequestError from './UnsuccessfulRequestError';
import NetworkError from './NetworkError';

const makeRequest = url =>
  fetch(url).then(
    response => (response.ok ? response.json() : Promise.reject(new UnsuccessfulRequestError(response))),
    e => Promise.reject(new NetworkError(e)),
  );

export default makeRequest;
