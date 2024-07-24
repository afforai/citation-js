# @afforai/citation-js-plugin-bibjson
Plugin for BibJSON formats for Citation.js.

[![NPM version](https://img.shields.io/npm/v/@afforai/citation-js-plugin-bibjson.svg)](https://npmjs.org/package/@afforai/citation-js-plugin-bibjson)
[![NPM total downloads](https://img.shields.io/npm/dt/@afforai/citation-js-plugin-bibjson.svg)](https://npmcharts.com/compare/@citation-js%2Fplugin-bibjson?minimal=true)
![License](https://img.shields.io/npm/l/@afforai/citation-js-plugin-bibjson.svg)
![Dependency status](https://img.shields.io/librariesio/release/npm/@afforai/citation-js-plugin-bibjson)
---

## Install

    npm install @afforai/citation-js-plugin-bibjson

## Usage

Register by importing the package:

```js
require('@afforai/citation-js-plugin-bibjson')
```

## Formats

Formats and other features added by this plugin.

### Input

#### BibJSON

This plugin adds input support for the [BibJSON format](http://okfnlabs.org/bibjson/), with three variants:

  * collections, where the records are extracted and parsed
  * records, which are parsed
  * records of the [quickscrape](https://github.com/ContentMine/quickscrape) variant, which are parsed
