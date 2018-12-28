// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

// https://github.com/edcarroll/ta-json
import {
    JsonElementType,
    JsonObject,
    JsonProperty,
    // OnDeserialized,
} from "ta-json-x";

import { OPDSLink } from "./opds2-link";
import { OPDSMetadata } from "./opds2-metadata";

// tslint:disable-next-line:max-line-length
// https://github.com/opds-community/drafts/blob/2d027051a725ae62defdc7829b597564e5b8e9e5/schema/feed.schema.json#L70
@JsonObject()
export class OPDSFacet {

    // tslint:disable-next-line:max-line-length
    // https://github.com/opds-community/drafts/blob/2d027051a725ae62defdc7829b597564e5b8e9e5/schema/feed.schema.json#L72
    @JsonProperty("metadata")
    public Metadata!: OPDSMetadata;

    // tslint:disable-next-line:max-line-length
    // https://github.com/opds-community/drafts/blob/2d027051a725ae62defdc7829b597564e5b8e9e5/schema/feed.schema.json#L75
    @JsonProperty("links")
    @JsonElementType(OPDSLink)
    public Links!: OPDSLink[];

    // @OnDeserialized()
    // // tslint:disable-next-line:no-unused-variable
    // // @ts-ignore: TS6133 (is declared but its value is never read.)
    // protected _OnDeserialized() {
    //     if (!this.Metadata) {
    //         console.log("OPDSFacet.Metadata is not set!");
    //     }
    //     if (!this.Links) {
    //         console.log("OPDSFacet.Links is not set!");
    //     }
    // }
}
