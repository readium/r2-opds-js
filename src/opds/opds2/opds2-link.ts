// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { Link } from "@r2-shared-js/models/publication-link";
// https://github.com/edcarroll/ta-json
import {
    JsonObject,
    JsonProperty,
} from "ta-json-x";

import { OPDSProperties } from "./opds2-properties";

// tslint:disable-next-line:max-line-length
// https://github.com/readium/webpub-manifest/blob/917c83e798e3eda42b3e9d0dc92f0fef31b16211/schema/link.schema.json
@JsonObject()
export class OPDSLink extends Link {

    // tslint:disable-next-line:max-line-length
    // https://github.com/readium/webpub-manifest/blob/917c83e798e3eda42b3e9d0dc92f0fef31b16211/schema/link.schema.json#L33
    // tslint:disable-next-line:max-line-length
    // https://github.com/readium/webpub-manifest/blob/917c83e798e3eda42b3e9d0dc92f0fef31b16211/schema/properties.schema.json
    // tslint:disable-next-line:max-line-length
    // https://github.com/opds-community/drafts/blob/aa414dc7150588dbb422be2c643a7a74fec6e64d/schema/properties.schema.json
    @JsonProperty("properties")
    public Properties!: OPDSProperties;
}
