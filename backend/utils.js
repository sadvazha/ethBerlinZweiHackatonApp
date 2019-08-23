/**
 *
 * @param {*} item
 * @returns {boolean}
 */
function isObject(item) {
    return typeof item === 'object' && item !== null;
};

/**
 *
 * @param {*} item
 * @returns {boolean}
 */
function isString(item) {
    return item && typeof item === 'string';
};

module.exports = {
    isObject,
    isString,
};