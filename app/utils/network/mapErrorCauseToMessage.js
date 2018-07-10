import { errorCauseDefaultMessages } from './constants';

export default (cause, messageOverrides) => {
  const messages = { ...errorCauseDefaultMessages, ...messageOverrides };
  return messages[cause];
};
