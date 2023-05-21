/**
 * Find localized string.
 *
 * @param key
 * @param replace
 * @param locale
 * @returns {null|*}
 * @private
 */
export function __ (key = null, replace = null, locale = null) {

  /**
   * Generate all possible variable replacements,
   * then replace if found.
   *
   * @param line
   * @param replace
   * @returns {*}
   */
  let makeReplacements = function (line, replace) {
    if (replace.length === 0) {
      return line;
    }

    let shouldReplace = {};

    for (let [key, value] of Object.entries(replace)) {
      shouldReplace[ ':' + upperCaseFirst(key ?? '') ] = upperCaseFirst(
        value ?? '');
      shouldReplace[ ':' + upperCaseAll(key ?? '') ] = upperCaseAll(
        value ?? '');
      shouldReplace[ ':' + key ] = value;
    }

    return replacePairs(line, shouldReplace);
  };

  /**
   * Convert string to all uppercase.
   *
   * @param string
   * @returns {string}
   */
  let upperCaseAll = function (string) {
    return typeof string === 'string'
      ? string.toUpperCase()
      : string;
  };

  /**
   * Convert first letter of string to uppercase.
   *
   * @param string
   * @returns {string}
   */
  let upperCaseFirst = function (string) {
    return typeof string === 'string'
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : string;
  };

  /**
   * Translate certain characters based on pairs.
   *
   * @param string
   * @param replacePairs
   * @returns {*}
   */
  let replacePairs = function (string, replacePairs) {
    for (let [key, value] of Object.entries(replacePairs)) {
      string = string.replace(new RegExp(key, 'g'), value);
    }
    return string;
  };

  if (key === null || typeof Localization === 'undefined') {
    return replace !== null ? makeReplacements(key, replace) : key;
  }

  const currentLocale = locale || Localization.locale;
  const fallbackLocale = Localization.fallback_locale;
  const messages = Localization.messages[ currentLocale ];
  const fallbackMessages = Localization.messages[ fallbackLocale ];
  const targetMessages = messages.hasOwnProperty(key)
    ? messages
    : fallbackMessages;

  return replace !== null && targetMessages[ key ]
    ? makeReplacements(targetMessages[ key ], replace)
    : replace !== null
      ? makeReplacements(key, replace)
      : key;
}
