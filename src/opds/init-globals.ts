// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { JsonDateConverter } from "@utils/ta-json-date-converter";
import { JsonNumberConverter } from "@utils/ta-json-number-converter";
import {
    BufferConverter as XmlBufferConverter,
    DateConverter as XmlDateConverter,
    propertyConverters as xmlConverters,
} from "@utils/xml-js-mapper";
import {
    BufferConverter as JsonBufferConverter,
    propertyConverters as jsonConverters,
} from "ta-json";

import { OPDSCollection } from "./opds2/opds2-collection";
import { JsonOPDSCollectionConverter } from "./opds2/opds2-collection-json-converter";

export function initGlobalConverters_OPDS() {
    jsonConverters.set(OPDSCollection, new JsonOPDSCollectionConverter());
}

export function initGlobalConverters_GENERIC() {
    jsonConverters.set(Buffer, new JsonBufferConverter());
    jsonConverters.set(Date, new JsonDateConverter());
    jsonConverters.set(Number, new JsonNumberConverter());

    xmlConverters.set(Buffer, new XmlBufferConverter());
    xmlConverters.set(Date, new XmlDateConverter());
}
