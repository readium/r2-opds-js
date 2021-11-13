import test from "ava";

import { JsonArray, TaJsonDeserialize, TaJsonSerialize } from "@r2-lcp-js/serializable";

import { initGlobalConverters_GENERIC, initGlobalConverters_OPDS } from "../src/opds/init-globals";
import { OPDSFeed } from "../src/opds/opds2/opds2";
import { checkType_Array, checkType_String, inspect, logJSON } from "./helpers";

initGlobalConverters_OPDS();
initGlobalConverters_GENERIC();

// ==========================

const contextStr1 = "http://context1";
const contextStr2 = "http://context2";

// ==========================

test("JSON SERIALIZE: OPDSFeed.Context => string[]", (t) => {
    const feed = new OPDSFeed();
    feed.Context = [];
    feed.Context.push(contextStr1);
    feed.Context.push(contextStr2);
    inspect(feed);

    const json = TaJsonSerialize(feed);
    logJSON(json);

    checkType_Array(t, json["@context"]);
    const ctx = json["@context"] as JsonArray;
    t.is(ctx.length, 2);

    checkType_String(t, ctx[0]);
    t.is(ctx[0], contextStr1);

    checkType_String(t, ctx[1]);
    t.is(ctx[1], contextStr2);
});

// see IPropertyConverter.collapseArrayWithSingleItem()
//
// test("JSON SERIALIZE: OPDSFeed.Context => string[1] NO collapse-array", (t) => {

//     const feed = new OPDSFeed();
//     feed.Context = [contextStr1];
//     inspect(feed);

//     const json = TaJsonSerialize(feed);
//     // // (normalizes single-item array to the item value itself)
//     // traverseJsonObjects(json,
//     //     (obj, parent, keyInParent) => {
//     //         if (parent && obj instanceof Array && obj.length === 1) {
//     //             parent[keyInParent] = obj[0];
//     //         }
//     //     });
//     logJSON(json);

//     checkType_Array(t, json["@context"]);
//     t.is(json["@context"].length, 1);
//     checkType_String(t, json["@context"][0]);
//     t.is(json["@context"][0], contextStr1);
// });

test("JSON SERIALIZE: OPDSFeed.Context => string[1] collapse-array", (t) => {
    const feed = new OPDSFeed();
    feed.Context = [contextStr1];
    inspect(feed);

    const json = TaJsonSerialize(feed);
    // // (normalizes single-item array to the item value itself)
    // traverseJsonObjects(json,
    //     (obj, parent, keyInParent) => {
    //         if (parent && obj instanceof Array && obj.length === 1) {
    //             parent[keyInParent] = obj[0];
    //         }
    //     });
    logJSON(json);

    checkType_String(t, json["@context"]);
    t.is(json["@context"], contextStr1);
});

test("JSON DESERIALIZE: OPDSFeed.Context => string[]", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json["@context"] = [contextStr1, contextStr2];
    logJSON(json);

    const feed: OPDSFeed = TaJsonDeserialize<OPDSFeed>(json, OPDSFeed);
    inspect(feed);

    checkType_Array(t, feed.Context);
    t.is(feed.Context.length, 2);

    checkType_String(t, feed.Context[0]);
    t.is(feed.Context[0], contextStr1);

    checkType_String(t, feed.Context[1]);
    t.is(feed.Context[1], contextStr2);
});

test("JSON DESERIALIZE: OPDSFeed.Context => string[1]", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json["@context"] = [contextStr1];
    logJSON(json);

    const feed: OPDSFeed = TaJsonDeserialize<OPDSFeed>(json, OPDSFeed);
    inspect(feed);

    checkType_Array(t, feed.Context);
    t.is(feed.Context.length, 1);

    checkType_String(t, feed.Context[0]);
    t.is(feed.Context[0], contextStr1);
});

test("JSON DESERIALIZE: OPDSFeed.Context => string", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json["@context"] = contextStr1;
    logJSON(json);

    const feed: OPDSFeed = TaJsonDeserialize<OPDSFeed>(json, OPDSFeed);
    inspect(feed);

    checkType_Array(t, feed.Context);
    t.is(feed.Context.length, 1);

    checkType_String(t, feed.Context[0]);
    t.is(feed.Context[0], contextStr1);
});
