function formatEntry ({ type, label, properties }, dict) {
  const fields = Object.entries(properties).concat([['type', type]])
    .map(([field, value]) => dict.listItem.join(`${field}: ${value}`))

  return dict.entry.join(`[${label}]${dict.list.join(
    fields.join('')
  )}`)
}

/**
 * Get a Bib.TXT string from CSL
 *
 * @access private
 * @method format
 *
 * @param {Array<module:@afforai/citation-js-core~CSL>} src - Input CSL
 * @param {module:@afforai/citation-js-core.plugins.dict~dict} dict - Dictionary
 *
 * @return {String} Bib.TXT string
 */
export function format (src, dict) {
  const entries = src.map(entry => formatEntry(entry, dict)).join('\n')

  return dict.bibliographyContainer.join(entries)
}
