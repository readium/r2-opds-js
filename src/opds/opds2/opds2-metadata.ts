// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { Metadata } from "@r2-shared-js/models/metadata";
// https://github.com/edcarroll/ta-json
import {
    JsonElementType,
    JsonObject,
    JsonProperty,
} from "ta-json-x";

import { OPDSContributor } from "./opds2-contributor";

@JsonObject()
export class OPDSMetadata extends Metadata {

    @JsonProperty("author")
    @JsonElementType(OPDSContributor)
    public Author!: OPDSContributor[];

    @JsonProperty("numberOfItems")
    public NumberOfItems!: number;

    @JsonProperty("itemsPerPage")
    public ItemsPerPage!: number;

    @JsonProperty("currentPage")
    public CurrentPage!: number;
}
