// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { BelongsTo } from "@r2-shared-js/models/metadata-belongsto";
import { Publication } from "@r2-shared-js/models/publication";
// https://github.com/edcarroll/ta-json
import {
    JsonElementType,
    JsonObject,
    JsonProperty,
} from "ta-json-x";

import { OPDSCollection } from "./opds2-collection";
import { OPDSContributor } from "./opds2-contributor";
import { OPDSLink } from "./opds2-link";
import { OPDSPublicationMetadata } from "./opds2-publicationMetadata";

@JsonObject()
export class OPDSPublication extends Publication {

    @JsonProperty("metadata")
    public Metadata!: OPDSPublicationMetadata;

    @JsonProperty("links")
    @JsonElementType(OPDSLink)
    public Links!: OPDSLink[];

    @JsonProperty("images")
    @JsonElementType(OPDSLink)
    public Images!: OPDSLink[];

    public findFirstLinkByRel(rel: string): OPDSLink | undefined {

        return this.Links ? this.Links.find((l) => {
            return l.HasRel(rel);
        }) : undefined;
    }

    public AddImage(href: string, typeImage: string, height: number, width: number) {
        const i = new OPDSLink();

        i.Href = href;
        i.TypeLink = typeImage;
        if (height) {
            i.Height = height;
        }
        if (width) {
            i.Width = width;
        }

        if (!this.Images) {
            this.Images = [];
        }
        this.Images.push(i);
    }

    public AddLink_(href: string, typeLink: string, rel: string, title: string) {
        const l = new OPDSLink();
        l.Href = href;
        l.TypeLink = typeLink;
        if (rel) {
            l.AddRel(rel);
        }
        if (title) {
            l.Title = title;
        }

        if (!this.Links) {
            this.Links = [];
        }
        this.Links.push(l);
    }

    public AddAuthor(name: string, identifier: string, sortAs: string, href: string, typeLink: string) {
        const c = new OPDSContributor();
        c.Name = name;
        if (identifier) {
            c.Identifier = identifier;
        }
        if (sortAs) {
            c.SortAs = sortAs;
        }

        const l = new OPDSLink();
        if (href) {
            l.Href = href;
        }
        if (typeLink) {
            l.TypeLink = typeLink;
        }

        if (href) {
            c.Links = [];
            c.Links.push(l);
        }

        if (!this.Metadata) {
            this.Metadata = new OPDSPublicationMetadata();
        }
        if (!this.Metadata.Author) {
            this.Metadata.Author = [];
        }
        this.Metadata.Author.push(c);
    }

    public AddSerie(name: string, position: number, href: string, typeLink: string) {

        const c = new OPDSCollection();
        c.Name = name;
        c.Position = position;

        const l = new OPDSLink();
        if (href) {
            l.Href = href;
        }
        if (typeLink) {
            l.TypeLink = typeLink;
        }

        if (href) {
            c.Links = [];
            c.Links.push(l);
        }

        if (!this.Metadata) {
            this.Metadata = new OPDSPublicationMetadata();
        }
        if (!this.Metadata.BelongsTo) {
            this.Metadata.BelongsTo = new BelongsTo();
        }
        if (!this.Metadata.BelongsTo.Series) {
            this.Metadata.BelongsTo.Series = [];
        }

        this.Metadata.BelongsTo.Series.push(c);
    }

    public AddPublisher(name: string, href: string, typeLink: string) {
        const c = new OPDSContributor();
        c.Name = name;

        const l = new OPDSLink();
        if (href) {
            l.Href = href;
        }
        if (typeLink) {
            l.TypeLink = typeLink;
        }

        if (href) {
            c.Links = [];
            c.Links.push(l);
        }

        if (!this.Metadata) {
            this.Metadata = new OPDSPublicationMetadata();
        }
        if (!this.Metadata.Publisher) {
            this.Metadata.Publisher = [];
        }
        this.Metadata.Publisher.push(c);
    }

    // @OnDeserialized()
    // // tslint:disable-next-line:no-unused-variable
    // // @ts-ignore: TS6133 (is declared but its value is never read.)
    // private _OnDeserialized() {
    //     if (!this.Metadata) {
    //         console.log("OPDSPublication.Metadata is not set!");
    //     }
    //     if (!this.Links) {
    //         console.log("OPDSPublication.Links is not set!");
    //     }
    //     if (!this.Images) {
    //         console.log("OPDSPublication.Images is not set!");
    //     }
    // }
}
