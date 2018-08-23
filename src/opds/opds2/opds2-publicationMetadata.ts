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
} from "ta-json";

import { OPDSContributor } from "./opds2-contributor";

@JsonObject()
export class OPDSPublicationMetadata extends Metadata {

    @JsonProperty("author")
    @JsonElementType(OPDSContributor)
    public Author!: OPDSContributor[];

    @JsonProperty("translator")
    @JsonElementType(OPDSContributor)
    public Translator!: OPDSContributor[];

    @JsonProperty("editor")
    @JsonElementType(OPDSContributor)
    public Editor!: OPDSContributor[];

    @JsonProperty("artist")
    @JsonElementType(OPDSContributor)
    public Artist!: OPDSContributor[];

    @JsonProperty("illustrator")
    @JsonElementType(OPDSContributor)
    public Illustrator!: OPDSContributor[];

    @JsonProperty("letterer")
    @JsonElementType(OPDSContributor)
    public Letterer!: OPDSContributor[];

    @JsonProperty("penciler")
    @JsonElementType(OPDSContributor)
    public Penciler!: OPDSContributor[];

    @JsonProperty("colorist")
    @JsonElementType(OPDSContributor)
    public Colorist!: OPDSContributor[];

    @JsonProperty("inker")
    @JsonElementType(OPDSContributor)
    public Inker!: OPDSContributor[];

    @JsonProperty("narrator")
    @JsonElementType(OPDSContributor)
    public Narrator!: OPDSContributor[];

    @JsonProperty("contributor")
    @JsonElementType(OPDSContributor)
    public OPDSContributor!: OPDSContributor[];

    @JsonProperty("publisher")
    @JsonElementType(OPDSContributor)
    public Publisher!: OPDSContributor[];

    @JsonProperty("imprint")
    @JsonElementType(OPDSContributor)
    public Imprint!: OPDSContributor[];
}
