// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

// https://github.com/edcarroll/ta-json
import {
    JsonObject,
    JsonProperty,
    OnDeserialized,
} from "ta-json-x";

@JsonObject()
export class OPDSPrice {

    @JsonProperty("currency")
    public Currency!: string;

    @JsonProperty("value")
    public Value!: number;

    @OnDeserialized()
    // tslint:disable-next-line:no-unused-variable
    // @ts-ignore: TS6133 (is declared but its value is never read.)
    private _OnDeserialized() {
        if (!this.Currency) {
            console.log("OPDSPrice.Currency is not set!");
        }
        if (!this.Value) {
            console.log("OPDSPrice.Value is not set!");
        }
    }
}
