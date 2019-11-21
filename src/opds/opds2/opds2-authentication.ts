// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

// https://github.com/edcarroll/ta-json
import { JsonElementType, JsonObject, JsonProperty, OnDeserialized } from "ta-json-x";

import { OPDSAuthenticationLabels } from "./opds2-authentication-labels";
import { OPDSLink } from "./opds2-link";

// tslint:disable-next-line:max-line-length
// https://github.com/opds-community/drafts/blob/abc6cd444e5e727b127317ecf1f0b9071ecd4272/schema/authentication.schema.json#L27
@JsonObject()
export class OPDSAuthentication {

    // tslint:disable-next-line:max-line-length
    // https://github.com/opds-community/drafts/blob/abc6cd444e5e727b127317ecf1f0b9071ecd4272/schema/authentication.schema.json#L32
    @JsonProperty("type")
    public Type!: string;

    // tslint:disable-next-line:max-line-length
    // https://github.com/opds-community/drafts/blob/abc6cd444e5e727b127317ecf1f0b9071ecd4272/schema/authentication.schema.json#L36
    @JsonProperty("links")
    @JsonElementType(OPDSLink)
    public Links!: OPDSLink[];

    // tslint:disable-next-line:max-line-length
    // https://github.com/opds-community/drafts/blob/abc6cd444e5e727b127317ecf1f0b9071ecd4272/schema/authentication.schema.json#L43
    @JsonProperty("labels")
    public Labels!: OPDSAuthenticationLabels;

    @OnDeserialized()
    // tslint:disable-next-line:no-unused-variable
    // @ts-ignore: TS6133 (is declared but its value is never read.)
    protected _OnDeserialized() {
        // tslint:disable-next-line:max-line-length
        // https://github.com/opds-community/drafts/blob/abc6cd444e5e727b127317ecf1f0b9071ecd4272/schema/authentication.schema.json#L55
        if (!this.Type) {
            console.log("OPDSAuthentication.Type is not set!");
        }
    }
}
