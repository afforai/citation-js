# @afforai/citation-js-plugin-doi
Plugin for DOI input for Citation.js.

[![NPM version](https://img.shields.io/npm/v/@afforai/citation-js-plugin-doi.svg)](https://npmjs.org/package/@afforai/citation-js-plugin-doi)
[![NPM total downloads](https://img.shields.io/npm/dt/@afforai/citation-js-plugin-doi.svg)](https://npmcharts.com/compare/@citation-js%2Fplugin-doi?minimal=true)
![License](https://img.shields.io/npm/l/@afforai/citation-js-plugin-doi.svg)
![Dependency status](https://img.shields.io/librariesio/release/npm/@afforai/citation-js-plugin-doi)
---

## Install

    npm install @afforai/citation-js-plugin-doi

## Usage

Register by importing the package:

```js
require('@afforai/citation-js-plugin-doi')
```

## Formats

Formats and other features added by this plugin.

### Input

Supports DOIs inputted in the following ways:

  * `@doi/api`: a `doi.org` URL
  * `@doi/id`: a single DOI
  * `@doi/list+text`: whitespace-separated list of DOIs
  * `@doi/list+object`: array of DOIs

Additionally, the following internal type is exposed:

  * `@doi/type`: fix the `type` value in certain API responses
