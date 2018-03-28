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
    OnDeserialized,
} from "ta-json";

import { OPDSContributor } from "./opds2-contributor";

@JsonObject()
export class OPDSMetadata {

    @JsonProperty("author")
    @JsonElementType(OPDSContributor)
    public Author!: OPDSContributor[];

    @JsonProperty("@type")
    public RDFType!: string;

    @JsonProperty("title")
    public Title!: string;

    @JsonProperty("numberOfItems")
    public NumberOfItems!: number;

    @JsonProperty("itemsPerPage")
    public ItemsPerPage!: number;

    @JsonProperty("currentPage")
    public CurrentPage!: number;

    @JsonProperty("modified")
    public Modified!: Date;

    @OnDeserialized()
    // tslint:disable-next-line:no-unused-variable
    // @ts-ignore: TS6133 (is declared but its value is never read.)
    private _OnDeserialized() {
        if (!this.Title) {
            console.log("OPDSMetadata.Title is not set!");
        }
    }
}
