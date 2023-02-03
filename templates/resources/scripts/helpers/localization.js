/**
 * Find localized string.
 *
 * @param key
 * @param replace
 * @param locale
 * @returns {null|*}
 * @private
 */
export function __(key = null, replace = null, locale = 'en') {
    if (key === null) {
        return key;
    }

    locale               = locale ? locale : window.page.props.app.locale;
    let messages         = window.page.props.lang[ locale ];
    let fallbackMessages = window.page.props.lang.fallback;

    if (messages.hasOwnProperty(key)) {
        if (replace === null) {
            return messages[ key ];
        }
        return makeReplacements(messages[ key ], replace);
    }
    else if (fallbackMessages.hasOwnProperty(key)) {
        if (replace === null) {
            return fallbackMessages[ key ];
        }
        return makeReplacements(fallbackMessages[ key ], replace);
    }

    return key;
}

/**
 * Generate all possible variable replacements,
 * then replace if found.
 *
 * @param line
 * @param replace
 * @returns {*}
 */
function makeReplacements(line, replace) {
    if (replace.length === 0) {
        return line;
    }

    let shouldReplace = {};

    for (let [key, value] of Object.entries(replace)) {
        shouldReplace[ ':' + ucfirst(key ?? '') ] = ucfirst(value ?? '');
        shouldReplace[ ':' + upper(key ?? '') ]   = upper(value ?? '');
        shouldReplace[ ':' + key ]                = value;
    }

    return strtr(line, shouldReplace);
}

/**
 * Convert string to all uppercase.
 *
 * @param string
 * @returns {string}
 */
function upper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Convert first letter of string to uppercase.
 *
 * @param string
 * @returns {string}
 */
function ucfirst(string) {
    return string.toUpperCase();
}

/**
 * Translate certain characters based on pairs.
 *
 * @param string
 * @param replacePairs
 * @returns {*}
 */
function strtr(string, replacePairs) {
    for (let [key, value] of Object.entries(replacePairs)) {
        string = string.replace(new RegExp(key, 'g'), value);
    }
    return string;
}
