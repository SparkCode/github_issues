export const NO_INTERNET_CONNECTION_MESSAGE = 'Check your internet connection';
export const RESOURCE_NOT_BE_FOUND_MESSAGE = 'Resource not be found';
export const UNKNOWN_ERROR_MESSAGE = 'Something went wrong, try later';

export const NETWORK_ERROR = 'NO_INTERNET_CONNECTION';
export const RESOURCE_NOT_BE_FOUND = 'RESOURCE_NOT_BE_FOUND';
export const UNKNOWN = 'UNKNOWN';

export const errorCauseEnum = {
  NETWORK_ERROR,
  RESOURCE_NOT_BE_FOUND,
  UNKNOWN,
};

export const errorCauseDefaultMessages = {
  [NETWORK_ERROR]: NO_INTERNET_CONNECTION_MESSAGE,
  [RESOURCE_NOT_BE_FOUND]: RESOURCE_NOT_BE_FOUND_MESSAGE,
  [UNKNOWN]: UNKNOWN_ERROR_MESSAGE,
};
