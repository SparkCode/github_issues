import NetworkError from './NetworkError';
import { errorCauseEnum } from './constants';
import UnsuccessfulRequestError from './UnsuccessfulRequestError';

const conditionsMap = [
  [e => e instanceof NetworkError, errorCauseEnum.NETWORK_ERROR],
  [e => e instanceof UnsuccessfulRequestError && e.response.status === 404, errorCauseEnum.RESOURCE_NOT_BE_FOUND],
  [() => true, errorCauseEnum.UNKNOWN],
];

export default error => {
  const [, cause] = conditionsMap.find(([condition]) => condition(error));
  return cause;
};
