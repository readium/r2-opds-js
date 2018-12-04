# r2-opds-js

`npm install r2-opds-js`

For example, EcmaScript6 / ES2015 dist:

`node_modules/r2-opds-js/dist/es6-es2015/src/opds/`  
(see: https://unpkg.com/r2-opds-js/dist/es6-es2015/src/opds/ )  
(alternatively: https://github.com/edrlab/r2-opds-js-dist/tree/develop/dist/es6-es2015/src/opds )

...mirrors the original TypeScript codebase:  
https://github.com/readium/r2-opds-js/tree/develop/src/opds/

## (de)serialization / (un)marshalling of JSON and XML

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

## OPDS 1

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

## OPDS 2

The JSON serialization of an OPDS2 "feed" (or "publication") can be loaded/parsed into an in-memory data model.

https://github.com/readium/r2-opds-js/tree/develop/src/opds/opds2

```typescript
// npm install ta-json-x
import { JSON as TAJSON } from "ta-json-x";

// npm install r2-opds-js
// "@opds" is a dist path alias, for example EcmaScript6/ES2015 'node_modules/r2-opds-js/dist/es6-es2015/src/opds/'
import { OPDSFeed } from "@opds/opds2/opds2";
import { OPDSPublication } from "@opds/opds2/opds2-publication";

// feed
var opds2Feed: OPDSFeed;
const opds2Feed_JSON = TAJSON.serialize(opds2Feed);
// ...and the reverse:
opds2Feed = TAJSON.deserialize<OOPDSFeedPDS>(opds2Feed_JSON, OPDSFeed);


// publication
var opds2Publication: OPDSPublication;
const opds2Publication_JSON = TAJSON.serialize(opds2Publication);
// ...and the reverse:
opds2Publication = TAJSON.deserialize<OPDSPublication>(opds2Publication_JSON, OPDSPublication);
```

## OPDS 1 - OPDS 2 Converter

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
