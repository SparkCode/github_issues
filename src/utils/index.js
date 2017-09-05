import KeyCodes from "./keyCodes";

const logError = (e) => console.error(e);

const formatDate = (date) => {
    const options = {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'};
    return new Date(date).toLocaleDateString("en-US", options);
};

export {KeyCodes, formatDate};
export default logError;
