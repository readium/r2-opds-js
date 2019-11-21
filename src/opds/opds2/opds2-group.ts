// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

// https://github.com/edcarroll/ta-json
import { JsonElementType, JsonObject, JsonProperty } from "ta-json-x";

import { JsonArray, JsonMap } from "@r2-shared-js/json";
import { IWithAdditionalJSON } from "@r2-shared-js/models/serializable";

import { OPDSLink } from "./opds2-link";
import { OPDSMetadata } from "./opds2-metadata";
import { OPDSPublication } from "./opds2-publication";

const METADATA_JSON_PROP = "metadata";
const PUBLICATIONS_JSON_PROP = "publications";
const LINKS_JSON_PROP = "links";
const NAVIGATION_JSON_PROP = "navigation";

// tslint:disable-next-line:max-line-length
// https://github.com/opds-community/drafts/blob/2d027051a725ae62defdc7829b597564e5b8e9e5/schema/feed.schema.json#L90
@JsonObject()
export class OPDSGroup implements IWithAdditionalJSON {

    // tslint:disable-next-line:max-line-length
    // https://github.com/opds-community/drafts/blob/2d027051a725ae62defdc7829b597564e5b8e9e5/schema/feed.schema.json#L92
    @JsonProperty(METADATA_JSON_PROP)
    public Metadata!: OPDSMetadata;

    // tslint:disable-next-line:max-line-length
    // https://github.com/opds-community/drafts/blob/2d027051a725ae62defdc7829b597564e5b8e9e5/schema/feed.schema.json#L102
    @JsonProperty(PUBLICATIONS_JSON_PROP)
    @JsonElementType(OPDSPublication)
    public Publications!: OPDSPublication[];

    // tslint:disable-next-line:max-line-length
    // https://github.com/opds-community/drafts/blob/2d027051a725ae62defdc7829b597564e5b8e9e5/schema/feed.schema.json#L95
    @JsonProperty(LINKS_JSON_PROP)
    @JsonElementType(OPDSLink)
    public Links!: OPDSLink[];

    // tslint:disable-next-line:max-line-length
    // https://github.com/opds-community/drafts/blob/2d027051a725ae62defdc7829b597564e5b8e9e5/schema/feed.schema.json#L109
    @JsonProperty(NAVIGATION_JSON_PROP)
    @JsonElementType(OPDSLink)
    public Navigation!: OPDSLink[];

    // BEGIN IWithAdditionalJSON
    public AdditionalJSON!: JsonMap; // unused
    public SupportedKeys!: string[]; // unused

    public parseAdditionalJSON(json: JsonMap) {
        // parseAdditionalJSON(this, json);

        if (this.Metadata) {
            this.Metadata.parseAdditionalJSON(json[METADATA_JSON_PROP] as JsonMap);
        }
        if (this.Publications) {
            this.Publications.forEach((pub, i) => {
                pub.parseAdditionalJSON((json[PUBLICATIONS_JSON_PROP] as JsonArray)[i] as JsonMap);
            });
        }
        if (this.Links) {
            this.Links.forEach((link, i) => {
                link.parseAdditionalJSON((json[LINKS_JSON_PROP] as JsonArray)[i] as JsonMap);
            });
        }
        if (this.Navigation) {
            this.Navigation.forEach((link, i) => {
                link.parseAdditionalJSON((json[NAVIGATION_JSON_PROP] as JsonArray)[i] as JsonMap);
            });
        }
    }
    public generateAdditionalJSON(json: JsonMap) {
        // generateAdditionalJSON(this, json);

        if (this.Metadata) {
            this.Metadata.generateAdditionalJSON(json[METADATA_JSON_PROP] as JsonMap);
        }
        if (this.Publications) {
            this.Publications.forEach((pub, i) => {
                pub.generateAdditionalJSON((json[PUBLICATIONS_JSON_PROP] as JsonArray)[i] as JsonMap);
            });
        }
        if (this.Links) {
            this.Links.forEach((link, i) => {
                link.generateAdditionalJSON((json[LINKS_JSON_PROP] as JsonArray)[i] as JsonMap);
            });
        }
        if (this.Navigation) {
            this.Navigation.forEach((link, i) => {
                link.generateAdditionalJSON((json[NAVIGATION_JSON_PROP] as JsonArray)[i] as JsonMap);
            });
        }
    }
    // END IWithAdditionalJSON

    // @OnDeserialized()
    // // tslint:disable-next-line:no-unused-variable
    // // @ts-ignore: TS6133 (is declared but its value is never read.)
    // protected _OnDeserialized() {
    //     if (!this.Metadata) {
    //         console.log("OPDSGroup.Metadata is not set!");
    //     }
    // }
}
