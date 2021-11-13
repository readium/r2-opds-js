import test from "ava";

import { JsonArray, JsonMap, TaJsonDeserialize, TaJsonSerialize } from "@r2-lcp-js/serializable";

import { initGlobalConverters_GENERIC, initGlobalConverters_OPDS } from "../src/opds/init-globals";
import { OPDSLink } from "../src/opds/opds2/opds2-link";
import { checkType_Array, checkType_String, inspect, logJSON } from "./helpers";

initGlobalConverters_OPDS();
initGlobalConverters_GENERIC();

// ==========================

const relStr1 = "rel1";
const relStr2 = "rel2";

// ==========================

test("JSON SERIALIZE: OPDSLink.Rel => string[]", (t) => {
    const link = new OPDSLink();
    link.AddRel(relStr1);
    link.AddRel(relStr2);
    inspect(link);

    const json = TaJsonSerialize(link);
    logJSON(json);

    checkType_Array(t, json.rel);
    const arr = json.rel as JsonArray;
    t.is(arr.length, 2);

    checkType_String(t, arr[0]);
    t.is(arr[0], relStr1);

    checkType_String(t, arr[1]);
    t.is(arr[1], relStr2);
});

test("JSON SERIALIZE: OPDSLink.Rel => string[] (recursive links)", (t) => {
    const link = new OPDSLink();
    link.AddRel(relStr1);
    link.AddRel(relStr2);
    const child = new OPDSLink();
    child.AddRel(relStr2);
    child.AddRel(relStr1);
    link.Children = [];
    link.Children.push(child);
    inspect(link);

    const json = TaJsonSerialize(link);
    logJSON(json);

    checkType_Array(t, json.rel);
    const arr = json.rel as JsonArray;
    t.is(arr.length, 2);

    checkType_String(t, arr[0]);
    t.is(arr[0], relStr1);

    checkType_String(t, arr[1]);
    t.is(arr[1], relStr2);

    checkType_Array(t, json.children);
    const children = json.children as JsonArray;
    t.is(children.length, 1);

    const child1 = children[0] as JsonMap;
    checkType_Array(t, child1.rel);
    const rels = child1.rel as JsonArray;
    t.is(rels.length, 2);

    checkType_String(t, rels[0]);
    t.is(rels[0], relStr2);

    checkType_String(t, rels[1]);
    t.is(rels[1], relStr1);
});

test("JSON SERIALIZE: OPDSLink.Rel => string", (t) => {
    const link = new OPDSLink();
    link.AddRel(relStr1);
    inspect(link);

    const json = TaJsonSerialize(link);
    logJSON(json);

    checkType_String(t, json.rel);
    t.is(json.rel, relStr1);
});

test("JSON SERIALIZE: OPDSLink.Rel => string (recursive links)", (t) => {
    const link = new OPDSLink();
    link.AddRel(relStr1);
    const child = new OPDSLink();
    child.AddRel(relStr2);
    link.Children = [];
    link.Children.push(child);
    inspect(link);

    const json = TaJsonSerialize(link);
    logJSON(json);

    checkType_String(t, json.rel);
    t.is(json.rel, relStr1);

    checkType_Array(t, json.children);
    const children = json.children as JsonArray;
    t.is(children.length, 1);

    const child1 = children[0] as JsonMap;
    checkType_String(t, child1.rel);
    t.is(child1.rel, relStr2);
});

test("JSON DESERIALIZE: OPDSLink.Rel => string[]", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json.rel = [relStr1, relStr2];
    logJSON(json);

    const link: OPDSLink = TaJsonDeserialize<OPDSLink>(json, OPDSLink);
    inspect(link);

    checkType_Array(t, link.Rel);
    t.is(link.Rel.length, 2);

    checkType_String(t, link.Rel[0]);
    t.is(link.Rel[0], relStr1);

    checkType_String(t, link.Rel[1]);
    t.is(link.Rel[1], relStr2);
});

test("JSON DESERIALIZE: OPDSLink.Rel => string[] (recursive children)", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json.rel = [relStr1, relStr2];
    json.children = [];
    json.children.push({ rel: [relStr2, relStr1] });
    logJSON(json);

    const link: OPDSLink = TaJsonDeserialize<OPDSLink>(json, OPDSLink);
    inspect(link);

    checkType_Array(t, link.Rel);
    t.is(link.Rel.length, 2);

    checkType_String(t, link.Rel[0]);
    t.is(link.Rel[0], relStr1);

    checkType_String(t, link.Rel[1]);
    t.is(link.Rel[1], relStr2);

    checkType_Array(t, link.Children);
    t.is(link.Children.length, 1);

    checkType_Array(t, link.Children[0].Rel);
    t.is(link.Children[0].Rel.length, 2);

    checkType_String(t, link.Children[0].Rel[0]);
    t.is(link.Children[0].Rel[0], relStr2);

    checkType_String(t, link.Children[0].Rel[1]);
    t.is(link.Children[0].Rel[1], relStr1);
});

test("JSON DESERIALIZE: OPDSLink.Rel => string[1]", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json.rel = [relStr1];
    logJSON(json);

    const link: OPDSLink = TaJsonDeserialize<OPDSLink>(json, OPDSLink);
    inspect(link);

    checkType_Array(t, link.Rel);
    t.is(link.Rel.length, 1);

    checkType_String(t, link.Rel[0]);
    t.is(link.Rel[0], relStr1);
});

test("JSON DESERIALIZE: OPDSLink.Rel => string", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json.rel = relStr1;
    logJSON(json);

    const link: OPDSLink = TaJsonDeserialize<OPDSLink>(json, OPDSLink);
    inspect(link);

    checkType_Array(t, link.Rel);
    t.is(link.Rel.length, 1);

    checkType_String(t, link.Rel[0]);
    t.is(link.Rel[0], relStr1);
});

test("JSON DESERIALIZE: OPDSLink.Rel => string (recursive children)", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json.rel = relStr1;
    json.children = [];
    json.children.push({ rel: relStr2 });
    logJSON(json);

    const link: OPDSLink = TaJsonDeserialize<OPDSLink>(json, OPDSLink);
    inspect(link);

    checkType_Array(t, link.Rel);
    t.is(link.Rel.length, 1);

    checkType_String(t, link.Rel[0]);
    t.is(link.Rel[0], relStr1);

    checkType_Array(t, link.Children);
    t.is(link.Children.length, 1);

    checkType_Array(t, link.Children[0].Rel);
    t.is(link.Children[0].Rel.length, 1);

    checkType_String(t, link.Children[0].Rel[0]);
    t.is(link.Children[0].Rel[0], relStr2);
});
