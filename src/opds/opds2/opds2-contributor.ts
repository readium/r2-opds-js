// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { Contributor } from "@r2-shared-js/models/metadata-contributor";
// https://github.com/edcarroll/ta-json
import {
    JsonElementType,
    JsonObject,
    JsonProperty,
} from "ta-json-x";

import { OPDSLink } from "./opds2-link";

@JsonObject()
export class OPDSContributor extends Contributor {

    @JsonProperty("links")
    @JsonElementType(OPDSLink)
    public Links!: OPDSLink[];
}
