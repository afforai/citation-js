/**
 * ## Formats
 *
 * For a list of supported formats, check out {@link module:@afforai/citation-js-plugin-doi.formats}.
 *
 * @module @afforai/citation-js-plugin-doi
 */

import { plugins } from '@afforai/citation-js-core'

import * as id from './id.js'
import * as api from './api.js'
import * as json from './json.js'
import * as type from './type.js'

/**
 * @constant {module:@afforai/citation-js-core.plugins~pluginRef} ref
 * @memberof module:@afforai/citation-js-plugin-doi
 * @default '@doi'
 */
const ref = '@doi'

/**
 * @access protected
 * @namespace parsers
 * @memberof module:@afforai/citation-js-plugin-doi
 */
const parsers = {
  /**
   * @access protected
   * @namespace id
   * @memberof module:@afforai/citation-js-plugin-doi.parsers
   */
  id,

  /**
   * @access protected
   * @namespace api
   * @memberof module:@afforai/citation-js-plugin-doi.parsers
   */
  api,

  /**
   * @access protected
   * @namespace json
   * @memberof module:@afforai/citation-js-plugin-doi.parsers
   */
  json,

  /**
   * @access protected
   * @namespace type
   * @memberof module:@afforai/citation-js-plugin-doi.parsers
   */
  type
}

/**
 * @namespace formats
 * @type Object<module:@afforai/citation-js-core.plugins.input~format,module:@afforai/citation-js-core.plugins.input~parsers>
 * @memberof module:@afforai/citation-js-plugin-doi
 */
const formats = {
  /**
   * DOI URL (dx.doi.org, doi.org).
   *
   * @type module:@afforai/citation-js-core.plugins.input~parsers
   * @memberof module:@afforai/citation-js-plugin-doi.formats
   * @property {module:@afforai/citation-js-core.plugins.input~dataParser} parse
   * @property {module:@afforai/citation-js-core.plugins.input~asyncDataParser} parseAsync
   * @property {module:@afforai/citation-js-core.plugins.input~typeParser} parseType
   */
  '@doi/api': {
    parse: api.parse,
    parseAsync: api.parseAsync,
    parseType: {
      dataType: 'String',
      predicate: /^\s*(https?:\/\/(?:dx\.)?doi\.org\/(10.\d{4,9}\/[-._;()/:A-Z0-9[\]<>]+))\s*$/i,
      extends: '@else/url'
    }
  },

  /**
   * DOI short URL (without scheme).
   *
   * @type module:@afforai/citation-js-core.plugins.input~parsers
   * @memberof module:@afforai/citation-js-plugin-doi.formats
   * @property {module:@afforai/citation-js-core.plugins.input~dataParser} parse
   * @property {module:@afforai/citation-js-core.plugins.input~asyncDataParser} parseAsync
   * @property {module:@afforai/citation-js-core.plugins.input~typeParser} parseType
   */
  '@doi/short-url': {
    parse: function (url) {
      return url.replace(/^(\s*)/, '$1https://')
    },
    parseType: {
      dataType: 'String',
      predicate: /^\s*((?:dx\.)?doi\.org\/(10.\d{4,9}\/[-._;()/:A-Z0-9[\]<>]+))\s*$/i
    }
  },

  /**
   * Actual DOI. Uses the pattern presented by [Crossef](https://www.crossref.org/blog/dois-and-matching-regular-expressions/).
   * Amended with "[]<>" for SICI-style DOIs.
   *
   * @type module:@afforai/citation-js-core.plugins.input~parsers
   * @memberof module:@afforai/citation-js-plugin-doi.formats
   * @property {module:@afforai/citation-js-core.plugins.input~dataParser} parse
   * @property {module:@afforai/citation-js-core.plugins.input~typeParser} parseType
   */
  '@doi/id': {
    parse: id.parse,
    parseType: {
      dataType: 'String',
      predicate: /^\s*(10.\d{4,9}\/[-._;()/:A-Z0-9[\]<>]+)\s*$/i
    }
  },

  /**
   * Whitespace-separated list of {@link module:@afforai/citation-js-plugin-doi.formats."@doi/id"|DOIs}.
   *
   * @type module:@afforai/citation-js-core.plugins.input~parsers
   * @memberof module:@afforai/citation-js-plugin-doi.formats
   * @property {module:@afforai/citation-js-core.plugins.input~dataParser} parse
   * @property {module:@afforai/citation-js-core.plugins.input~typeParser} parseType
   */
  '@doi/list+text': {
    parse: id.parse,
    parseType: {
      dataType: 'String',
      tokenList: /^10.\d{4,9}\/[-._;()/:A-Z0-9[\]<>]+$/i
    }
  },

  /**
   * Array of {@link module:@afforai/citation-js-plugin-doi.formats."@doi/id"|DOIs}.
   *
   * @type module:@afforai/citation-js-core.plugins.input~parsers
   * @memberof module:@afforai/citation-js-plugin-doi.formats
   * @property {module:@afforai/citation-js-core.plugins.input~dataParser} parse
   * @property {module:@afforai/citation-js-core.plugins.input~typeParser} parseType
   */
  '@doi/list+object': {
    parse: id.parse,
    parseType: {
      dataType: 'Array',
      elementConstraint: '@doi/id'
    }
  },

  /**
   * Entry type returned by DOI APIs such as Crossef. Might be incorrect, hence
   * the parser.
   *
   * @type module:@afforai/citation-js-core.plugins.input~parsers
   * @memberof module:@afforai/citation-js-plugin-doi.formats
   * @property {module:@afforai/citation-js-core.plugins.input~dataParser} parse
   */
  '@doi/type': {
    parse: type.parse
  }
}

plugins.add(ref, {
  input: formats
})

export { ref, parsers, formats }
