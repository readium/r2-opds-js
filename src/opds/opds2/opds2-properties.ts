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
} from "ta-json";

import { OPDSIndirectAcquisition } from "./opds2-indirectAcquisition";
import { OPDSPrice } from "./opds2-price";

@JsonObject()
export class OPDSProperties {

    @JsonProperty("numberOfItems")
    public NumberOfItems!: number;

    @JsonProperty("price")
    public Price!: OPDSPrice;

    @JsonProperty("indirectAcquisition")
    @JsonElementType(OPDSIndirectAcquisition)
    public IndirectAcquisitions!: OPDSIndirectAcquisition[];
}
