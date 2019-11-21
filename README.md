# NodeJS / TypeScript Readium-2 "opds" components

NodeJS implementation (written in TypeScript) of OPDS functionality for the Readium2 architecture ( https://github.com/readium/architecture/ ).

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](/LICENSE)

## Build status

[![NPM](https://img.shields.io/npm/v/r2-opds-js.svg)](https://www.npmjs.com/package/r2-opds-js) [![David](https://david-dm.org/readium/r2-opds-js/status.svg)](https://david-dm.org/readium/r2-opds-js)

[Changelog](/CHANGELOG.md)

## Prerequisites

1) https://nodejs.org NodeJS >= 8, NPM >= 5 (check with command line `node --version` and `npm --version`)
2) OPTIONAL: https://yarnpkg.com Yarn >= 1.0 (check with command line `yarn --version`)

## GitHub repository

https://github.com/readium/r2-opds-js

There is no [github.io](https://readium.github.io/r2-opds-js) site for this project (no [gh-pages](https://github.com/readium/r2-opds-js/tree/gh-pages) branch).

## NPM package

https://www.npmjs.com/package/r2-opds-js

Command line install:

`npm install r2-opds-js`
OR
`yarn add r2-opds-js`

...or manually add in your `package.json`:
```json
  "dependencies": {
    "r2-opds-js": "latest"
  }
```

The JavaScript code distributed in the NPM package is usable as-is (no transpilation required), as it is automatically-generated from the TypeScript source.

Several ECMAScript flavours are provided out-of-the-box: ES5, ES6-2015, ES7-2016, ES8-2017:

https://unpkg.com/r2-opds-js/dist/

(alternatively, GitHub mirror with semantic-versioning release tags: https://github.com/edrlab/r2-opds-js-dist/tree/develop/dist/ )

The JavaScript code is not bundled, and it uses `require()` statement for imports (NodeJS style).

More information about NodeJS compatibility:

http://node.green

Note that web-browser Javascript is currently not supported (only NodeJS runtimes).

The type definitions (aka "typings") are included as `*.d.ts` files in `./node_modules/r2-opds-js/dist/**`, so this package can be used directly in a TypeScript project.

## Dependencies

https://david-dm.org/readium/r2-opds-js

A [package-lock.json](https://github.com/readium/r2-opds-js/blob/develop/package-lock.json) is provided (modern NPM replacement for `npm-shrinkwrap.json`).

A [yarn.lock](https://github.com/readium/r2-opds-js/blob/develop/yarn.lock) file is currently *not* provided at the root of the source tree.

## Continuous Integration

TODO (unit tests?)
https://travis-ci.org/readium/r2-opds-js

Badge: `[![Travis](https://travis-ci.org/readium/r2-opds-js.svg?branch=develop)](https://travis-ci.org/readium/r2-opds-js)`

## Version(s), Git revision(s)

NPM package (latest published):

https://unpkg.com/r2-opds-js/dist/gitrev.json

Alternatively, GitHub mirror with semantic-versioning release tags:

https://raw.githack.com/edrlab/r2-opds-js-dist/develop/dist/gitrev.json

## Developer quick start

Command line steps (NPM, but similar with YARN):

1) `cd r2-opds-js`
2) `git status` (please ensure there are no local changes, especially in `package-lock.json` and the dependency versions in `package.json`)
3) `rm -rf node_modules` (to start from a clean slate)
4) `npm install`, or alternatively `npm ci` (both commands initialize the `node_modules` tree of package dependencies, based on the strict `package-lock.json` definition)
5) `npm run build:all` (invoke the main build script: clean, lint, compile)
6) `ls dist` (that's the build output which gets published as NPM package)

## Documentation

### (de)serialization / (un)marshalling of JSON and XML

Due to the "factory" registration pattern in the TA-JSON library dependency (and its corresponding XML fork/adaptation),
the functions `initGlobalConverters_GENERIC()` and `initGlobalConverters_OPDS()` must be called before invoking the actual OPDS1/2 parsers.

https://github.com/readium/r2-opds-js/blob/develop/src/opds/init-globals.ts

```typescript
// npm install r2-opds-js
// "@opds" is a dist path alias, for example EcmaScript6/ES2015 'node_modules/r2-opds-js/dist/es6-es2015/src/opds/'
import { initGlobalConverters_GENERIC, initGlobalConverters_OPDS } from "@opds/init-globals";

initGlobalConverters_GENERIC();
initGlobalConverters_OPDS();
```

### OPDS 1

The XML (Atom) markup of an OPDS1 "feed" (or "entry") can be loaded/parsed into an in-memory data model.

https://github.com/readium/r2-opds-js/tree/develop/src/opds/opds1

```typescript
// npm install xmldom
import * as xmldom from "xmldom";

// npm install r2-utils-js
// "@utils" is a dist path alias, for example EcmaScript6/ES2015 'node_modules/r2-utils-js/dist/es6-es2015/src/_utils/'
import { XML } from "@utils/xml-js-mapper";

// npm install r2-opds-js
// "@opds" is a dist path alias, for example EcmaScript6/ES2015 'node_modules/r2-opds-js/dist/es6-es2015/src/opds/'
import { OPDS } from "@opds/opds1/opds";
import { Entry } from "@opds/opds1/opds-entry";

const xmlDom = new xmldom.DOMParser().parseFromString(xmlStr);
if (!xmlDom || !xmlDom.documentElement) {
    return;
}
const isEntry = xmlDom.documentElement.localName === "entry";
if (isEntry) {
    let opds1Entry = XML.deserialize<Entry>(xmlDom, Entry);
    // ...
} else {
    let opds1Feed = XML.deserialize<OPDS>(xmlDom, OPDS);
    // ...
}
```

### OPDS 2

The JSON serialization of an OPDS2 "feed" (or "publication") can be loaded/parsed into an in-memory data model.

https://github.com/readium/r2-opds-js/tree/develop/src/opds/opds2

```typescript
import { TaJsonDeserialize, TaJsonSerialize } from "@r2-lcp-js/serializable";

// npm install r2-opds-js
// "@opds" is a dist path alias, for example EcmaScript6/ES2015 'node_modules/r2-opds-js/dist/es6-es2015/src/opds/'
import { OPDSFeed } from "@opds/opds2/opds2";
import { OPDSPublication } from "@opds/opds2/opds2-publication";

// feed
var opds2Feed: OPDSFeed;
const opds2Feed_JSON = TaJsonSerialize(opds2Feed);
// ...and the reverse:
opds2Feed = TaJsonDeserialize<OPDSFeed>(opds2Feed_JSON, OPDSFeed);

// publication
var opds2Publication: OPDSPublication;
const opds2Publication_JSON = TaJsonSerialize(opds2Publication);
// ...and the reverse:
opds2Publication = TaJsonDeserialize<OPDSPublication>(opds2Publication_JSON, OPDSPublication);
```

### OPDS 1 - OPDS 2 Converter

An OPDS1 "feed" (or "entry") can be converted into an OPDS2 representation.

https://github.com/readium/r2-opds-js/blob/develop/src/opds/converter.ts

```typescript
// npm install xmldom
import * as xmldom from "xmldom";

// npm install r2-utils-js
// "@utils" is a dist path alias, for example EcmaScript6/ES2015 'node_modules/r2-utils-js/dist/es6-es2015/src/_utils/'
import { XML } from "@utils/xml-js-mapper";

// npm install r2-opds-js
// "@opds" is a dist path alias, for example EcmaScript6/ES2015 'node_modules/r2-opds-js/dist/es6-es2015/src/opds/'
import { OPDS } from "@opds/opds1/opds";
import { Entry } from "@opds/opds1/opds-entry";
import { OPDSFeed } from "@opds/opds2/opds2";
import { OPDSPublication } from "@opds/opds2/opds2-publication";
import { convertOpds1ToOpds2, convertOpds1ToOpds2_EntryToPublication } from "@opds/converter";

const xmlDom = new xmldom.DOMParser().parseFromString(xmlStr);
if (!xmlDom || !xmlDom.documentElement) {
    return;
}
const isEntry = xmlDom.documentElement.localName === "entry";
if (isEntry) {
    let opds1Entry = XML.deserialize<Entry>(xmlDom, Entry);

    let opds2Publication: OPDSPublication = convertOpds1ToOpds2_EntryToPublication(opds1Entry);
    // ...
} else {
    let opds1Feed = XML.deserialize<OPDS>(xmlDom, OPDS);

    var opds2Feed: OPDSFeed = convertOpds1ToOpds2(opds1Feed);
    // ...
}
```
