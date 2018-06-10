function VkError(error_object) {
    const {error_code, error_msg} = error_object;
    this.name = 'VkError';
    this.message = `vk Response return error with code ${error_code} ${error_msg}`;
    this.stack = (new Error()).stack;
    this.object = error_object;
}
VkError.prototype = Object.create(VkError.prototype);
VkError.prototype.constructor = VkError;

export const fetchResponseError = ({status, statusText}) => new Error(`fetch Response return status ${status} ${statusText}`);
export const vkResponseError = (error_object) => new VkError(error_object);
export const mongoResultError = ({name, message}) => new Error(`${name} ${message}`);