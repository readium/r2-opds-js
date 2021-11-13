import test from "ava";

import { JsonArray, JsonMap, TaJsonDeserialize, TaJsonSerialize } from "@r2-lcp-js/serializable";

import { initGlobalConverters_GENERIC, initGlobalConverters_OPDS } from "../src/opds/init-globals";
import { OPDSFeed } from "../src/opds/opds2/opds2";
import { OPDSMetadata } from "../src/opds/opds2/opds2-metadata";
import { checkType_Array, checkType_Number, checkType_Object, checkType_String, inspect, logJSON } from "./helpers";

initGlobalConverters_OPDS();
initGlobalConverters_GENERIC();

// ==========================

const titleStr1 = "str1";
const titleStr2 = "str2";
const titleStr3 = "str3";
const n = 999;

// ==========================

test("JSON SERIALIZE: Metadata.AdditionalJSON", (t) => {
    const md = new OPDSMetadata();
    md.Title = titleStr1;
    md.NumberOfItems = n; // OPDSMetadata
    md.ItemsPerPage = n; // OPDSMetadata
    md.NumberOfPages = n; // regular Metadata (root class)
    md.AdditionalJSON = {
        title2: titleStr2,
        tizz: {
            sub1: true,
            sub2: null,
            sub3: {
                inner1: n,
                inner2: [titleStr3, 888, false],
            },
        },
    };
    const pub = new OPDSFeed();
    pub.Metadata = md;
    inspect(pub);

    const jsonPub = TaJsonSerialize(pub);
    logJSON(jsonPub);
    const json = jsonPub.metadata as JsonMap;

    checkType_Number(t, json.numberOfItems);
    t.is(json.numberOfItems, n);

    checkType_Number(t, json.itemsPerPage);
    t.is(json.itemsPerPage, n);

    checkType_Number(t, json.numberOfPages);
    t.is(json.numberOfPages, n);

    checkType_String(t, json.title);
    t.is(json.title, titleStr1);

    if (!json.tizz) {
        t.fail();
        return;
    }
    checkType_Object(t, json.tizz);

    t.is((json.tizz as JsonMap).sub1, true);

    if ((json.tizz as JsonMap).sub2 || (json.tizz as JsonMap).sub2 !== null) {
        t.fail();
        return;
    }

    if (!(json.tizz as JsonMap).sub3) {
        t.fail();
        return;
    }

    checkType_Number(t, ((json.tizz as JsonMap).sub3 as JsonMap).inner1);
    t.is(((json.tizz as JsonMap).sub3 as JsonMap).inner1, n);

    if (!((json.tizz as JsonMap).sub3 as JsonMap).inner2) {
        t.fail();
        return;
    }
    checkType_Array(t, ((json.tizz as JsonMap).sub3 as JsonMap).inner2);
    t.is((((json.tizz as JsonMap).sub3 as JsonMap).inner2 as JsonArray)[0], titleStr3);

    if (!((json.tizz as JsonMap).sub3 as JsonMap).inner1) {
        t.fail();
        return;
    }
});

test("JSON DESERIALIZE: Metadata.AdditionalJSON", (t) => {
    const json: JsonMap = {
        itemsPerPage: n,
        numberOfItems: n,
        numberOfPages: n,
        title: titleStr1,
        title2: titleStr2,
        tizz: {
            sub1: true,
            sub2: null,
            sub3: {
                inner1: 999,
                inner2: [titleStr3, 888, false],
            },
        },
    };
    const jsonPub: JsonMap = {
        metadata: json,
    };
    logJSON(jsonPub);

    const pub: OPDSFeed = TaJsonDeserialize<OPDSFeed>(jsonPub, OPDSFeed);
    const md = pub.Metadata;
    // const md: OPDSMetadata = TaJsonDeserialize<OPDSMetadata>(json, OPDSMetadata);
    inspect(md);

    checkType_Number(t, md.NumberOfItems); // OPDSMetadata
    t.is(md.NumberOfItems, n);

    checkType_Number(t, md.ItemsPerPage); // OPDSMetadata
    t.is(md.ItemsPerPage, n);

    checkType_Number(t, md.NumberOfPages); // regular Metadata (root class)
    t.is(md.NumberOfPages, n);

    checkType_String(t, md.Title);
    t.is(md.Title, titleStr1);

    if (!md.AdditionalJSON) {
        t.fail();
        return;
    }

    t.true(typeof md.AdditionalJSON.numberOfItems === "undefined");
    t.true(typeof md.AdditionalJSON.itemsPerPage === "undefined");
    t.true(typeof md.AdditionalJSON.numberOfPages === "undefined");

    checkType_String(t, md.AdditionalJSON.title2);
    t.is(md.AdditionalJSON.title2, titleStr2);

    if (!md.AdditionalJSON.tizz) {
        t.fail();
        return;
    }
    checkType_Object(t, md.AdditionalJSON.tizz);

    t.is((md.AdditionalJSON.tizz as JsonMap).sub1, true);

    if ((md.AdditionalJSON.tizz as JsonMap).sub2 || (md.AdditionalJSON.tizz as JsonMap).sub2 !== null) {
        t.fail();
        return;
    }

    if (!(md.AdditionalJSON.tizz as JsonMap).sub3) {
        t.fail();
        return;
    }

    checkType_Number(t, ((md.AdditionalJSON.tizz as JsonMap).sub3 as JsonMap).inner1);
    t.is(((md.AdditionalJSON.tizz as JsonMap).sub3 as JsonMap).inner1, n);

    if (!((md.AdditionalJSON.tizz as JsonMap).sub3 as JsonMap).inner2) {
        t.fail();
        return;
    }
    checkType_Array(t, ((md.AdditionalJSON.tizz as JsonMap).sub3 as JsonMap).inner2);
    t.is((((md.AdditionalJSON.tizz as JsonMap).sub3 as JsonMap).inner2 as JsonArray)[0], titleStr3);

    if (!((md.AdditionalJSON.tizz as JsonMap).sub3 as JsonMap).inner1) {
        t.fail();
        return;
    }
});
