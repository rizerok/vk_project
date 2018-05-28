export const fetchResponseError = ({status, statusText}) => new Error(`fetch Response return status ${status} ${statusText}`);
export const vkResponseError = ({error_code, error_msg}) => new Error(`vk Response return error with code ${error_code} ${error_msg}`);
export const mongoResultError = ({name, message}) => new Error(`${name} ${message}`);