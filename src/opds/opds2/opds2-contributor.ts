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

import { OPDSLink } from "./opds2-link";
import { IStringMap } from "./opds2-multilang";

@JsonObject()
export class OPDSContributor {

    @JsonProperty("name")
    public Name!: string | IStringMap;

    @JsonProperty("sort_as")
    public SortAs!: string;

    @JsonProperty("identifier")
    public Identifier!: string;

    @JsonProperty("role")
    public Role!: string;

    @JsonProperty("links")
    @JsonElementType(OPDSLink)
    public Links!: OPDSLink[];
}
