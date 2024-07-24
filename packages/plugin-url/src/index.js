import { plugins, util } from '@afforai/citation-js-core'

plugins.add('@url', {
  input: {
    '@else/url': {
      parse: util.fetchFile,
      parseAsync: util.fetchFileAsync
    }
  }
})
