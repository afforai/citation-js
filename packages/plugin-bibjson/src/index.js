/**
 * ## Formats
 *
 * ### BibJSON
 *
 * This plugin adds input support for the [BibJSON format](http://okfnlabs.org/bibjson/), with three variants:
 *
 *   * collections, where the records are extracted and parsed
 *   * records, which are parsed
 *   * records of the [quickscrape](https://github.com/ContentMine/quickscrape) variant, which are parsed
 *
 * @module module:@afforai/citation-js-plugin-bibjson
 */

import * as json from './json.js'
import { plugins } from '@afforai/citation-js-core'

const scraperLinks = ['fulltext_html', 'fulltext_xml', 'fulltext_pdf']
const authorNameFields = ['name', 'lastname', 'lastName', 'firstname', 'firstName']

/**
 * @constant {module:@afforai/citation-js-core.plugins~pluginRef} ref
 * @memberof module:@afforai/citation-js-plugin-bibjson
 * @default '@bibjson'
 */
const ref = '@bibjson'

/**
 * @access protected
 * @namespace parsers
 * @memberof module:@afforai/citation-js-plugin-bibjson
 */
const parsers = {
  /**
   * @access protected
   * @namespace json
   * @memberof module:@afforai/citation-js-plugin-bibjson.parsers
   */
  json
}

/**
 * @namespace formats
 * @type Object<module:@afforai/citation-js-core.plugins.input~format,module:@afforai/citation-js-core.plugins.input~parsers>
 * @memberof module:@afforai/citation-js-plugin-bibjson
 */
const formats = {
  /**
   * Object with quickscrape-style BibJSON.
   *
   * @type module:@afforai/citation-js-core.plugins.input~parsers
   * @memberof module:@afforai/citation-js-plugin-bibjson.formats
   * @property {module:@afforai/citation-js-core.plugins.input~dataParser} parse
   * @property {module:@afforai/citation-js-core.plugins.input~typeParser} parseType
   */
  '@bibjson/quickscrape+record+object': {
    parse: json.quickscrapeRecord,
    parseType: {
      propertyConstraint: {
        props: 'link',
        value (links) {
          return scraperLinks.some(link => links.find(({ type }) => type === link))
        }
      },
      extends: '@bibjson/record+object'
    }
  },
  /**
   * Object with BibJSON.
   *
   * @type module:@afforai/citation-js-core.plugins.input~parsers
   * @memberof module:@afforai/citation-js-plugin-bibjson.formats
   * @property {module:@afforai/citation-js-core.plugins.input~dataParser} parse
   * @property {module:@afforai/citation-js-core.plugins.input~typeParser} parseType
   */
  '@bibjson/record+object': {
    parse: json.record,
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: [{
        props: 'title'
      }, {
        props: ['author', 'editor'],
        match: 'some',
        value (authors) {
          return Array.isArray(authors) && authors[0] && authorNameFields.some(field => field in authors[0])
        }
      }]
    }
  },
  /**
   * Array of {@link module:@afforai/citation-js-plugin-bibjson.formats."@bibjson/record+object"|BibJSON objects}.
   *
   * @type module:@afforai/citation-js-core.plugins.input~parsers
   * @memberof module:@afforai/citation-js-plugin-bibjson.formats
   * @property {module:@afforai/citation-js-core.plugins.input~dataParser} parse
   * @property {module:@afforai/citation-js-core.plugins.input~typeParser} parseType
   */
  '@bibjson/collection+object': {
    parse (collection) {
      return collection.records
    },
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: [{
        props: 'metadata',
        value (metadata) { return 'collection' in metadata }
      }, {
        props: 'records',
        value (records) { return Array.isArray(records) }
      }]
    }
  }
}

plugins.add(ref, {
  input: formats
})

export { ref, parsers, formats }
